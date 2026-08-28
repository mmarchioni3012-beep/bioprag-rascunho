import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const attributionSchema = z.object({
  source: z.string().max(200).nullish(),
  medium: z.string().max(200).nullish(),
  campaign: z.string().max(200).nullish(),
  content: z.string().max(200).nullish(),
  term: z.string().max(200).nullish(),
  gclid: z.string().max(300).nullish(),
  wbraid: z.string().max(300).nullish(),
  gbraid: z.string().max(300).nullish(),
  fbclid: z.string().max(300).nullish(),
  landing_page: z.string().max(500).nullish(),
  referrer: z.string().max(500).nullish(),
  device_type: z.string().max(30).nullish(),
  session_id: z.string().max(100).nullish(),
});

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(30),
  email: z.string().trim().email().max(200).nullish().or(z.literal("")),
  city: z.string().trim().min(2).max(120),
  neighborhood: z.string().trim().max(120).nullish(),
  customer_type: z.enum(["residencial", "empresa", "condominio", "propriedade_rural", "outro"]),
  company_name: z.string().trim().max(160).nullish(),
  service_interest: z.string().trim().min(2).max(160),
  pest_type: z.string().trim().max(160).nullish(),
  message: z.string().trim().max(2000).nullish(),
  preferred_contact: z.enum(["whatsapp", "telefone", "email"]),
  privacy_acknowledged: z.literal(true),
  marketing_consent: z.boolean(),
  honeypot: z.string().max(200).optional(),
  attribution: attributionSchema.partial().optional(),
});

export type SubmitLeadInput = z.input<typeof leadSchema>;

const eventSchema = z.object({
  event_type: z.enum([
    "form_started",
    "whatsapp_clicked",
    "whatsapp_redirected",
    "phone_clicked",
    "route_clicked",
  ]),
  lead_id: z.string().uuid().nullish(),
  page_url: z.string().max(500).nullish(),
  event_data: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
  attribution: attributionSchema.partial().optional(),
});

/** Registra eventos anônimos de intenção (sem dados pessoais). */
export const trackSiteEvent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => eventSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const a = data.attribution ?? {};
    await supabaseAdmin.from("lead_events").insert({
      lead_id: data.lead_id ?? null,
      session_id: a.session_id ?? null,
      event_type: data.event_type,
      event_data: data.event_data ?? {},
      source: a.source ?? null,
      medium: a.medium ?? null,
      campaign: a.campaign ?? null,
      term: a.term ?? null,
      content: a.content ?? null,
      gclid: a.gclid ?? null,
      fbclid: a.fbclid ?? null,
      page_url: data.page_url ?? null,
    });
    return { success: true };
  });

/** Recebe o formulário do site, valida no servidor e cria o lead. */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot: bots preenchem o campo oculto. Não salvamos nada.
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return { success: true, lead_id: null, short_protocol: null, message: "Solicitação recebida." };
    }

    const digits = data.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) {
      return {
        success: false,
        lead_id: null,
        short_protocol: null,
        message: "Informe um telefone válido com DDD.",
      };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const a = data.attribution ?? {};

    // Proteção simples contra abuso: muitas submissões da mesma sessão em 1 minuto.
    if (a.session_id) {
      const since = new Date(Date.now() - 60_000).toISOString();
      const { count } = await supabaseAdmin
        .from("lead_events")
        .select("id", { count: "exact", head: true })
        .eq("session_id", a.session_id)
        .eq("event_type", "form_submitted")
        .gte("created_at", since);
      if ((count ?? 0) >= 3) {
        return {
          success: false,
          lead_id: null,
          short_protocol: null,
          message: "Recebemos vários envios seguidos. Aguarde um instante antes de tentar novamente.",
        };
      }
    }

    const now = new Date().toISOString();
    const city = data.city.trim().replace(/\s+/g, " ");

    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name.trim().replace(/\s+/g, " "),
        phone: data.phone.trim(),
        phone_normalized: digits,
        email: data.email ? data.email.trim().toLowerCase() : null,
        city,
        neighborhood: data.neighborhood?.trim() || null,
        customer_type: data.customer_type,
        company_name: data.company_name?.trim() || null,
        service_interest: data.service_interest,
        pest_type: data.pest_type?.trim() || null,
        message: data.message?.trim() || null,
        preferred_contact: data.preferred_contact,
        origin: "site_form",
        status: "novo",
        whatsapp_status: "aberto",
        whatsapp_intent_at: now,
        privacy_acknowledged: true,
        privacy_acknowledged_at: now,
        marketing_consent: data.marketing_consent,
        marketing_consent_at: data.marketing_consent ? now : null,
        source: a.source ?? null,
        medium: a.medium ?? null,
        campaign: a.campaign ?? null,
        content: a.content ?? null,
        term: a.term ?? null,
        gclid: a.gclid ?? null,
        wbraid: a.wbraid ?? null,
        gbraid: a.gbraid ?? null,
        fbclid: a.fbclid ?? null,
        landing_page: a.landing_page ?? null,
        referrer: a.referrer ?? null,
        device_type: a.device_type ?? null,
        session_id: a.session_id ?? null,
      })
      .select("id, duplicate_suspected")
      .single();

    if (error || !lead) {
      console.error("submitLead insert error", error);
      return {
        success: false,
        lead_id: null,
        short_protocol: null,
        message: "Não conseguimos registrar sua solicitação agora. Tente novamente em instantes.",
      };
    }

    const shortProtocol = `BP-${lead.id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;

    await supabaseAdmin.from("lead_events").insert([
      {
        lead_id: lead.id,
        session_id: a.session_id ?? null,
        event_type: "form_submitted",
        event_data: { service_interest: data.service_interest, customer_type: data.customer_type, city },
        source: a.source ?? null,
        medium: a.medium ?? null,
        campaign: a.campaign ?? null,
        term: a.term ?? null,
        content: a.content ?? null,
        gclid: a.gclid ?? null,
        fbclid: a.fbclid ?? null,
        page_url: a.landing_page ?? null,
      },
      {
        lead_id: lead.id,
        session_id: a.session_id ?? null,
        event_type: "whatsapp_clicked",
        event_data: { trigger: "form_submit", protocol: shortProtocol },
        source: a.source ?? null,
        medium: a.medium ?? null,
        campaign: a.campaign ?? null,
        term: a.term ?? null,
        content: a.content ?? null,
        gclid: a.gclid ?? null,
        fbclid: a.fbclid ?? null,
        page_url: a.landing_page ?? null,
      },
    ]);

    return {
      success: true,
      lead_id: lead.id,
      short_protocol: shortProtocol,
      message: "Solicitação registrada com sucesso.",
    };
  });
