export const GA_MEASUREMENT_ID = "G-C9Q29DLP1T";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Envia o evento UMA única vez para o dataLayer do GTM.
 * O GA4 é acionado pelas tags do container (não chamamos gtag('event') aqui,
 * pois isso gerava um segundo evento com o mesmo nome no dataLayer).
 */
export const pushTrackingEvent = (event: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  (window.dataLayer as Record<string, unknown>[]).push({ event, ...params });
};

export const trackPageView = (path: string) => {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: path, page_location: window.location.href });
  }
};
