import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { LEAD_STATUS, MANUAL_SOURCES, CUSTOMER_TYPES, ORIGIN_GROUPS } from "@/lib/leads-constants";

const filtersSchema = z
  .object({
    from: z.string().max(30).nullish(),
    to: z.string().max(30).nullish(),
    city: z.string().max(120).nullish(),
    service_interest: z.string().max(160).nullish(),
    customer_type: z.string().max(40).nullish(),
    origin: z.string().max(40).nullish(),
    origin_group: z.enum(ORIGIN_GROUPS).nullish(),
    manual_source: z.enum(MANUAL_SOURCES).nullish(),
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
  status: z.enum(LEAD_STATUS).optional(),
  whatsapp_status: z
    .enum(["nao_aberto", "aberto", "nao_confirmado", "mensagem_recebida", "respondido", "convertido"])
    .optional(),
  whatsapp_received: z.boolean().optional(),
  internal_notes: z.string().max(4000).nullish(),
  loss_reason: z.string().max(400).nullish(),
  estimated_value: z.number().nonnegative().nullish(),
  closed_value: z.number().nonnegative().nullish(),
  service_date: z.string().max(20).nullish(),
  follow_up_at: z.string().max(40).nullish(),
  assigned_to: z.string().max(120).nullish(),
  archived: z.boolean().optional(),
});

const manualLeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(30),
  city: z.string().trim().min(2).max(120),
  manual_source: z.enum(MANUAL_SOURCES),
  manual_source_detail: z.string().trim().max(200).nullish(),
  service_interest: z.string().trim().min(2).max(160),
  status: z.enum(LEAD_STATUS),
  email: z.string().trim().email().max(200).nullish().or(z.literal("")),
  neighborhood: z.string().trim().max(120).nullish(),
  customer_type: z.enum(CUSTOMER_TYPES).optional(),
  company_name: z.string().trim().max(160).nullish(),
  message: z.string().trim().max(2000).nullish(),
  preferred_contact: z.enum(["whatsapp", "telefone", "email"]).optional(),
  assigned_to: z.string().trim().max(120).nullish(),
  estimated_value: z.number().nonnegative().nullish(),
  follow_up_at: z.string().max(40).nullish(),
  internal_notes: z.string().trim().max(4000).nullish(),
  reported_source: z.enum(["google_ads", "meta_ads", "indicacao", "google_organico", "outro"]).nullish(),
  related_lead_id: z.string().uuid().nullish(),
});

type MinimalClient = {
  from: (t: string) => any;
};

async function assertAdmin(supabase: MinimalClient, userId: string) {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Acesso restrito a administradores.");
}

function adminName(claims: Record<string, unknown>) {
  const meta = (claims["user_metadata"] ?? {}) as Record<string, unknown>;
  return String(meta["full_name"] ?? meta["name"] ?? claims["email"] ?? "Administrador");
}

function makeProtocol() {
  const rnd = Math.random().toString(36).replace(/[^a-z0-9]/g, "").slice(0, 6).toUpperCase().padEnd(6, "X");
  return `BP-${rnd}`;
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
    return {
      isAdmin: Boolean(data),
      adminName: adminName(context.claims as unknown as Record<string, unknown>),
    };
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
    if (f.manual_source) q = q.eq("manual_source", f.manual_source);
    if (f.campaign) q = q.ilike("campaign", `%${f.campaign}%`);
    if (f.term) q = q.ilike("term", `%${f.term}%`);
    if (f.status) q = q.eq("status", f.status);
    if (f.assigned_to) q = q.ilike("assigned_to", `%${f.assigned_to}%`);
    if (f.search) q = q.or(`name.ilike.%${f.search}%,phone_normalized.ilike.%${f.search}%`);
    if (f.whatsapp_received === "sim") q = q.not("whatsapp_received_at", "is", null);
    if (f.whatsapp_received === "nao") q = q.is("whatsapp_received_at", null);
    if (!f.include_archived) q = q.eq("archived", false);

    switch (f.origin_group) {
      case "formulario":
        q = q.eq("origin", "site_form");
        break;
      case "manual":
        q = q.eq("origin", "manual");
        break;
      case "whatsapp":
        q = q.eq("manual_source", "whatsapp");
        break;
      case "ligacao":
        q = q.eq("manual_source", "ligacao");
        break;
      case "indicacao":
        q = q.in("manual_source", ["indicacao_cliente", "indicacao_parceiro"]);
        break;
      case "google_ads":
        q = q.or("gclid.not.is.null,manual_source.eq.google_ads,reported_source.eq.google_ads");
        break;
      case "meta_ads":
        q = q.or("fbclid.not.is.null,manual_source.eq.meta_ads,reported_source.eq.meta_ads");
        break;
      case "organico":
        q = q.is("gclid", null).is("fbclid", null).is("reported_source", null);
        break;
      default:
        break;
    }

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

/** Procura contatos já cadastrados com o mesmo telefone (resumo, sem dados extras). */
export const findLeadsByPhone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ phone: z.string().min(8).max(30) }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const digits = data.phone.replace(/\D/g, "");
    if (digits.length < 10) return [];
    const { data: rows, error } = await context.supabase
      .from("leads")
      .select(
        "id, name, city, service_interest, origin, manual_source, manual_source_detail, source, campaign, status, created_at, updated_at, short_protocol",
      )
      .eq("phone_normalized", digits)
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

type CreateLeadResult = {
  success: boolean;
  lead: { id: string; short_protocol: string | null } | null;
  message: string;
};

export const createLeadManually = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => manualLeadSchema.parse(input))
  .handler(async ({ data, context }): Promise<CreateLeadResult> => {
    await assertAdmin(context.supabase as never, context.userId);

    if (data.manual_source === "outro" && !data.manual_source_detail?.trim()) {
      return { success: false, lead: null, message: "Descreva a origem do contato." };
    }

    const digits = data.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) {
      return { success: false, lead: null, message: "Informe um telefone válido com DDD." };
    }


    const by = adminName(context.claims as unknown as Record<string, unknown>);
    const now = new Date().toISOString();

    const payload = {
      name: data.name.replace(/\s+/g, " "),
      phone: data.phone,
      phone_normalized: digits,
      email: data.email ? data.email.toLowerCase() : null,
      city: data.city.replace(/\s+/g, " "),
      neighborhood: data.neighborhood || null,
      customer_type: data.customer_type ?? "outro",
      company_name: data.company_name || null,
      service_interest: data.service_interest,
      message: data.message || null,
      preferred_contact: data.preferred_contact ?? "whatsapp",
      origin: "manual",
      manual_source: data.manual_source,
      manual_source_detail: data.manual_source_detail || null,
      status: data.status,
      whatsapp_status: "nao_aberto",
      assigned_to: data.assigned_to || null,
      estimated_value: data.estimated_value ?? null,
      follow_up_at: data.follow_up_at || null,
      internal_notes: data.internal_notes || null,
      reported_source: data.reported_source || null,
      attribution_type: data.reported_source ? "self_reported" : "manual",
      related_lead_id: data.related_lead_id || null,
      duplicate_suspected: Boolean(data.related_lead_id),
      created_by: context.userId,
      created_by_name: by,
      privacy_acknowledged: false,
      marketing_consent: false,
      created_at: now,
      updated_at: now,
    };

    let lead: { id: string; short_protocol: string | null } | null = null;
    let lastError: string | null = null;
    for (let attempt = 0; attempt < 3 && !lead; attempt++) {
      const { data: row, error } = await context.supabase
        .from("leads")
        .insert({ ...payload, short_protocol: makeProtocol() } as never)
        .select("id, short_protocol")
        .single();
      if (row) lead = row as unknown as { id: string; short_protocol: string | null };
      else lastError = error?.message ?? "erro desconhecido";
    }

    if (lead === null) {
      console.error("createLeadManually error", lastError);
      return { success: false, lead: null, message: "Não foi possível cadastrar o lead. Tente novamente." };
    }
    const created: { id: string; short_protocol: string | null } = lead;

    const providedFields = Object.entries(data)
      .filter(([k, v]) => v !== null && v !== undefined && v !== "" && k !== "phone" && k !== "email" && k !== "message")
      .map(([k]) => k);

    await context.supabase.from("lead_events").insert({
      lead_id: created.id,
      event_type: "lead_created_manually",
      event_data: {
        by_user: context.userId,
        by_name: by,
        manual_source: data.manual_source,
        status: data.status,
        fields: providedFields,
        related_lead_id: data.related_lead_id ?? null,
      },
      source: "manual",
      medium: data.manual_source,
    } as never);

    return { success: true, lead: created, message: "Lead cadastrado com sucesso." };
  });

export const updateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => updateSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);

    const { id, whatsapp_received, ...rest } = data;

    const { data: before } = await context.supabase
      .from("leads")
      .select("status, estimated_value, closed_value, archived, follow_up_at")
      .eq("id", id)
      .maybeSingle();

    const patch: Record<string, unknown> = { ...rest };
    if (whatsapp_received === true) {
      patch['whatsapp_received_at'] = new Date().toISOString();
      patch['whatsapp_status'] = patch['whatsapp_status'] ?? "mensagem_recebida";
    }
    if (whatsapp_received === false) {
      patch['whatsapp_received_at'] = null;
    }
    if (rest.archived === true && !before?.archived) {
      patch['archived_at'] = new Date().toISOString();
      patch['archived_by'] = context.userId;
    }
    if (rest.archived === false) {
      patch['archived_at'] = null;
      patch['archived_by'] = null;
    }

    const { data: row, error } = await context.supabase
      .from("leads")
      .update(patch as never)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    const by = adminName(context.claims as unknown as Record<string, unknown>);
    const auditBase = { by_user: context.userId, by_name: by, changed: Object.keys(patch) };
    const events: { event_type: string; event_data: Record<string, unknown> }[] = [
      { event_type: "lead_updated_manually", event_data: auditBase },
    ];

    if (rest.status && before?.status !== rest.status) {
      events.push({
        event_type: "lead_status_changed",
        event_data: { ...auditBase, from: before?.status ?? null, to: rest.status },
      });
    }
    if (rest.follow_up_at && rest.follow_up_at !== before?.follow_up_at) {
      events.push({ event_type: "follow_up_scheduled", event_data: { ...auditBase, follow_up_at: rest.follow_up_at } });
    }
    if (rest.estimated_value != null && rest.estimated_value !== Number(before?.estimated_value ?? NaN)) {
      events.push({ event_type: "budget_registered", event_data: { ...auditBase, estimated_value: rest.estimated_value } });
    }
    if (rest.closed_value != null && rest.closed_value !== Number(before?.closed_value ?? NaN)) {
      events.push({ event_type: "sale_registered", event_data: { ...auditBase, closed_value: rest.closed_value } });
    }
    if (rest.archived === true && !before?.archived) {
      events.push({ event_type: "lead_archived", event_data: auditBase });
    }

    await context.supabase
      .from("lead_events")
      .insert(events.map((e) => ({ lead_id: id, ...e })) as never);

    return row;
  });
