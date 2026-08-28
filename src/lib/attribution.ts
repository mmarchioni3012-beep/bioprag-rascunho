/**
 * Captura de atribuição de marketing (client-side, sem dados pessoais).
 * Os valores ficam em sessionStorage/localStorage do visitante e são enviados
 * apenas para o backend do site — nunca para o dataLayer.
 */

const SESSION_KEY = "bioprag_session_id";
const ATTR_KEY = "bioprag_attribution";

export type Attribution = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  gclid: string | null;
  wbraid: string | null;
  gbraid: string | null;
  fbclid: string | null;
  landing_page: string | null;
  referrer: string | null;
  device_type: string | null;
  session_id: string | null;
};

const EMPTY: Attribution = {
  source: null,
  medium: null,
  campaign: null,
  content: null,
  term: null,
  gclid: null,
  wbraid: null,
  gbraid: null,
  fbclid: null,
  landing_page: null,
  referrer: null,
  device_type: null,
  session_id: null,
};

function randomId() {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* noop */
  }
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getSessionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = randomId();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

function detectDevice(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function inferSource(params: URLSearchParams, referrer: string): { source: string | null; medium: string | null } {
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  if (utmSource || utmMedium) return { source: utmSource, medium: utmMedium };
  if (params.get("gclid") || params.get("wbraid") || params.get("gbraid")) return { source: "google", medium: "cpc" };
  if (params.get("fbclid")) return { source: "meta", medium: "paid_social" };
  if (!referrer) return { source: "direto", medium: "none" };
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (typeof window !== "undefined" && host === window.location.hostname.replace(/^www\./, "")) {
      return { source: "direto", medium: "none" };
    }
    return { source: host, medium: "referral" };
  } catch {
    return { source: "direto", medium: "none" };
  }
}

/** Lê a URL na primeira visita da sessão e persiste a atribuição. */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY;

  const params = new URLSearchParams(window.location.search);
  const hasPaidParams = ["utm_source", "utm_medium", "utm_campaign", "gclid", "wbraid", "gbraid", "fbclid"].some((k) =>
    params.get(k),
  );

  let stored: Partial<Attribution> = {};
  try {
    stored = JSON.parse(window.localStorage.getItem(ATTR_KEY) ?? "{}") as Partial<Attribution>;
  } catch {
    stored = {};
  }

  const referrer = typeof document !== "undefined" ? document.referrer || "" : "";
  const inferred = inferSource(params, referrer);

  const fresh: Attribution = {
    source: params.get("utm_source") ?? inferred.source,
    medium: params.get("utm_medium") ?? inferred.medium,
    campaign: params.get("utm_campaign"),
    content: params.get("utm_content"),
    term: params.get("utm_term") ?? params.get("keyword"),
    gclid: params.get("gclid"),
    wbraid: params.get("wbraid"),
    gbraid: params.get("gbraid"),
    fbclid: params.get("fbclid"),
    landing_page: `${window.location.origin}${window.location.pathname}`,
    referrer: referrer || null,
    device_type: detectDevice(),
    session_id: getSessionId(),
  };

  // Primeiro toque pago/campanha prevalece; caso contrário mantém o já salvo.
  const merged: Attribution = hasPaidParams || !stored.source ? fresh : { ...EMPTY, ...stored, ...{
    landing_page: stored.landing_page ?? fresh.landing_page,
    device_type: fresh.device_type,
    session_id: fresh.session_id,
  } };

  try {
    window.localStorage.setItem(ATTR_KEY, JSON.stringify(merged));
  } catch {
    /* noop */
  }

  return merged;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY;
  return captureAttribution();
}
