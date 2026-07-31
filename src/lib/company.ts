export const company = {
  name: "Bioprag",
  foundedYear: 1986,
  phone: "+551438454011",
  phoneDisplay: "(14) 3845-4011",
  whatsapp: "5514981752595",
  whatsappDisplay: "(14) 98175-2595",
  email: "vendas@bioprag.com.br",
  headquarters: {
    city: "Conchas",
    state: "SP",
    address: "Rua Goiás, 446 — Centro",
    zipCode: "18570-000",
  },
  branch: {
    city: "Campinas",
    state: "SP",
    address: "Rua Emerson José, 1710 — Sala 07",
  },
} as const;

export const WHATSAPP_URL = `https://wa.me/${company.whatsapp}`;

export const YEARS_OF_EXPERIENCE = new Date().getFullYear() - company.foundedYear;

/** Preencha os IDs quando as contas estiverem disponíveis. */
export const trackingConfig = {
  gtmId: "",
  ga4Id: "",
  googleAdsId: "",
};

type DataLayerPayload = Record<string, string | number | boolean | undefined>;

export function track(event: string, payload: DataLayerPayload = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  const clean: DataLayerPayload = {};
  for (const [k, v] of Object.entries(payload)) {
    if (v !== undefined && v !== "") clean[k] = v;
  }
  w.dataLayer.push({ event, ...clean });
}

export function getUtms() {
  if (typeof window === "undefined") return {} as Record<string, string>;
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of ["utm_campaign", "utm_source", "utm_medium", "utm_term", "utm_content"]) {
    const v = p.get(key);
    if (v) out[key] = v;
  }
  return out;
}

export function whatsappLink(message?: string) {
  return message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL;
}

export function serviceMessage(service: string) {
  return `Olá, equipe Bioprag! Vim pelo site e gostaria de informações sobre ${service}.`;
}
