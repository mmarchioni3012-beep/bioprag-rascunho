export const GA_MEASUREMENT_ID = "G-C9Q29DLP1T";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[] | IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Envia o evento para o GA4 (gtag.js) e também para o dataLayer do GTM,
 * mantendo compatibilidade com as tags já configuradas no container.
 */
export const pushTrackingEvent = (event: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }

  (window.dataLayer as Record<string, unknown>[] | undefined)?.push({ event, ...params });
};

export const trackPageView = (path: string) => {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: path, page_location: window.location.href });
  }
};
