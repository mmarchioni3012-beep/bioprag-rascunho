import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Award,
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
  Repeat,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
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

const WHATSAPP_NUMBER = "5514981752595";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE_DISPLAY = "(14) 3845-4011";
const WHATSAPP_DISPLAY = "(14) 98175-2595";
const ADDRESS = "Rua Goiás, 446 — Centro, Conchas/SP";

const META_TITLE =
  "BIOPRAG — Controle Integrado de Pragas, Saúde Ambiental e Biossegurança | Desde 1986";
const META_DESC =
  "Controle integrado de pragas, saúde ambiental e biossegurança com método técnico, auditável e 100% documentado. Atendimento em 8 municípios desde 1986.";

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

const DIFFERENTIALS = [
  { icon: Shield, title: "Técnica especializada", desc: "Profissionais certificados e treinados continuamente em protocolos avançados." },
  { icon: FileText, title: "Documentação completa", desc: "Laudos e relatórios técnicos auditáveis em cada atendimento." },
  { icon: Leaf, title: "Produtos seguros", desc: "Soluções aprovadas pela ANVISA, mínimo impacto ambiental." },
  { icon: Zap, title: "Capacidade operacional", desc: "Estrutura para atender grandes volumes com agilidade e precisão." },
  { icon: Repeat, title: "Monitoramento contínuo", desc: "Acompanhamento pós-serviço e garantia de resultado." },
  { icon: MapPin, title: "Presença regional", desc: "Atendimento consolidado em 8 municípios da região." },
];

const SERVICES = [
  { title: "Controle de Insetos Rasteiros", img: "https://images.unsplash.com/photo-1559762717-99c81ac85459?w=900&q=70", desc: "Baratas, formigas, traças e outros." },
  { title: "Controle de Insetos Voadores", img: "https://images.unsplash.com/photo-1567408498035-ebc6e09c5b16?w=900&q=70", desc: "Moscas, mosquitos e pernilongos." },
  { title: "Controle de Roedores", img: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=900&q=70", desc: "Desratização técnica com monitoramento." },
  { title: "Descupinização", img: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900&q=70", desc: "Madeira, solo e estruturas." },
  { title: "Sanitização de Ambientes", img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=70", desc: "Desinfecção bactericida e viricida." },
  { title: "Controle de Escorpiões", img: "https://images.unsplash.com/photo-1572376313095-49e07b3c5b3a?w=900&q=70", desc: "Plano técnico de prevenção e captura." },
  { title: "Tratamento de Jardins", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=70", desc: "Pragas em gramados e plantas." },
  { title: "Biossegurança / DDD", img: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=900&q=70", desc: "Programas para indústrias e hospitais." },
  { title: "Monitoramento Contínuo", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=70", desc: "Visitas técnicas programadas, relatórios e KPIs.", featured: true },
];

const METHOD = [
  { icon: Search, title: "Diagnóstico", desc: "Vistoria técnica completa e identificação de focos." },
  { icon: ClipboardList, title: "Planejamento", desc: "Plano de controle personalizado para o ambiente." },
  { icon: Target, title: "Execução", desc: "Aplicação com produtos certificados e EPI completo." },
  { icon: FileText, title: "Registro", desc: "Documentação técnica e laudo do serviço." },
  { icon: ShieldCheck, title: "Monitoramento", desc: "Acompanhamento contínuo e garantia de resultado." },
];

const CITIES = ["Conchas", "Pereiras", "Laranjal Paulista", "Anhembi", "Botucatu", "Tatuí", "Itatinga", "Porangaba"];

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
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#2ECC71] text-[#06180D]">
            <Hexagon className="h-5 w-5" strokeWidth={2.5} />
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
              { v: 39, s: " anos", p: "+" },
              { v: 10, s: "k+", p: "" },
              { v: 8, s: "", p: "" },
              { v: 100, s: "%", p: "" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-3xl font-bold text-[#2ECC71]">
                  {stat.p}<CountUp to={stat.v} suffix={stat.s} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-[#8FA98F]">
                  {["anos de operação", "atendimentos", "municípios", "documentado"][i]}
                </div>
              </div>
            ))}
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
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0F2415] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0F2415] to-transparent" />
        <div className="flex w-max animate-marquee gap-14 px-8">
          {row.map((c, i) => (
            <div
              key={i}
              className="flex h-12 shrink-0 items-center font-display text-xl font-bold tracking-wide text-[#F0F4F0]/50 transition-all hover:text-[#F0F4F0]"
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
              <img src={img2956.url} alt="Histórico Bioprag" className="h-full w-full object-cover object-[center_top]" />
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className={`group relative block overflow-hidden rounded-2xl border border-[#1C3D22] transition-all hover:border-[#2ECC71] ${
                  s.featured ? "lg:col-span-2" : ""
                }`}
              >
                <div className={`relative w-full ${s.featured ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/5]"}`}>
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A0F] via-[#0A1A0F]/40 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-xl font-bold text-[#F0F4F0]">{s.title}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-sm text-[#8FA98F] opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                    {s.desc}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2ECC71]">
                    Saiba mais <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
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
    </section>
  );
}

function Cases() {
  return (
    <section id="clientes" className="relative bg-[#0F2415] py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Clientes</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
            Empresas reais, resultados consistentes.
          </h2>
        </div>

        <Reveal>
          <div className="mt-12 grid gap-8 rounded-2xl border border-[#1C3D22] bg-[#0A1A0F] p-8 sm:p-12 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#2ECC71] bg-[#0F2415] font-display text-2xl font-bold text-[#2ECC71]">
                GF
              </div>
              <div>
                <div className="font-display text-lg font-bold text-[#F0F4F0]">GramFer</div>
                <div className="text-xs uppercase tracking-wider text-[#8FA98F]">Cliente desde 2014</div>
              </div>
            </div>
            <div>
              <div className="flex gap-1 text-[#2ECC71]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 font-display text-xl font-medium leading-snug text-[#F0F4F0] sm:text-2xl">
                “Em mais de uma década de parceria, a Bioprag se tornou uma extensão técnica da nossa
                operação. Documentação impecável e zero incidência sanitária.”
              </blockquote>
              <div className="mt-4 text-sm text-[#8FA98F]">Direção GramFer · Indústria</div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CLIENTS.map((c, i) => (
            <div
              key={i}
              className="flex h-20 items-center justify-center rounded-xl border border-[#1C3D22] bg-[#0A1A0F] font-display text-base font-bold text-[#F0F4F0]/60 transition-colors hover:border-[#2ECC71] hover:text-[#F0F4F0]"
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
            Atendimento consolidado na região.
          </h2>
          <p className="mt-5 text-base text-[#8FA98F]">
            Estrutura própria e equipes ativas em 8 municípios — pronta resposta para residências,
            comércios e operações industriais.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {CITIES.map((c) => (
              <div key={c} className="flex items-center gap-2 rounded-lg border border-[#1C3D22] bg-[#0F2415] px-3 py-2.5">
                <MapPin className="h-4 w-4 text-[#2ECC71]" />
                <span className="text-sm font-medium text-[#F0F4F0]">{c}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#1C3D22] pt-6">
            {[
              { v: 8, l: "municípios" },
              { v: 39, l: "anos" },
              { v: 6, l: "equipes ativas" },
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#1C3D22] lg:aspect-[4/4]">
            <img src={img2958.url} alt="Sede Bioprag" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A0F] via-transparent to-transparent" />
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

function FinalCTA() {
  return (
    <section
      id="contato"
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
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
