import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Bug,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileText,
  Hexagon,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plane,
  Rat,
  Repeat,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Star,
  Target,
  TreePine,
  X,
  Youtube,
  Zap,
} from "lucide-react";

import img2953 from "@/assets/IMG_2953.jpg.asset.json";
import img2955 from "@/assets/IMG_2955.jpg.asset.json";
import img2956 from "@/assets/IMG_2956.jpg.asset.json";
import img2957 from "@/assets/IMG_2957.jpg.asset.json";
import img2958 from "@/assets/IMG_2958.jpg.asset.json";
import img2962 from "@/assets/IMG_2962.jpg.asset.json";
import img2963 from "@/assets/IMG_2963.jpg.asset.json";
import brazilMap from "@/assets/brazil-map.svg.asset.json";
import bioprágLogo from "@/assets/bioprag-logo.jpeg.asset.json";
import bioprágSelo from "@/assets/bioprag-selo.png.asset.json";
import bioprágFachada from "@/assets/bioprag-fachada.png.asset.json";

const WHATSAPP_NUMBER = "5514981752595";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE_DISPLAY = "(14) 3845-4011";
const WHATSAPP_DISPLAY = "(14) 98175-2595";
const ADDRESS = "Rua Goiás, 446 — Centro, Conchas/SP";

const META_TITLE =
  "BIOPRAG — Controle Integrado de Pragas, Saúde Ambiental e Biossegurança | Desde 1986";
const META_DESC =
  "Controle integrado de pragas, saúde ambiental e biossegurança com método técnico, auditável e 100% documentado. Atendimento em todo o Brasil desde 1986.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: "description", content: META_DESC },
      { property: "og:title", content: META_TITLE },
      { property: "og:description", content: META_DESC },
      { name: "twitter:title", content: META_TITLE },
      { name: "twitter:description", content: META_DESC },
      { property: "og:image", content: img2953.url },
      { name: "twitter:image", content: img2953.url },
    ],
  }),
  component: HomePage,
});

/* ---------------- Hooks ---------------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const { ref, shown } = useReveal<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!shown) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration]);
  return <span ref={ref}>{n.toLocaleString("pt-BR")}{suffix}</span>;
}

/* ---------------- Data ---------------- */
const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#metodo", label: "Método" },
  { href: "#clientes", label: "Clientes" },
  { href: "#contato", label: "Contato" },
];

const CLIENTS = [
  "Grand Fair", "Brasilfer", "GramFer", "Supermercado Central",
  "Indústria Alfa", "Hospital São Lucas", "Colégio Horizonte", "Condomínio Park",
];

const TESTIMONIALS = [
  {
    initials: "GF",
    name: "GramFer",
    role: "Indústria · Cliente desde 2014",
    quote:
      "Em mais de uma década de parceria, a Bioprag se tornou uma extensão técnica da nossa operação. Documentação impecável e zero incidência sanitária.",
    author: "Direção GramFer",
  },
  {
    initials: "GF",
    name: "Grand Fair",
    role: "Varejo · Cliente desde 2018",
    quote:
      "Atendimento técnico de altíssimo nível. Os laudos da Bioprag passam com folga em qualquer auditoria sanitária — e a equipe é extremamente atenciosa.",
    author: "Gerência Operacional Grand Fair",
  },
  {
    initials: "BF",
    name: "Brasilfer",
    role: "Indústria · Cliente desde 2020",
    quote:
      "Profissionalismo, pontualidade e resultado. A Bioprag entrega exatamente o que promete e ainda nos ajuda a evoluir nossos protocolos internos.",
    author: "Coordenação SSMA Brasilfer",
  },
];

const DIFFERENTIALS = [
  { icon: Shield, title: "Técnica especializada", desc: "Profissionais certificados e treinados continuamente em protocolos avançados." },
  { icon: FileText, title: "Documentação completa", desc: "Laudos e relatórios técnicos auditáveis em cada atendimento." },
  { icon: Leaf, title: "Produtos seguros", desc: "Soluções aprovadas pela ANVISA, mínimo impacto ambiental." },
  { icon: Zap, title: "Capacidade operacional", desc: "Estrutura para atender grandes volumes com agilidade e precisão." },
  { icon: Repeat, title: "Monitoramento contínuo", desc: "Acompanhamento pós-serviço e garantia de resultado." },
  { icon: MapPin, title: "Cobertura nacional", desc: "Atendemos empresas e indústrias em todo o território brasileiro." },
];

type Service = {
  title: string;
  short: string;
  desc: string;
  img: string;
  icon: typeof Bug;
  large?: boolean;
};

const SERVICES: Service[] = [
  { title: "Monitoramento Contínuo", short: "Visitas periódicas e laudos técnicos", desc: "Programa premium com visitas técnicas programadas, indicadores e relatórios.", img: img2963.url, icon: ClipboardList, large: true },
  { title: "Controle de Insetos Rasteiros", short: "Baratas, formigas, cupins de solo", desc: "Eliminação técnica de pragas rasteiras em qualquer ambiente.", img: img2955.url, icon: Bug },
  { title: "Controle de Insetos Voadores", short: "Mosquitos, moscas, mariposas", desc: "Manejo integrado de voadores com produtos certificados.", img: img2956.url, icon: Plane },
  { title: "Controle de Roedores", short: "Ratos e camundongos", desc: "Desratização técnica com mapa de iscas e monitoramento.", img: img2962.url, icon: Rat },
  { title: "Descupinização", short: "Cupins de madeira e estruturais", desc: "Tratamento estrutural com garantia contra cupins.", img: img2953.url, icon: TreePine },
  { title: "Sanitização de Ambientes", short: "Desinfecção e higienização", desc: "Sanitização bactericida e viricida para qualquer ambiente.", img: img2958.url, icon: SprayCan },
  { title: "Controle de Escorpiões", short: "Prevenção e eliminação", desc: "Plano técnico de prevenção, captura e bloqueio de acessos.", img: img2955.url, icon: Shield },
  { title: "Biossegurança / DDD", short: "Desinfecção, desratização, dedetização", desc: "Programas completos para indústrias, hospitais e operações de grande porte.", img: img2957.url, icon: ShieldCheck, large: true },
];

const METHOD = [
  { icon: Search, title: "Diagnóstico", desc: "Vistoria técnica completa e identificação de focos." },
  { icon: ClipboardList, title: "Planejamento", desc: "Plano de controle personalizado para o ambiente." },
  { icon: Target, title: "Execução", desc: "Aplicação com produtos certificados e EPI completo." },
  { icon: FileText, title: "Registro", desc: "Documentação técnica e laudo do serviço." },
  { icon: ShieldCheck, title: "Monitoramento", desc: "Acompanhamento contínuo e garantia de resultado." },
];

const REGIONS = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

const FAQ = [
  { q: "Como funciona o processo do início ao fim?", a: "Iniciamos com vistoria técnica gratuita, elaboramos um plano personalizado, executamos com produtos certificados e entregamos laudo + cronograma de monitoramento." },
  { q: "Os produtos utilizados são seguros para crianças e pets?", a: "Sim. Trabalhamos exclusivamente com produtos aprovados pela ANVISA, aplicados por profissionais treinados, com baixíssima toxicidade residual." },
  { q: "Preciso sair de casa durante o serviço?", a: "Na maioria dos serviços não é necessário. Para casos específicos orientamos um curto período de ausência, sempre informado previamente." },
  { q: "Vocês emitem laudo técnico?", a: "Sim. Todo atendimento gera laudo técnico detalhado, exigível por órgãos sanitários e auditorias." },
  { q: "Qual o prazo de garantia dos serviços?", a: "A garantia varia por serviço, podendo chegar a 12 meses com plano de monitoramento contínuo." },
  { q: "Atendem empresas de grande porte?", a: "Sim. Operamos com indústrias, redes de varejo, hospitais e condomínios, com estrutura para grandes volumes." },
];

/* ---------------- Background pieces ---------------- */
function HexGrid() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-60" aria-hidden="true">
      <defs>
        <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
          <path d="M28 2 L52 16 L52 40 L28 54 L4 40 L4 16 Z" fill="none" stroke="rgba(46,204,113,0.10)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" className="animate-hex-pulse" />
    </svg>
  );
}

function FloatingDots() {
  const dots = Array.from({ length: 24 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/30 animate-float-dot"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 7) * 0.6}s`,
            animationDuration: `${6 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- Sections ---------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#0A1A0F]/85 backdrop-blur-md border-b border-[#1C3D22]" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-md bg-white p-1">
            <img src={bioprágLogo.url} alt="Bioprag" className="h-full w-full object-contain" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-[#F0F4F0]">BIOPRAG</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-[#8FA98F] transition-colors hover:text-[#F0F4F0]">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-lg bg-[#2ECC71] px-4 py-2 text-sm font-semibold text-[#06180D] transition-all hover:bg-[#7DFFB3] md:inline-flex"
        >
          Falar com especialista <ArrowRight className="h-4 w-4" />
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-md border border-[#1C3D22] text-[#F0F4F0] md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-72 bg-[#0F2415] border-l border-[#1C3D22] p-6 transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display font-extrabold text-[#F0F4F0]">BIOPRAG</span>
            <button onClick={() => setOpen(false)} aria-label="Fechar" className="text-[#8FA98F]">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-5">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-base font-medium text-[#F0F4F0]">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2ECC71] px-4 py-3 text-sm font-semibold text-[#06180D]"
          >
            Falar com especialista
          </a>
        </aside>
      </div>
    </header>
  );
}

function Hero() {
  const words = ["Proteção", "que", "você", "pode", "medir."];
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden hexbg pt-24">
      <HexGrid />
      <FloatingDots />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-xl border border-[#1C3D22] bg-white/95 p-2.5 pr-4 animate-fade-up">
            <img src={bioprágLogo.url} alt="Bioprag — Controle Integrado de Pragas Urbanas, desde 1986" className="h-12 w-auto object-contain" />
          </div>
          <span className="eyebrow animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" /> Desde 1986 · Controle Integrado de Pragas
          </span>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-[#F0F4F0] sm:text-6xl lg:text-[72px]">
            {words.map((w, i) => (
              <span
                key={i}
                className="inline-block animate-fade-up"
                style={{ animationDelay: `${0.15 + i * 0.08}s`, marginRight: "0.25em" }}
              >
                {i === words.length - 1 ? <span className="text-[#2ECC71]">{w}</span> : w}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-base text-[#8FA98F] sm:text-lg animate-fade-up" style={{ animationDelay: "0.7s" }}>
            Controle integrado de pragas, saúde ambiental e biossegurança com método técnico,
            auditável e 100% documentado.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.85s" }}>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2ECC71] px-6 py-3.5 text-sm font-semibold text-[#06180D] transition-all hover:bg-[#7DFFB3] glow-green"
            >
              Solicitar orçamento <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#metodo"
              className="inline-flex items-center gap-2 rounded-lg border border-[#F0F4F0]/30 px-6 py-3.5 text-sm font-semibold text-[#F0F4F0] transition-all hover:bg-[#F0F4F0]/5"
            >
              Conhecer o método
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 animate-fade-up" style={{ animationDelay: "1s" }}>
            {[
              { v: 39, s: " anos", p: "+", label: "anos de operação" },
              { v: 10, s: "k+", p: "", label: "atendimentos" },
              { v: 100, s: "%", p: "", label: "documentado" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-3xl font-bold text-[#2ECC71]">
                  {stat.p}<CountUp to={stat.v} suffix={stat.s} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-[#8FA98F]">
                  {stat.label}
                </div>
              </div>
            ))}
            <div>
              <div className="font-display text-2xl font-bold text-[#2ECC71]">Nacional</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[#8FA98F]">Atendimento em todo o Brasil</div>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#1C3D22] glow-green">
            <img src={img2953.url} alt="Equipe Bioprag em operação" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A0F] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-[#1C3D22] bg-[#0A1A0F]/80 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-[#2ECC71] text-[#06180D]">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#F0F4F0]">Operação certificada</div>
                  <div className="text-xs text-[#8FA98F]">Equipe técnica · EPI completo · Laudo emitido</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-[#2ECC71]/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

function ClientsMarquee() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="relative border-y border-[#1C3D22] bg-[#0F2415] py-10">
      <div className="container-page mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[#8FA98F]">Empresas que confiam na Bioprag</p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0F2415] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0F2415] to-transparent" />
        <div className="flex w-max animate-marquee gap-10 px-10">
          {row.map((c, i) => (
            <div
              key={i}
              aria-label={`Logo ${c}`}
              className="flex h-16 w-44 shrink-0 items-center justify-center rounded-md border border-dashed border-[#F0F4F0]/20 bg-[#0A1A0F] font-display text-sm font-bold uppercase tracking-[0.18em] text-[#F0F4F0]/40 transition-colors hover:border-[#2ECC71]/60 hover:text-[#F0F4F0]/80"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function About() {
  return (
    <section id="sobre" className="relative py-24 sm:py-32">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Sobre a Bioprag</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
            Quase 40 anos protegendo o que importa.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#8FA98F]">
            Fundada em 1986, a Bioprag nasceu com a missão de elevar o padrão técnico do controle de pragas
            no interior paulista. Hoje somos referência regional em saúde ambiental e biossegurança,
            atendendo residências, comércios, indústrias, hospitais e órgãos públicos.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#8FA98F]">
            Operamos com método, documentação e responsabilidade ambiental — porque proteção que não pode
            ser comprovada não é proteção.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Award, t: "Reputação consolidada" },
              { icon: Leaf, t: "Compromisso ambiental" },
              { icon: Target, t: "Foco em resultado" },
            ].map((d, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#1A3D22] text-[#2ECC71]">
                  <d.icon className="h-4 w-4" />
                </span>
                <div className="text-sm font-medium text-[#F0F4F0]">{d.t}</div>
              </div>
            ))}
          </div>
          <a href="#metodo" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2ECC71] hover:text-[#7DFFB3]">
            Conheça nosso método <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#1C3D22]">
              <img src={bioprágFachada.url} alt="Fachada da sede Bioprag em Conchas/SP" className="h-full w-full object-cover object-center" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A1A0F] to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-[#1C3D22] bg-[#0F2415] p-5 sm:block">
              <div className="font-display text-4xl font-bold text-[#2ECC71]">1986</div>
              <div className="text-xs uppercase tracking-wider text-[#8FA98F]">Ano de fundação</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="relative bg-[#0F2415] py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Por que escolher</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
            Diferenciais que se medem em resultado.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((d, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="card-bp group h-full p-6 hover:card-bp-hover">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#2ECC71] text-[#06180D] transition-transform group-hover:scale-110">
                  <d.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-[#F0F4F0]">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8FA98F]">{d.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">Serviços</span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
              Soluções completas para cada ambiente.
            </h2>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2ECC71] hover:text-[#7DFFB3]">
            Tirar dúvidas <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid auto-rows-[280px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={(i % 3) * 0.06} className={s.large ? "lg:col-span-2" : ""}>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block h-[280px] w-full overflow-hidden rounded-2xl border border-[#1C3D22] transition-all hover:border-[#2ECC71]"
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[rgba(0,20,5,0.65)] transition-colors duration-500 group-hover:bg-[rgba(0,20,5,0.78)]" />
                  <span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-md bg-[#2ECC71] text-[#06180D]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-xl font-bold text-[#F0F4F0] sm:text-2xl">{s.title}</h3>
                    <p className="mt-1 max-h-0 overflow-hidden text-sm text-[#D5E5D5] opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                      {s.short}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2ECC71] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Saiba mais <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="metodo" className="relative bg-[#0F2415] py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Método</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
            Um método claro, técnico e auditável.
          </h2>
          <p className="mt-5 text-base text-[#8FA98F]">
            Cinco etapas estruturadas para entregar resultado mensurável em cada operação.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-[#2ECC71]/40 to-transparent lg:block" />
          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {METHOD.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="relative">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#2ECC71] bg-[#0A1A0F] font-display text-lg font-bold text-[#2ECC71]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <m.icon className="h-5 w-5 text-[#2ECC71] lg:mt-4" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-[#F0F4F0]">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#8FA98F]">{m.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Training() {
  const teamPhotos = [img2953, img2955, img2956, img2957, img2958, img2962];
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Capacitação</span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
              Equipe treinada para entregar mais segurança.
            </h2>
            <p className="mt-5 text-base text-[#8FA98F]">
              Investimos continuamente em formação técnica e protocolos de biossegurança.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Treinamentos mensais obrigatórios",
                "Certificações técnicas atualizadas",
                "Uso correto de EPIs e equipamentos",
                "Protocolos de biossegurança rigorosos",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2ECC71]" />
                  <span className="text-sm font-medium text-[#F0F4F0]">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#1C3D22]">
              <img src={img2962.url} alt="Capacitação Bioprag" className="h-full w-full object-cover object-[center_top]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1A0F]/60 to-transparent" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16">
            <h3 className="font-display text-xl font-bold text-[#F0F4F0] sm:text-2xl">Equipe em campo</h3>
            <p className="mt-2 text-sm text-[#8FA98F]">Operações reais, executadas com método e padrão técnico.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {teamPhotos.map((p, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-[#1C3D22]">
                  <img
                    src={p.url}
                    alt={`Equipe Bioprag em campo ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A0F]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section id="clientes" className="relative bg-[#0F2415] py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
            Empresas reais, resultados consistentes.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-[#1C3D22] bg-[#0A1A0F] p-7 transition-colors hover:border-[#2ECC71]/60">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#2ECC71] bg-[#0F2415] font-display text-base font-bold text-[#2ECC71]">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-base font-bold text-[#F0F4F0]">{t.name}</div>
                    <div className="text-[11px] uppercase tracking-wider text-[#8FA98F]">{t.role}</div>
                  </div>
                </div>
                <div className="mt-5 flex gap-1 text-[#2ECC71]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-base leading-relaxed text-[#F0F4F0]/90">
                  “{t.quote}”
                </blockquote>
                <div className="mt-5 border-t border-[#1C3D22] pt-4 text-xs text-[#8FA98F]">{t.author}</div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CLIENTS.map((c, i) => (
            <div
              key={i}
              className="flex h-20 items-center justify-center rounded-xl border border-dashed border-[#1C3D22] bg-[#0A1A0F] font-display text-sm font-bold uppercase tracking-[0.15em] text-[#F0F4F0]/50 transition-colors hover:border-[#2ECC71] hover:text-[#F0F4F0]"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Regional() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Presença</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
            Presença em todo o Brasil.
          </h2>
          <p className="mt-5 text-base text-[#8FA98F]">
            Estrutura técnica e equipes prontas para atender empresas, indústrias e instituições em
            todo o território brasileiro — com o mesmo padrão de método e documentação.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {REGIONS.map((c) => (
              <div key={c} className="flex items-center gap-2 rounded-lg border border-[#1C3D22] bg-[#0F2415] px-3 py-2.5">
                <MapPin className="h-4 w-4 text-[#2ECC71]" />
                <span className="text-sm font-medium text-[#F0F4F0]">{c}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#1C3D22] pt-6">
            {[
              { v: 5, l: "regiões" },
              { v: 39, l: "anos" },
              { v: 100, l: "% documentado", s: "" },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display text-3xl font-bold text-[#2ECC71]">
                  <CountUp to={s.v} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-[#8FA98F]">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#1C3D22] bg-[#0F2415] p-8">
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(46,204,113,0.18),transparent_65%)]" />
            <img
              src={brazilMap.url}
              alt="Mapa do Brasil — atendimento nacional"
              className="relative z-[1] h-full w-full object-contain [filter:drop-shadow(0_0_24px_rgba(46,204,113,0.45))]"
              loading="lazy"
            />
            {/* Regional pulse dots positioned over the map (% based on viewBox) */}
            <div className="absolute inset-8 z-[2]">
              {[
                { x: "28%", y: "30%", label: "Norte" },
                { x: "70%", y: "32%", label: "Nordeste" },
                { x: "48%", y: "55%", label: "Centro-Oeste" },
                { x: "65%", y: "67%", label: "Sudeste" },
                { x: "52%", y: "82%", label: "Sul" },
              ].map((p) => (
                <span
                  key={p.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: p.x, top: p.y }}
                  aria-label={p.label}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-[#2ECC71] ring-2 ring-[#0A1A0F]" />
                  </span>
                </span>
              ))}
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-[3] rounded-xl border border-[#1C3D22] bg-[#0A1A0F]/90 p-4 backdrop-blur-md">
              <div className="text-xs uppercase tracking-[0.18em] text-[#8FA98F]">Cobertura</div>
              <div className="font-display text-lg font-bold text-[#F0F4F0]">Atendimento em todo o Brasil</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-[#1C3D22] transition-colors ${open ? "bg-[#0F2415]" : ""}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold text-[#F0F4F0] sm:text-lg">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#2ECC71] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <p className="px-5 pb-5 text-sm leading-relaxed text-[#8FA98F]">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const mid = Math.ceil(FAQ.length / 2);
  const cols = [FAQ.slice(0, mid), FAQ.slice(mid)];
  return (
    <section className="relative bg-[#0F2415] py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
            Tudo que você precisa saber antes de contratar.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {cols.map((col, ci) => (
            <div key={ci} className="rounded-2xl border border-[#1C3D22] bg-[#0A1A0F] overflow-hidden">
              {col.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    nome: "",
    cidade: "",
    servico: "",
    mensagem: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Sou ${form.nome}, de ${form.cidade}. Interesse em ${form.servico}. ${form.mensagem}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const labelCls = "block font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8FA98F] mb-1.5";
  const inputCls =
    "w-full rounded-lg border border-[#1C3D22] bg-[#0A1A0F] px-4 py-3 text-sm text-[#F0F4F0] placeholder:text-[#8FA98F]/60 outline-none transition-colors focus:border-[#2ECC71]";

  return (
    <section id="contato" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Contato</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
            Fale com um especialista.
          </h2>
          <p className="mt-4 text-base text-[#8FA98F]">
            Preencha abaixo e nossa equipe entra em contato pelo WhatsApp em até 1h.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-[#1C3D22]">
              <iframe
                src="https://www.google.com/maps?q=Rua+Goi%C3%A1s,+446+-+Centro,+Conchas+-+SP,+18570-043&z=17&output=embed"
                width="100%"
                height="450"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.85) contrast(0.95)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Bioprag — Rua Goiás, 446, Centro, Conchas/SP — CEP 18570-043"
              />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Rua+Goi%C3%A1s+446+Centro+Conchas+SP+18570-043"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg bg-[#0A1A0F]/90 px-3 py-2 text-xs font-semibold text-[#F0F4F0] backdrop-blur-md ring-1 ring-[#2ECC71]/40 hover:bg-[#0A1A0F]"
              >
                <MapPin className="h-3.5 w-3.5 text-[#2ECC71]" /> Como chegar
              </a>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0F2415] p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#2ECC71]" />
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-[#8FA98F]">Endereço</div>
                  <div className="text-sm font-medium text-[#F0F4F0]">{ADDRESS}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0F2415] p-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#2ECC71]" />
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-[#8FA98F]">Telefone</div>
                  <div className="text-sm font-medium text-[#F0F4F0]">{PHONE_DISPLAY}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0F2415] p-4 sm:col-span-2">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#2ECC71]" />
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-[#8FA98F]">WhatsApp</div>
                  <div className="text-sm font-medium text-[#F0F4F0]">{WHATSAPP_DISPLAY}</div>
                </div>
              </div>
            </div>

            {/* Selo Bioprag */}
            <div className="mt-6 relative overflow-hidden rounded-2xl p-[1.5px] bg-gradient-to-br from-[#2ECC71] via-[#7DFFB3] to-[#2ECC71]">
              <div className="relative rounded-2xl bg-[#0A1A0F] p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#2ECC71] text-[#06180D] glow-green">
                    <ShieldCheck className="h-7 w-7" strokeWidth={2.4} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#2ECC71]">Selo Bioprag</div>
                    <h3 className="mt-1 font-display text-xl font-bold leading-snug text-[#F0F4F0] sm:text-2xl">
                      Pronto para receber o Selo Bioprag de Segurança?
                    </h3>
                    <p className="mt-2 text-sm text-[#8FA98F]">
                      Certificação técnica que atesta o padrão de biossegurança da sua operação.
                    </p>
                  </div>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2ECC71] px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-[#06180D] transition-all hover:bg-[#7DFFB3]"
                >
                  Falar com especialista <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="rounded-2xl border border-[#1C3D22] bg-[#0F2415] p-6 sm:p-8">
              <div>
                <label className={labelCls}>Nome *</label>
                <input required value={form.nome} onChange={update("nome")} className={inputCls} placeholder="Seu nome completo" />
              </div>
              <div className="mt-4">
                <label className={labelCls}>Cidade *</label>
                <input required value={form.cidade} onChange={update("cidade")} className={inputCls} placeholder="Cidade / Estado" />
              </div>
              <div className="mt-4">
                <label className={labelCls}>Tipo de serviço *</label>
                <select required value={form.servico} onChange={update("servico")} className={inputCls}>
                  <option value="">Selecione</option>
                  <option>Monitoramento Contínuo</option>
                  <option>Controle de Insetos Rasteiros</option>
                  <option>Controle de Insetos Voadores</option>
                  <option>Controle de Roedores</option>
                  <option>Descupinização</option>
                  <option>Sanitização de Ambientes</option>
                  <option>Controle de Escorpiões</option>
                  <option>Biossegurança / DDD</option>
                  <option>Outro / Não sei ao certo</option>
                </select>
              </div>
              <div className="mt-4">
                <label className={labelCls}>Mensagem</label>
                <textarea rows={4} value={form.mensagem} onChange={update("mensagem")} className={inputCls} placeholder="Conte mais sobre sua situação (opcional)" />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#25D366] px-6 py-3.5 font-sans text-sm font-semibold text-white transition-all hover:brightness-110"
              >
                <MessageCircle className="h-5 w-5" />
                Enviar para o WhatsApp
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-xs text-[#8FA98F]">
                Resposta em até 1 hora em horário comercial.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      id="cta-final"
      className="relative isolate overflow-hidden py-28 sm:py-36"
      style={{
        background: "linear-gradient(135deg, #0A1A0F 0%, #1A3D1F 50%, #0A1A0F 100%)",
      }}
    >
      <HexGrid />
      <div className="container-page relative text-center">
        <Reveal>
          <span className="eyebrow justify-center">Contato direto</span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-6xl">
            Pronto para proteger o que é seu?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-[#8FA98F] sm:text-lg">
            Fale com um especialista agora. Atendimento rápido pelo WhatsApp.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#25D366] px-7 py-4 font-display text-base font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#1FBA58] glow-green"
            >
              <MessageCircle className="h-5 w-5" />
              Iniciar conversa no WhatsApp
            </a>
            <a
              href={`tel:+551438454011`}
              className="inline-flex items-center gap-2 rounded-lg border border-[#F0F4F0]/30 px-7 py-4 text-base font-semibold text-[#F0F4F0] hover:bg-[#F0F4F0]/5"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#1C3D22] bg-[#060F08] pt-16 pb-8">
      <div className="container-page grid gap-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#2ECC71] text-[#06180D]">
              <Hexagon className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-extrabold text-[#F0F4F0]">BIOPRAG</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#8FA98F]">
            Controle integrado de pragas, saúde ambiental e biossegurança. Atuação técnica desde 1986.
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Youtube].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="Rede social"
                className="grid h-9 w-9 place-items-center rounded-md border border-[#1C3D22] text-[#8FA98F] hover:border-[#2ECC71] hover:text-[#2ECC71]"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#F0F4F0]">Serviços</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-[#8FA98F]">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.title}>
                <a href="#servicos" className="transition-colors hover:text-[#2ECC71]">{s.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#F0F4F0]">Empresa</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-[#8FA98F]">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-[#2ECC71]">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#F0F4F0]">Contato</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-[#8FA98F]">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-[#2ECC71]" /> {ADDRESS}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#2ECC71]" /> {PHONE_DISPLAY}</li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-[#2ECC71]" /> {WHATSAPP_DISPLAY}</li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-12 border-t border-[#1C3D22] pt-6 text-center text-xs text-[#8FA98F]">
        © {new Date().getFullYear()} BIOPRAG — Controle Integrado de Pragas. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com especialista no WhatsApp"
      className="group fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg animate-pulse-soft"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md bg-[#0F2415] px-3 py-1.5 text-xs font-semibold text-[#F0F4F0] opacity-0 transition-opacity group-hover:opacity-100">
        Falar com especialista
      </span>
    </a>
  );
}

/* ---------------- Page ---------------- */
function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A1A0F] text-[#F0F4F0]">
      <Navbar />
      <main>
        <Hero />
        <ClientsMarquee />
        <About />
        <WhyChoose />
        <Services />
        <Method />
        <Training />
        <Cases />
        <Regional />
        <Faq />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
