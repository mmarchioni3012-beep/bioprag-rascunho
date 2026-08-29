export const LEAD_STATUS = [
  "novo",
  "contato_pendente",
  "contatado",
  "qualificado",
  "orcamento_solicitado",
  "orcamento_enviado",
  "servico_agendado",
  "ganho",
  "perdido",
  "sem_resposta",
  "spam",
] as const;

export type LeadStatus = (typeof LEAD_STATUS)[number];

export const LEAD_STATUS_LABEL: Record<string, string> = {
  novo: "Novo",
  contato_pendente: "Contato pendente",
  contatado: "Contatado",
  qualificado: "Qualificado",
  orcamento_solicitado: "Orçamento solicitado",
  orcamento_enviado: "Orçamento enviado",
  servico_agendado: "Serviço agendado",
  ganho: "Ganho",
  perdido: "Perdido",
  sem_resposta: "Sem resposta",
  spam: "Spam",
};

export const MANUAL_SOURCES = [
  "whatsapp",
  "ligacao",
  "formulario_site",
  "google_ads",
  "meta_ads",
  "instagram",
  "facebook",
  "google_meu_negocio",
  "indicacao_cliente",
  "indicacao_parceiro",
  "presencial",
  "prospeccao_ativa",
  "outro",
] as const;

export type ManualSource = (typeof MANUAL_SOURCES)[number];

export const MANUAL_SOURCE_LABEL: Record<string, string> = {
  whatsapp: "WhatsApp",
  ligacao: "Ligação telefônica",
  formulario_site: "Formulário do site",
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
  instagram: "Instagram",
  facebook: "Facebook",
  google_meu_negocio: "Google Meu Negócio",
  indicacao_cliente: "Indicação de cliente",
  indicacao_parceiro: "Indicação de parceiro",
  presencial: "Atendimento presencial",
  prospeccao_ativa: "Prospecção ativa",
  outro: "Outro",
};

export const CUSTOMER_TYPES = [
  "residencial",
  "empresa",
  "condominio",
  "propriedade_rural",
  "outro",
] as const;

export const CUSTOMER_TYPE_LABEL: Record<string, string> = {
  residencial: "Residencial",
  empresa: "Empresa",
  condominio: "Condomínio",
  propriedade_rural: "Propriedade rural",
  outro: "Outro",
};

export const ORIGIN_GROUPS = [
  "formulario",
  "manual",
  "whatsapp",
  "ligacao",
  "indicacao",
  "google_ads",
  "meta_ads",
  "organico",
] as const;

export type OriginGroup = (typeof ORIGIN_GROUPS)[number];

export const ORIGIN_GROUP_LABEL: Record<string, string> = {
  formulario: "Formulário do site",
  manual: "Cadastro manual",
  whatsapp: "WhatsApp",
  ligacao: "Ligação",
  indicacao: "Indicação",
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
  organico: "Orgânico",
};

/** Rótulo de origem consolidado para exibição no painel. */
export function originLabel(lead: {
  origin?: string | null;
  manual_source?: string | null;
  manual_source_detail?: string | null;
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
}) {
  if (lead.origin === "manual") {
    const base = MANUAL_SOURCE_LABEL[lead.manual_source ?? "outro"] ?? "Manual";
    return lead.manual_source === "outro" && lead.manual_source_detail
      ? `${base}: ${lead.manual_source_detail}`
      : `Manual · ${base}`;
  }
  const src = lead.source ?? "direto";
  return lead.campaign ? `${src} / ${lead.campaign}` : src;
}

export function normalizePhone(raw: string) {
  return raw.replace(/\D/g, "");
}

export function whatsappUrl(phone: string, message: string) {
  const digits = normalizePhone(phone);
  const withCountry = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}`;
}

export function suggestedWhatsappMessage(name: string, service: string) {
  return `Olá, ${name}! Aqui é da Bioprag. Recebemos sua solicitação referente a ${service}. Podemos continuar seu atendimento por aqui?`;
}

export const ADDRESS_STATUS_LABEL: Record<string, string> = {
  nao_informado: "Endereço não informado",
  parcial: "Endereço parcial",
  completo: "Endereço completo",
  confirmado: "Endereço confirmado",
};
