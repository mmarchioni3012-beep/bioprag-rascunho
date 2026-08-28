import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const filtersSchema = z
  .object({
    from: z.string().max(30).nullish(),
    to: z.string().max(30).nullish(),
    city: z.string().max(120).nullish(),
    service_interest: z.string().max(160).nullish(),
    customer_type: z.string().max(40).nullish(),
    origin: z.string().max(40).nullish(),
    campaign: z.string().max(200).nullish(),
    term: z.string().max(200).nullish(),
    status: z.string().max(40).nullish(),
    assigned_to: z.string().max(120).nullish(),
    whatsapp_received: z.enum(["sim", "nao", "todos"]).nullish(),
    include_archived: z.boolean().nullish(),
    search: z.string().max(120).nullish(),
  })
  .optional();

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z
    .enum([
      "novo",
      "contato_pendente",
      "contatado",
      "qualificado",
      "orcamento_enviado",
      "servico_agendado",
      "ganho",
      "perdido",
      "sem_resposta",
      "spam",
    ])
    .optional(),
  whatsapp_status: z
    .enum(["nao_aberto", "aberto", "nao_confirmado", "mensagem_recebida", "respondido", "convertido"])
    .optional(),
  whatsapp_received: z.boolean().optional(),
  internal_notes: z.string().max(4000).nullish(),
  loss_reason: z.string().max(400).nullish(),
  estimated_value: z.number().nonnegative().nullish(),
  closed_value: z.number().nonnegative().nullish(),
  service_date: z.string().max(20).nullish(),
  assigned_to: z.string().max(120).nullish(),
  archived: z.boolean().optional(),
});

async function assertAdmin(supabase: {
  from: (t: string) => {
    select: (c: string) => {
      eq: (
        c: string,
        v: string,
      ) => { eq: (c: string, v: string) => { maybeSingle: () => Promise<{ data: unknown }> } };
    };
  };
}, userId: string) {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!data) throw new Error("Acesso restrito a administradores.");
}

export const getMyAdminAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: Boolean(data) };
  });

export const listLeads = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => filtersSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const f = data ?? {};
    let q = context.supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(1000);

    if (f.from) q = q.gte("created_at", f.from);
    if (f.to) q = q.lte("created_at", f.to);
    if (f.city) q = q.ilike("city", `%${f.city}%`);
    if (f.service_interest) q = q.eq("service_interest", f.service_interest);
    if (f.customer_type) q = q.eq("customer_type", f.customer_type);
    if (f.origin) q = q.eq("origin", f.origin);
    if (f.campaign) q = q.ilike("campaign", `%${f.campaign}%`);
    if (f.term) q = q.ilike("term", `%${f.term}%`);
    if (f.status) q = q.eq("status", f.status);
    if (f.assigned_to) q = q.ilike("assigned_to", `%${f.assigned_to}%`);
    if (f.search) q = q.or(`name.ilike.%${f.search}%,phone_normalized.ilike.%${f.search}%`);
    if (f.whatsapp_received === "sim") q = q.not("whatsapp_received_at", "is", null);
    if (f.whatsapp_received === "nao") q = q.is("whatsapp_received_at", null);
    if (!f.include_archived) q = q.eq("archived", false);

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const listLeadEvents = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ lead_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const { data: rows, error } = await context.supabase
      .from("lead_events")
      .select("*")
      .eq("lead_id", data.lead_id)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const updateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => updateSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);

    const { id, whatsapp_received, ...rest } = data;
    const patch: Record<string, unknown> = { ...rest };
    if (whatsapp_received === true) {
      patch['whatsapp_received_at'] = new Date().toISOString();
      patch['whatsapp_status'] = patch['whatsapp_status'] ?? "mensagem_recebida";
    }
    if (whatsapp_received === false) {
      patch['whatsapp_received_at'] = null;
    }

    const { data: row, error } = await context.supabase
      .from("leads")
      .update(patch as never)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("lead_events").insert({
      lead_id: id,
      event_type: rest.status ? "lead_status_changed" : "lead_updated",
      event_data: { changed: Object.keys(patch), by: context.userId },
    });

    return row;
  });
