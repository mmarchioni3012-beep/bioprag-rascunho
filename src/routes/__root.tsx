import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import { trackPageView } from "../lib/tracking";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">A página que você procura não existe ou foi movida.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">Algo deu errado. Tente recarregar ou volte ao início.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1f5a3a" },
      { name: "author", content: "BIOPRAG — Controle Integrado de Pragas Urbanas" },
      { title: "BIOPRAG" },
      { property: "og:title", content: "BIOPRAG" },
      { name: "twitter:title", content: "BIOPRAG" },
      { property: "og:site_name", content: "BIOPRAG" },
      {
        name: "description",
        content:
          "Bioprag Elevated is a premium website showcasing BIOPRAG's integrated pest control, environmental health, and biosafety services.",
      },
      {
        property: "og:description",
        content:
          "Bioprag Elevated is a premium website showcasing BIOPRAG's integrated pest control, environmental health, and biosafety services.",
      },
      {
        name: "twitter:description",
        content:
          "Bioprag Elevated is a premium website showcasing BIOPRAG's integrated pest control, environmental health, and biosafety services.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/81156efe-9ec6-4923-9ee2-f47d5efa0fbd/id-preview-262018e6--9db716a7-003b-4a46-9574-9371b472433c.lovable.app-1781286909885.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/81156efe-9ec6-4923-9ee2-f47d5efa0fbd/id-preview-262018e6--9db716a7-003b-4a46-9574-9371b472433c.lovable.app-1781286909885.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C9Q29DLP1T" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','G-C9Q29DLP1T',{send_page_view:true});`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M4VCZRB8');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M4VCZRB8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){window.dataLayer=window.dataLayer||[];if(window.__biopragTrackingInit)return;window.__biopragTrackingInit=true;var push=function(payload){var e=payload.event;var p={};for(var k in payload){if(k!=='event')p[k]=payload[k];}if(typeof window.gtag==='function')window.gtag('event',e,p);window.dataLayer.push(payload);};document.addEventListener('click',function(event){var target=event.target;var link=target&&target.closest?target.closest('a'):null;if(!link)return;var href=link.getAttribute('href')||'';var section=link.closest('section');var location=(section&&section.id)||'site';if(href.indexOf('wa.me/')!==-1||href.indexOf('whatsapp.com/')!==-1){push({event:'whatsapp_click',click_location:location});return;}if(href.indexOf('tel:')===0){push({event:'phone_click',click_location:location});return;}},true);})();`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    trackPageView(pathname);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
