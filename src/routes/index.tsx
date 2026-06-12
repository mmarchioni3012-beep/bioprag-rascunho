import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bug,
  CheckCircle2,
  ChevronDown,
  Droplets,
  Factory,
  Instagram,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  Rat,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
  Youtube,
} from "lucide-react";

import logoAsset from "@/assets/bioprag-logo.jpg.asset.json";
import img2953 from "@/assets/IMG_2953.jpg.asset.json";
import img2955 from "@/assets/IMG_2955.jpg.asset.json";
import img2956 from "@/assets/IMG_2956.jpg.asset.json";
import img2957 from "@/assets/IMG_2957.jpg.asset.json";
import img2958 from "@/assets/IMG_2958.jpg.asset.json";
import img2962 from "@/assets/IMG_2962.jpg.asset.json";
import img2963 from "@/assets/IMG_2963.jpg.asset.json";

const WHATSAPP_NUMBER = "5514981752595"; // Caroline Bioprag
const PHONE_DISPLAY = "(14) 3845-4011";
const WHATSAPP_DISPLAY = "(14) 98175-2595";
const ADDRESS = "Rua Goiás, 446 — Centro, Conchas/SP";

const META_TITLE =
  "BIOPRAG — Controle Integrado de Pragas, Saúde Ambiental e Biossegurança | Desde 1986";
const META_DESC =
  "Empresa especializada em Controle Integrado de Pragas, Saúde Ambiental e Biossegurança. Atendimento a residências, empresas e indústrias na região de Conchas/SP desde 1986.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: "description", content: META_DESC },
      { property: "og:title", content: META_TITLE },
      { property: "og:description", content: META_DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: img2956.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: META_TITLE },
      { name: "twitter:description", content: META_DESC },
      { name: "twitter:image", content: img2956.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

/* ---------------- helpers ---------------- */

function whatsappLink(message?: string) {
  const msg = message ?? "Olá, visitei o site da BIOPRAG e gostaria de solicitar um orçamento.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current || shown) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [shown]);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .8s ease ${delay}ms, transform .8s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- page ---------------- */

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Timeline />
        <Differentiators />
        <Services />
        <Process />
        <Training />
        <Cases />
        <Coverage />
        <FAQ />
        <Quote />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsappFloat />
    </div>
  );
}

/* ---------------- header ---------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#processo", label: "Como funciona" },
    { href: "#cases", label: "Cases" },
    { href: "#cobertura", label: "Atendimento" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-page flex items-center justify-between h-16">
        <a href="#topo" className="flex items-center gap-2.5 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <span
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ boxShadow: "0 0 0 4px rgba(20,78,50,.15)" }}
            />
            <Triangle />
          </span>
          <div className="leading-none">
            <div className="font-display font-bold text-[1.05rem] tracking-tight">
              BIOPRAG<span className="text-primary">®</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
              Desde 1986
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-ink-soft hover:text-foreground px-3 py-2 rounded-md transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-deep transition-colors shadow-soft"
          >
            <MessageCircle className="h-4 w-4" />
            Orçamento
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-elevated"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container-page py-3 flex flex-col">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-foreground border-b border-border last:border-0"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Triangle() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 3.2 22 20H2L12 3.2Z" />
    </svg>
  );
}

/* ---------------- hero ---------------- */

function Hero() {
  return (
    <section id="topo" className="relative pt-24 lg:pt-28 pb-16 lg:pb-24 overflow-hidden">
      {/* background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={img2956.url}
          alt="Equipe BIOPRAG executando aplicação técnica em campo"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1410]/85 via-[#0a1410]/72 to-[#0a1410]/95" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 70% 20%, rgba(56,142,88,.25), transparent 60%)",
          }}
        />
      </div>

      <div className="container-page text-primary-foreground">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              Saúde Ambiental & Biossegurança
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.02] text-balance">
              Protegendo ambientes com{" "}
              <span className="text-[oklch(0.86_0.12_155)]">segurança</span>,{" "}
              tecnologia e experiência desde{" "}
              <span className="tabular-nums">1986</span>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl text-balance">
              Soluções completas em <strong className="font-semibold text-white">Controle Integrado de Pragas</strong>,
              Saúde Ambiental e Biossegurança para residências, empresas e indústrias.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-[oklch(0.22_0.04_165)] font-semibold hover:bg-white/90 transition-colors shadow-elevated"
              >
                Solicitar orçamento
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors backdrop-blur"
              >
                Conhecer serviços
              </a>
            </div>
          </Reveal>
        </div>

        {/* metrics */}
        <Reveal delay={340}>
          <div className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-white/10 backdrop-blur border border-white/10">
            {[
              { v: "+39", l: "anos de mercado" },
              { v: "10+", l: "serviços especializados" },
              { v: "8", l: "cidades atendidas" },
              { v: "100%", l: "equipe própria e treinada" },
            ].map((m) => (
              <div key={m.l} className="bg-[#0a1410]/60 px-5 py-6">
                <div className="text-3xl lg:text-4xl font-bold tracking-tight text-white tabular-nums">
                  {m.v}
                </div>
                <div className="text-xs lg:text-sm text-white/65 mt-1">{m.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-white/50 text-xs">
        <span>role para conhecer</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}

/* ---------------- trust bar ---------------- */

function TrustBar() {
  const segments = [
    { icon: Factory, label: "Indústrias" },
    { icon: Truck, label: "Logística" },
    { icon: Bug, label: "Restaurantes" },
    { icon: Shield, label: "Condomínios" },
    { icon: Leaf, label: "Escolas" },
    { icon: Sparkles, label: "Residências" },
  ];
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-10 lg:py-14">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <span className="eyebrow">Quem confia na BIOPRAG</span>
              <h2 className="mt-2 text-xl lg:text-2xl font-semibold text-foreground max-w-md text-balance">
                Atuação consolidada em diversos segmentos da região.
              </h2>
            </div>
            <ul className="grid grid-cols-3 sm:grid-cols-6 gap-x-2 gap-y-5 lg:gap-x-8">
              {segments.map((s) => (
                <li
                  key={s.label}
                  className="flex flex-col items-center gap-2 text-ink-soft"
                >
                  <s.icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
                  <span className="text-xs lg:text-sm font-medium text-foreground">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- about ---------------- */

function About() {
  return (
    <section id="sobre" className="py-20 lg:py-32">
      <div className="container-page grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-elevated">
              <img
                src={img2962.url}
                alt="Operador BIOPRAG com veículo personalizado e equipamentos"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 lg:-right-8 surface-glass rounded-2xl p-4 shadow-elevated max-w-[200px]">
              <div className="text-3xl font-bold text-primary tabular-nums">1986</div>
              <div className="text-xs text-ink-soft mt-1">
                ano em que começamos a proteger ambientes na região.
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow">Sobre a BIOPRAG</span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-balance">
              Uma história construída com confiança.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="hairline mt-8 w-32" />
            <div className="mt-8 space-y-5 text-ink-soft text-base lg:text-lg leading-relaxed">
              <p>
                Há quase quatro décadas, a BIOPRAG cresce ao lado das famílias,
                empresas e indústrias da região como referência em{" "}
                <strong className="text-foreground font-semibold">
                  Controle Integrado de Pragas Urbanas
                </strong>
                .
              </p>
              <p>
                Construímos nossa reputação com estrutura própria, equipe técnica
                qualificada, responsáveis técnicos, veículos personalizados e
                investimento contínuo em treinamento, equipamentos e processos.
              </p>
              <p>
                Mais do que aplicar produtos, oferecemos um programa completo de
                saúde ambiental e biossegurança — diagnóstico, planejamento,
                execução e monitoramento.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                "Responsável técnico ativo",
                "Equipe própria e capacitada",
                "Frota personalizada",
                "Equipamentos profissionais",
                "Procedimentos auditáveis",
                "Compromisso ambiental",
              ].map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- timeline ---------------- */

function Timeline() {
  const items = [
    { year: "1986", title: "Início da BIOPRAG", body: "Nasce em Conchas/SP com o propósito de levar controle de pragas com responsabilidade técnica à região." },
    { year: "2000+", title: "Expansão regional", body: "Ampliamos a atuação para cidades vizinhas e iniciamos atendimento a indústrias e grandes condomínios." },
    { year: "2010+", title: "Modernização operacional", body: "Investimento em equipamentos profissionais, frota personalizada e padronização de processos." },
    { year: "2020+", title: "Fortalecimento digital", body: "Atendimento integrado por WhatsApp, monitoramento documentado e nova identidade institucional." },
    { year: "Hoje", title: "Referência regional", body: "Cliente recorrente em indústrias alimentícias, escolas, restaurantes e empresas — reconhecidos por estrutura, técnica e confiança." },
  ];
  return (
    <section className="py-20 lg:py-28 bg-surface border-y border-border">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">Linha do tempo</span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-balance">
              Quase 40 anos protegendo o que importa.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 relative">
          <div className="absolute left-3 lg:left-1/2 top-0 bottom-0 w-px bg-border" aria-hidden />
          <ol className="space-y-10 lg:space-y-16">
            {items.map((it, i) => {
              const isRight = i % 2 === 1;
              return (
                <li key={it.year} className="relative lg:grid lg:grid-cols-2 lg:gap-12">
                  <div className={`pl-10 lg:pl-0 ${isRight ? "lg:col-start-2 lg:pl-16" : "lg:pr-16 lg:text-right"}`}>
                    <Reveal delay={i * 60}>
                      <div className="card-premium p-6 lg:p-8 hover:card-premium-hover">
                        <div className="text-primary text-sm font-semibold tracking-[0.18em] uppercase">
                          {it.year}
                        </div>
                        <h3 className="mt-2 text-xl font-semibold">{it.title}</h3>
                        <p className="mt-3 text-ink-soft leading-relaxed text-[0.95rem]">{it.body}</p>
                      </div>
                    </Reveal>
                  </div>
                  <span
                    className="absolute left-3 lg:left-1/2 top-7 -translate-x-1/2 h-3 w-3 rounded-full bg-primary ring-4 ring-background"
                    aria-hidden
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- differentiators ---------------- */

function Differentiators() {
  const items = [
    { icon: ShieldCheck, title: "Segurança operacional", body: "Procedimentos rigorosos, EPIs completos e responsável técnico em todas as etapas." },
    { icon: Target, title: "Diagnóstico técnico", body: "Avaliação prévia para identificar pragas, focos e riscos antes de qualquer aplicação." },
    { icon: Sparkles, title: "Monitoramento preventivo", body: "Programa contínuo com registros mensais e relatórios para auditoria." },
    { icon: Leaf, title: "Compromisso ambiental", body: "Produtos registrados, manejo responsável e práticas alinhadas à saúde ambiental." },
    { icon: Truck, title: "Estrutura própria", body: "Frota personalizada, equipamentos profissionais e equipe interna treinada." },
    { icon: ShieldCheck, title: "Atendimento técnico", body: "Suporte direto com a equipe BIOPRAG e atendimento via WhatsApp." },
  ];
  return (
    <section className="py-20 lg:py-32">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">Diferenciais</span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-balance">
              Por que empresas, indústrias e famílias escolhem a BIOPRAG.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 50}>
              <div className="card-premium p-7 h-full hover:card-premium-hover">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <it.icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-ink-soft text-[0.95rem] leading-relaxed">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- services ---------------- */

const services = [
  { icon: Rat, title: "Controle de Roedores", body: "Programa estruturado de iscagem, monitoramento e correção de focos.", img: img2958.url },
  { icon: Bug, title: "Controle de Baratas", body: "Tratamentos seletivos com gel, aspersão técnica e atuação em pontos críticos.", img: img2957.url },
  { icon: Bug, title: "Controle de Formigas", body: "Eliminação de colônias internas e externas com produtos profissionais." },
  { icon: Bug, title: "Controle de Cupins", body: "Inspeção, identificação da espécie e tratamento curativo ou preventivo." },
  { icon: Bug, title: "Controle de Escorpiões", body: "Manejo integrado com vedações, monitoramento e aplicações específicas." },
  { icon: Bug, title: "Controle de Pombos", body: "Soluções de afastamento e manejo ambiental para áreas críticas." },
  { icon: Sparkles, title: "Sanitização", body: "Desinfecção de ambientes com produtos registrados e procedimentos auditáveis." },
  { icon: Droplets, title: "Limpeza de Caixa D'Água", body: "Higienização técnica com emissão de comprovante e dentro dos prazos sanitários." },
  { icon: ShieldCheck, title: "Controle Integrado (MIP)", body: "Programa completo combinando diagnóstico, ações e monitoramento contínuo." },
  { icon: Target, title: "Monitoramento Preventivo", body: "Visitas programadas, registros mensais e relatórios para auditorias." },
];

function Services() {
  return (
    <section id="servicos" className="py-20 lg:py-32 bg-surface border-y border-border">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow">Serviços</span>
              <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-balance">
                Soluções completas em controle de pragas e saúde ambiental.
              </h2>
            </div>
            <p className="lg:max-w-sm text-ink-soft text-[0.95rem]">
              Atendimento personalizado para residências, empresas, indústrias,
              condomínios, restaurantes e o setor alimentício.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 40}>
              <a
                href={whatsappLink(`Olá! Gostaria de mais informações sobre ${s.title}.`)}
                target="_blank"
                rel="noreferrer"
                className="card-premium block h-full overflow-hidden group hover:card-premium-hover"
              >
                {s.img && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <s.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-semibold text-base">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-[0.92rem] text-ink-soft leading-relaxed">{s.body}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Solicitar
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- process ---------------- */

function Process() {
  const steps = [
    { n: "01", title: "Solicitação", body: "Você nos chama pelo WhatsApp ou formulário e descreve sua necessidade." },
    { n: "02", title: "Diagnóstico", body: "Avaliamos o ambiente, identificamos pragas e focos." },
    { n: "03", title: "Planejamento", body: "Definimos o programa técnico mais seguro e eficaz para o seu caso." },
    { n: "04", title: "Execução", body: "Aplicação realizada por equipe própria com EPIs e equipamentos profissionais." },
    { n: "05", title: "Monitoramento", body: "Acompanhamento, relatórios e visitas programadas para manter o resultado." },
  ];
  return (
    <section id="processo" className="py-20 lg:py-32">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">Como funciona</span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-balance">
              Um método claro, técnico e auditável.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="card-premium p-6 h-full hover:card-premium-hover relative">
                <div className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
                  Etapa {s.n}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-[0.92rem] text-ink-soft leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- training ---------------- */

function Training() {
  return (
    <section className="py-20 lg:py-32 bg-surface border-y border-border">
      <div className="container-page grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="eyebrow">Treinamento & EPIs</span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-balance">
              Capacitação contínua para entregar mais segurança.
            </h2>
            <p className="mt-6 text-ink-soft text-base lg:text-lg leading-relaxed">
              Toda a equipe BIOPRAG passa por capacitação periódica, com foco em
              segurança operacional, uso correto de EPIs, manuseio de produtos
              registrados e procedimentos técnicos padronizados.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-8 space-y-3">
              {[
                "Responsável técnico ativo",
                "EPIs completos e específicos por serviço",
                "Procedimentos auditáveis e documentados",
                "Atualização contínua sobre normas e produtos",
              ].map((b) => (
                <li key={b} className="flex gap-3 items-start text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6" delay={80}>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-border shadow-soft">
              <img src={img2953.url} alt="Equipe BIOPRAG em EPI completo" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-4 pt-10">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-soft">
                <img src={img2958.url} alt="Manuseio técnico de produtos" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-soft">
                <img src={img2963.url} alt="Selo de monitoramento BIOPRAG" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- cases ---------------- */

function Cases() {
  return (
    <section id="cases" className="py-20 lg:py-32">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <span className="eyebrow">Cases</span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-balance">
              Empresas reais, resultados consistentes.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-5 lg:gap-6">
          <Reveal className="lg:col-span-2">
            <div className="card-premium overflow-hidden h-full hover:card-premium-hover">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={img2956.url} alt="Operação BIOPRAG em campo" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-7 lg:p-10">
                <span className="eyebrow">Case em destaque</span>
                <h3 className="mt-3 text-2xl lg:text-3xl font-bold">GramFer</h3>
                <p className="mt-4 text-ink-soft leading-relaxed">
                  Programa contínuo de Controle Integrado de Pragas com
                  monitoramento mensal documentado, atuação preventiva e suporte
                  técnico recorrente. Parceria consolidada como referência em
                  saúde ambiental industrial.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
                  {[
                    { v: "100%", l: "monitoramento documentado" },
                    { v: "Mensal", l: "frequência técnica" },
                    { v: "MIP", l: "controle integrado" },
                  ].map((m) => (
                    <div key={m.l}>
                      <div className="text-xl font-bold text-primary tabular-nums">{m.v}</div>
                      <div className="text-xs text-ink-soft mt-0.5">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-col gap-5 lg:gap-6 h-full">
              <div className="card-premium p-7 flex-1 hover:card-premium-hover">
                <Factory className="h-6 w-6 text-primary" />
                <h4 className="mt-4 font-semibold">Indústria alimentícia</h4>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Atendimento dentro dos padrões exigidos por auditorias
                  sanitárias, com relatórios mensais e plano de ação.
                </p>
              </div>
              <div className="card-premium p-7 flex-1 hover:card-premium-hover">
                <Shield className="h-6 w-6 text-primary" />
                <h4 className="mt-4 font-semibold">Condomínios & comércios</h4>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Programas preventivos com discrição, segurança para moradores
                  e clientes, e comunicação clara da síndica.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- coverage ---------------- */

function Coverage() {
  const cities = [
    "Conchas",
    "Laranjal Paulista",
    "Pereiras",
    "Porangaba",
    "Cesário Lange",
    "Botucatu",
    "Tatuí",
    "Região",
  ];
  return (
    <section id="cobertura" className="py-20 lg:py-32 bg-surface border-y border-border">
      <div className="container-page grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="eyebrow">Área de atendimento</span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-balance">
              Presença consolidada na região.
            </h2>
            <p className="mt-6 text-ink-soft text-base lg:text-lg leading-relaxed">
              Atendemos cidades vizinhas com a mesma estrutura, equipe e padrão
              técnico que mantemos em nossa sede em Conchas/SP.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {cities.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6" delay={80}>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-elevated">
            <img src={img2955.url} alt="Sede BIOPRAG em Conchas/SP" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const items = useMemo(
    () => [
      {
        q: "A BIOPRAG atende residências e empresas?",
        a: "Sim. Atendemos residências, empresas, indústrias, condomínios, restaurantes, comércios, escolas e galpões, com programas adaptados a cada tipo de ambiente.",
      },
      {
        q: "Os produtos utilizados são seguros?",
        a: "Trabalhamos exclusivamente com produtos registrados nos órgãos competentes, aplicados por equipe treinada com EPIs e procedimentos padronizados.",
      },
      {
        q: "É necessário sair do imóvel durante a aplicação?",
        a: "Depende do serviço e do ambiente. No diagnóstico técnico orientamos os cuidados específicos, prazos de retorno e ventilação.",
      },
      {
        q: "A BIOPRAG emite comprovante e relatório?",
        a: "Sim. Emitimos comprovantes dos serviços executados e, em programas de monitoramento, relatórios técnicos para auditorias e fiscalizações.",
      },
      {
        q: "Quais cidades vocês atendem?",
        a: "Conchas, Laranjal Paulista, Pereiras, Porangaba, Cesário Lange, Botucatu, Tatuí e demais cidades da região.",
      },
    ],
    [],
  );
  return (
    <section className="py-20 lg:py-32">
      <div className="container-page grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="eyebrow">Perguntas frequentes</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-balance">
              Tudo o que você precisa saber antes de contratar.
            </h2>
            <p className="mt-5 text-ink-soft">
              Não encontrou sua dúvida? Fale com a Caroline pelo WhatsApp.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-primary font-medium"
            >
              Falar no WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {items.map((it, i) => (
              <FAQItem key={i} q={it.q} a={it.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-6 group"
      >
        <span className="font-medium text-foreground text-[0.98rem]">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-ink-soft transition-transform ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-ink-soft text-[0.94rem] leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- quote form ---------------- */

function Quote() {
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    cidade: "",
    telefone: "",
    tipo: "",
    problema: "",
    mensagem: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      "Olá, visitei o site da BIOPRAG e gostaria de solicitar um orçamento.",
      "",
      `*Nome:* ${form.nome || "-"}`,
      `*Empresa:* ${form.empresa || "-"}`,
      `*Cidade:* ${form.cidade || "-"}`,
      `*Telefone:* ${form.telefone || "-"}`,
      `*Tipo de imóvel:* ${form.tipo || "-"}`,
      `*Problema encontrado:* ${form.problema || "-"}`,
      "",
      form.mensagem ? `*Mensagem:* ${form.mensagem}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(lines), "_blank");
  }

  const field =
    "w-full h-12 rounded-xl border border-input bg-background px-4 text-[0.95rem] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition";

  return (
    <section id="contato" className="py-20 lg:py-32 bg-surface border-y border-border">
      <div className="container-page grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="eyebrow">Orçamento</span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-balance">
              Preencha e envie pelo WhatsApp.
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              Você preenche, clica em enviar e abrimos uma conversa direta no
              WhatsApp da Caroline — sem cadastro, sem espera por e-mail.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 space-y-4">
              <ContactRow icon={MessageCircle} label="WhatsApp" value={WHATSAPP_DISPLAY} href={whatsappLink()} />
              <ContactRow icon={Phone} label="Telefone" value={PHONE_DISPLAY} href={`tel:+551438454011`} />
              <ContactRow icon={MapPin} label="Endereço" value={ADDRESS} />
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={100}>
          <form
            onSubmit={submit}
            className="card-premium p-6 lg:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input className={field} placeholder="Nome*" required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              <input className={field} placeholder="Empresa (opcional)" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} />
              <input className={field} placeholder="Cidade*" required value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} />
              <input className={field} placeholder="Telefone / WhatsApp*" required value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
            </div>
            <select
              className={field}
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              required
            >
              <option value="">Tipo de imóvel*</option>
              <option>Residência</option>
              <option>Empresa / Comércio</option>
              <option>Indústria</option>
              <option>Condomínio</option>
              <option>Restaurante</option>
              <option>Escola</option>
              <option>Outro</option>
            </select>
            <input
              className={field}
              placeholder="Problema encontrado (ex: baratas, ratos, cupins...)"
              value={form.problema}
              onChange={(e) => setForm({ ...form, problema: e.target.value })}
            />
            <textarea
              className={`${field} h-32 py-3 resize-none`}
              placeholder="Mensagem (opcional)"
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-deep transition-colors shadow-soft"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar pelo WhatsApp
            </button>
            <p className="text-xs text-muted-foreground">
              Ao enviar, abrimos uma conversa pré-preenchida no WhatsApp da
              Caroline Bioprag.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
        <div className="font-medium text-foreground">{value}</div>
      </div>
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-primary transition-colors">
      {Inner}
    </a>
  ) : (
    <div className="flex items-center gap-4">{Inner}</div>
  );
}

/* ---------------- final cta ---------------- */

function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={img2962.url} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1410]/95 via-[#0a1410]/85 to-[#0a1410]/70" />
      </div>
      <div className="container-page text-white">
        <Reveal>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold max-w-3xl text-balance leading-[1.05]">
            Pronto para proteger seu ambiente?
          </h2>
          <p className="mt-6 text-white/75 text-lg max-w-2xl">
            Solicite seu orçamento agora mesmo e fale diretamente com a equipe
            técnica da BIOPRAG.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-[oklch(0.22_0.04_165)] font-semibold hover:bg-white/90 transition-colors shadow-elevated"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors"
            >
              Preencher formulário
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */

function Footer() {
  return (
    <footer className="bg-[oklch(0.16_0.012_165)] text-white/80">
      <div className="container-page py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Triangle />
            </span>
            <div className="leading-none">
              <div className="font-display font-bold text-white">BIOPRAG®</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 mt-0.5">Desde 1986</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-white/60 leading-relaxed">
            Controle Integrado de Pragas, Saúde Ambiental e Biossegurança para
            residências, empresas e indústrias.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-white/40">Contato</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2 items-start"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> {ADDRESS}</li>
            <li className="flex gap-2 items-start"><Phone className="h-4 w-4 mt-0.5 text-primary" /> {PHONE_DISPLAY}</li>
            <li className="flex gap-2 items-start"><MessageCircle className="h-4 w-4 mt-0.5 text-primary" /> {WHATSAPP_DISPLAY}</li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-white/40">Serviços</div>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.title}>
                <a href="#servicos" className="hover:text-white transition-colors">{s.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-white/40">Acompanhe</div>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.instagram.com/bioprag_dedetizadora/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-primary hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-primary hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-deep transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Orçamento rápido
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} BIOPRAG® — Todos os direitos reservados.</div>
          <div className="flex items-center gap-2">
            <img src={logoAsset.url} alt="BIOPRAG" className="h-8 w-auto opacity-70" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- floating wpp ---------------- */

function WhatsappFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated hover:scale-105 transition-transform"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30" aria-hidden />
    </a>
  );
}
