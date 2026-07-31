import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  Bug,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Factory,
  FileText,
  Hexagon,
  Home,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Plane,
  Rat,
  Repeat,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Droplets,
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
import biopragSeloCrop from "@/assets/bioprag-selo-crop.png";
import biopragLogoFull from "@/assets/bioprag-logo-full.png";
import biopragMark from "@/assets/bioprag-mark.png";
import biopragFachada from "@/assets/bioprag-fachada.png.asset.json";
import foto10 from "@/assets/foto_10.webp.asset.json";
import foto11 from "@/assets/foto_11.webp.asset.json";
import foto12 from "@/assets/foto_12.webp.asset.json";
import foto16 from "@/assets/foto_16.webp.asset.json";
import foto19 from "@/assets/foto_19.webp.asset.json";
import foto20 from "@/assets/foto_20.webp.asset.json";
import foto28 from "@/assets/foto_28_v2.png.asset.json";
import heroTecnico from "@/assets/hero-tecnico.png.asset.json";

import foto29 from "@/assets/foto_29.webp.asset.json";
import foto33 from "@/assets/foto_33.webp.asset.json";
import foto34 from "@/assets/foto_34.webp.asset.json";
import segResidencial from "@/assets/seg-residencial.png";
import segComercial from "@/assets/seg-comercial.png";
import segIndustrial from "@/assets/seg-industrial.png";

const WHATSAPP_NUMBER = "5514981752595";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE_DISPLAY = "(14) 3845-4011";
const WHATSAPP_DISPLAY = "(14) 98175-2595";
const EMAIL = "vendas@bioprag.com.br";
const ADDRESS = "Rua Goiás, 446 — Centro, Conchas/SP";
const ADDRESS_FILIAL = "Rua Emerson José, 1710 — Sala 07, Campinas/SP";
const MAPS_URL = "https://maps.app.goo.gl/AwckADfya2dRDSbs5";
const UNIDADES = {
  matriz: {
    label: "Matriz — Rua Goiás, 446, Centro, Conchas/SP",
    query: "Rua Goiás, 446 - Centro, Conchas - SP, 18570-043",
    directions: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent("Rua Goiás, 446 - Centro, Conchas - SP, 18570-043"),
  },
  filial: {
    label: "Filial — Rua Emerson José Moreira, 1710, Chácara Primavera, Campinas/SP",
    query: "Rua Emerson José Moreira, 1710 - Chácara Primavera, Campinas - SP, 13087-441",
    directions: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent("Rua Emerson José Moreira, 1710 - Chácara Primavera, Campinas - SP, 13087-441"),
  },
} as const;

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

/* ---------------- Icons ---------------- */
function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.04 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.41L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.28 1.63h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.64-3.75-9.06a12.72 12.72 0 0 0-9.06-3.65Zm0 23.06h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.01 1.05 1.07-3.91-.25-.4a10.58 10.58 0 0 1-1.62-5.65c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.5 1.11 7.51 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.86-4.77 10.61-10.64 10.61Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.5.14-.66.15-.15.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.25 3.43 5.45 4.81.76.33 1.35.52 1.82.67.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

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
  { href: "#atendimento", label: "Atendimento" },
  { href: "#contato", label: "Contato" },
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
  { title: "Manejo Integrado de Pragas", short: "Diagnóstico, prevenção e controle", desc: "Programa técnico completo de MIP com inspeção, barreiras e indicadores.", img: foto33.url, icon: ClipboardList },
  { title: "Desinsetização", short: "Controle químico e mecânico de insetos", desc: "Aplicação técnica com produtos registrados na ANVISA.", img: foto11.url, icon: SprayCan },
  { title: "Controle de Insetos Rasteiros", short: "Baratas, formigas e afins", desc: "Eliminação técnica de pragas rasteiras em qualquer ambiente.", img: foto20.url, icon: Bug },
  { title: "Controle de Insetos Voadores", short: "Mosquitos, moscas e mariposas", desc: "Manejo integrado de voadores com produtos certificados.", img: foto34.url, icon: Plane },
  { title: "Desratização", short: "Ratos e camundongos", desc: "Mapa de iscas, porta-iscas lacrados e monitoramento contínuo.", img: foto10.url, icon: Rat },
  { title: "Descupinização", short: "Cupins de solo e de madeira", desc: "Tratamento estrutural com garantia contra cupins.", img: img2953.url, icon: TreePine },
  { title: "Pragas Urbanas e Vetores", short: "Escorpiões, aranhas e vetores", desc: "Bloqueio de acessos, captura e controle de vetores urbanos.", img: foto29.url, icon: ShieldCheck },
  { title: "Higienização de Reservatórios", short: "Limpeza de caixas d'água", desc: "Higienização de reservatórios com laudo técnico e potabilidade.", img: foto12.url, icon: Droplets },
  { title: "Sanitização e Desinfecção", short: "Ambientes e superfícies", desc: "Sanitização bactericida e viricida para qualquer ambiente.", img: foto28.url, icon: Sparkles },
  { title: "Monitoramento e Prevenção", short: "Visitas periódicas e laudos", desc: "Acompanhamento programado com relatórios e ações preventivas.", img: foto16.url, icon: Repeat },
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
          <img src={biopragMark} alt="Bioprag" width={492} height={478} className="h-10 w-10 shrink-0 object-contain [filter:drop-shadow(0_0_10px_rgba(46,204,113,0.35))]" />
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
          <img
            src={biopragLogoFull}
            alt="Bioprag — Controle Integrado de Pragas Urbanas, desde 1986"
            width={1881}
            height={1052}
            className="mb-6 h-20 w-auto object-contain object-left animate-fade-up [filter:drop-shadow(0_0_28px_rgba(46,204,113,0.28))]"
          />
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
              { v: 40, s: " anos", p: "+", label: "anos de operação" },
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
        <div className="relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#1C3D22] glow-green sm:aspect-[16/10] lg:aspect-[4/5]">
            <img
              src={heroTecnico.url}
              alt="Técnico Bioprag com EPI completo em operação de sanitização"
              className="h-full w-full object-cover object-[center_22%] lg:object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A0F] via-[#0A1A0F]/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[#1C3D22] bg-[#0A1A0F]/80 p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#2ECC71] text-[#06180D]">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div className="min-w-0">
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
            Mais de 40 anos protegendo o que importa.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#8FA98F]">
            Fundada em 1986, a Bioprag nasceu com a missão de elevar o padrão técnico do controle de pragas
            no interior paulista. Com sede em Conchas/SP e filial em Campinas/SP, a empresa reúne
            experiência, conhecimento técnico e estrutura operacional própria — atendendo residências,
            comércios, indústrias, hospitais e órgãos públicos em todo o Brasil.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#8FA98F]">
            Operamos com método, documentação e responsabilidade ambiental — porque proteção que não pode
            ser comprovada não é proteção.
          </p>

          {/* Matriz & Filial */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                tag: "Matriz",
                city: "Conchas / SP",
                addr: "Rua Goiás, 446 — Centro\nCEP 18570-043",
              },
              {
                tag: "Filial",
                city: "Campinas / SP",
                addr: "Rua Emerson José, 1710 — Sala 07\nCampinas / SP",
              },
            ].map((u) => (
              <div key={u.tag} className="rounded-xl border border-[#1C3D22] bg-[#0F2415] p-5 transition-colors hover:border-[#2ECC71]/60">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#2ECC71]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2ECC71]">{u.tag}</span>
                </div>
                <div className="mt-2 font-display text-lg font-bold text-[#F0F4F0]">{u.city}</div>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-[#8FA98F]">{u.addr}</p>
              </div>
            ))}
          </div>

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
              <img src={biopragFachada.url} alt="Fachada da sede Bioprag em Conchas/SP" className="h-full w-full object-cover object-center" />
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={(i % 4) * 0.06}>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block h-[260px] w-full overflow-hidden rounded-2xl border border-[#1C3D22] transition-all hover:border-[#2ECC71]"
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-[center_28%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,20,5,0.92)] via-[rgba(0,20,5,0.55)] to-[rgba(0,20,5,0.25)] transition-colors duration-500 group-hover:from-[rgba(0,20,5,0.95)]" />
                  <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-md bg-[#2ECC71] text-[#06180D]">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-base font-bold leading-tight text-[#F0F4F0]">{s.title}</h3>
                    <p className="mt-1 text-xs text-[#D5E5D5]/85">{s.short}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2ECC71] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Saiba mais <ArrowRight className="h-3 w-3" />
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
  const teamPhotos = [foto33, foto29, foto19, foto28, foto20, foto16, foto12, foto10];
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Capacitação</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl">
            Equipe treinada para entregar mais segurança.
          </h2>
          <p className="mt-5 text-base text-[#8FA98F]">
            Investimos continuamente em formação técnica e protocolos de biossegurança.
            Cada operação executada com método, EPI completo e padrão auditável.
          </p>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {teamPhotos.map((p, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-[#1C3D22]">
                <img
                  src={p.url}
                  alt={`Equipe Bioprag em campo ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A0F]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Treinamentos mensais obrigatórios",
            "Certificações técnicas atualizadas",
            "Uso correto de EPIs e equipamentos",
            "Protocolos de biossegurança rigorosos",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3 rounded-xl border border-[#1C3D22] bg-[#0F2415] p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2ECC71]" />
              <span className="text-sm font-medium text-[#F0F4F0]">{t}</span>
            </li>
          ))}
        </ul>
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
              { v: 40, l: "anos" },
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
    whatsapp: "",
    email: "",
    cidade: "",
    perfil: "",
    servico: "",
    mensagem: "",
  });
  const [unidade, setUnidade] = useState<"matriz" | "filial">("matriz");

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `Olá, Bioprag! Meu nome é ${form.nome}.`,
      `WhatsApp: ${form.whatsapp}`,
      form.email ? `E-mail: ${form.email}` : "",
      `Cidade: ${form.cidade}`,
      `Perfil: ${form.perfil}`,
      `Serviço de interesse: ${form.servico}`,
      form.mensagem ? `Detalhes: ${form.mensagem}` : "",
    ]
      .filter(Boolean)
      .join("\n");
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
              <div className="flex gap-2 border-b border-[#1C3D22] bg-[#0F2415] p-2">
                {(["matriz", "filial"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setUnidade(k)}
                    className={`flex-1 rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      unidade === k ? "bg-[#2ECC71] text-[#06180D]" : "text-[#8FA98F] hover:text-[#F0F4F0]"
                    }`}
                  >
                    <MapPin className="mr-1.5 inline h-3.5 w-3.5" />
                    {k === "matriz" ? "Matriz — Conchas" : "Filial — Campinas"}
                  </button>
                ))}
              </div>
              <iframe
                key={unidade}
                src={`https://www.google.com/maps?q=${encodeURIComponent(UNIDADES[unidade].query)}&z=17&output=embed`}
                width="100%"
                height="420"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.85) contrast(0.95)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Localização Bioprag — ${UNIDADES[unidade].label}`}
              />
              <a
                href={UNIDADES[unidade].directions}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg bg-[#2ECC71] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#06180D] shadow-lg transition-all hover:bg-[#7DFFB3]"
              >
                <Navigation className="h-3.5 w-3.5" /> Como chegar
              </a>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0F2415] p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#2ECC71]" />
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-[#8FA98F]">Matriz — Conchas / SP</div>
                  <div className="text-sm font-medium text-[#F0F4F0]">{ADDRESS}</div>
                  <div className="text-xs text-[#8FA98F]">CEP 18570-043</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0F2415] p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#2ECC71]" />
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-[#8FA98F]">Filial — Campinas / SP</div>
                  <div className="text-sm font-medium text-[#F0F4F0]">{ADDRESS_FILIAL}</div>
                  
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0F2415] p-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#2ECC71]" />
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-[#8FA98F]">Telefone</div>
                  <div className="text-sm font-medium text-[#F0F4F0]">{PHONE_DISPLAY}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0F2415] p-4">
                <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" />
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-[#8FA98F]">WhatsApp</div>
                  <div className="text-sm font-medium text-[#F0F4F0]">{WHATSAPP_DISPLAY}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0F2415] p-4 sm:col-span-2">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#2ECC71]" />
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.14em] text-[#8FA98F]">E-mail comercial</div>
                  <a href={`mailto:${EMAIL}`} className="block truncate text-sm font-medium text-[#F0F4F0] hover:text-[#2ECC71] transition-colors">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <form onSubmit={onSubmit} className="flex h-full flex-col rounded-2xl border border-[#1C3D22] bg-[#0F2415] p-6 sm:p-8">
              <div className="flex flex-1 flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Nome *</label>
                    <input required value={form.nome} onChange={update("nome")} className={inputCls} placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <label className={labelCls}>WhatsApp *</label>
                    <input required type="tel" value={form.whatsapp} onChange={update("whatsapp")} className={inputCls} placeholder="(00) 00000-0000" />
                  </div>
                  <div>
                    <label className={labelCls}>E-mail</label>
                    <input type="email" value={form.email} onChange={update("email")} className={inputCls} placeholder="seu@email.com.br" />
                  </div>
                  <div>
                    <label className={labelCls}>Cidade *</label>
                    <input required value={form.cidade} onChange={update("cidade")} className={inputCls} placeholder="Cidade / Estado" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Perfil *</label>
                    <select required value={form.perfil} onChange={update("perfil")} className={inputCls}>
                      <option value="">Selecione</option>
                      <option>Residencial</option>
                      <option>Comercial</option>
                      <option>Industrial</option>
                      <option>Rural</option>
                      <option>Órgão público / Institucional</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Serviço de interesse *</label>
                    <select required value={form.servico} onChange={update("servico")} className={inputCls}>
                      <option value="">Selecione</option>
                      {SERVICES.map((s) => (
                        <option key={s.title}>{s.title}</option>
                      ))}
                      <option>Outro / Não sei ao certo</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <label className={labelCls}>Mensagem</label>
                  <textarea value={form.mensagem} onChange={update("mensagem")} className={`${inputCls} min-h-[96px] flex-1`} placeholder="Conte mais sobre sua situação (opcional)" />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#25D366] px-6 py-3.5 font-sans text-sm font-semibold text-white transition-all hover:brightness-110"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Enviar para o WhatsApp
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-xs text-[#8FA98F]">
                Resposta em até 1 hora em horário comercial.
              </p>
            </form>
          </Reveal>
        </div>

        {/* Selo Bioprag — bloco moderno */}
        <Reveal>
          <div className="relative mt-16 overflow-hidden rounded-[28px] border border-[#1C3D22] bg-[#0B1D11]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 12% 15%, rgba(46,204,113,0.16), transparent 45%), radial-gradient(circle at 88% 85%, rgba(125,255,179,0.10), transparent 50%)",
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2ECC71]/70 to-transparent" />
            <div className="relative grid items-center gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-16 lg:px-16">
              <div className="scene-3d group mx-auto w-full max-w-[460px]">
                <div className="card-3d relative rounded-[22px] border border-[#2ECC71]/25 bg-gradient-to-br from-[#132E1B] to-[#08150C] p-4 shadow-[0_40px_90px_-35px_rgba(0,0,0,0.9)] group-hover:card-3d-hover sm:p-5">
                  <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[#2ECC71]/12 blur-3xl" />
                  <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#7DFFB3]/70 to-transparent" />
                  <div className="animate-float-3d">
                    <img
                      src={biopragSeloCrop}
                      alt="Selo Bioprag de Segurança — Estabelecimento protegido contra pragas"
                      loading="lazy"
                      width={1400}
                      height={1000}
                      className="relative block h-auto w-full rounded-[14px] object-contain shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)] ring-1 ring-[#F0F4F0]/10"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 -bottom-3 mx-auto h-6 w-3/4 rounded-full bg-black/50 blur-xl" />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#2ECC71]/30 bg-[#2ECC71]/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2ECC71]">
                  <Sparkles className="h-3.5 w-3.5" /> Símbolo Bioprag
                </span>
                <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-[#F0F4F0] sm:text-4xl lg:text-5xl">
                  Receba o Selo Bioprag de Segurança.
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#8FA98F] lg:mx-0 lg:text-lg">
                  Certificação técnica que atesta o padrão de biossegurança do seu estabelecimento — exibida com orgulho por quem é protegido pela Bioprag.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {["Laudo técnico emitido", "Protocolo auditável", "Selo físico no local"].map((t) => (
                    <div key={t} className="flex items-center gap-2 rounded-xl border border-[#1C3D22] bg-[#0F2415]/70 px-4 py-3 text-left">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2ECC71]" />
                      <span className="text-xs font-medium text-[#F0F4F0]">{t}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#2ECC71] px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-[#06180D] transition-all hover:bg-[#7DFFB3] glow-green"
                  >
                    Falar com especialista <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Segments() {
  const items = [
    {
      icon: Home,
      title: "Residencial",
      desc: "Proteção discreta e segura para sua família. Tratamentos eficazes que respeitam pets, crianças e o ambiente do lar.",
      image: segResidencial,
    },
    {
      icon: Building2,
      title: "Comercial",
      desc: "Lojas, escritórios, restaurantes e redes. Controle preventivo com documentação completa para auditorias sanitárias.",
      image: segComercial,
    },
    {
      icon: Factory,
      title: "Industrial",
      desc: "Indústrias alimentícias, farmacêuticas e logísticas. Programas em conformidade com BPF, APPCC, AIB e exigências sanitárias.",
      image: segIndustrial,
    },
  ];

  return (
    <section id="atendimento" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10,26,15,0.92) 0%, rgba(15,36,21,0.88) 60%, rgba(10,26,15,0.95) 100%), url(${img2953.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">Força institucional</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#F0F4F0] sm:text-5xl lg:text-6xl">
            Atendimento que protege onde a vida acontece.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#8FA98F] sm:text-lg">
            Da casa de uma família ao chão de uma grande indústria, a Bioprag entrega o mesmo padrão técnico,
            documental e ambiental — com método auditável e equipe certificada.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Residencial", "Comercial", "Industrial"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#2ECC71]/40 bg-[#2ECC71]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#2ECC71]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 scene-3d md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-[#1C3D22] bg-[#0F2415]/80 backdrop-blur card-3d hover:card-3d-hover hover:border-[#2ECC71]/60">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_60%,rgba(46,204,113,0.22),transparent_65%)]" />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2ECC71]/20 animate-spin-slow" />
                  <img
                    src={it.image}
                    alt={`Atendimento Bioprag — segmento ${it.title.toLowerCase()}`}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="relative z-[1] h-full w-full object-contain p-4 animate-float-3d [filter:drop-shadow(0_18px_30px_rgba(0,0,0,0.55))] transition-transform duration-700 group-hover:scale-[1.06]"
                    style={{ animationDelay: `${i * 0.8}s` }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0F2415] to-transparent" />
                  <div className="absolute left-5 top-5 z-[2]">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#2ECC71] text-[#06180D] shadow-lg glow-green">
                      <it.icon className="h-6 w-6" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold text-[#F0F4F0]">{it.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8FA98F]">{it.desc}</p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2ECC71] transition-colors hover:text-[#7DFFB3]"
                  >
                    Solicitar atendimento <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
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
    >
      <img
        src={foto34.url}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full scale-105 object-cover object-[center_28%]"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,26,15,0.94) 0%, rgba(26,61,31,0.86) 50%, rgba(10,26,15,0.96) 100%)",
        }}
      />
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
              <WhatsAppIcon className="h-5 w-5" />
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
            <li className="flex items-center gap-2"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> {WHATSAPP_DISPLAY}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#2ECC71]" /> <a href={`mailto:${EMAIL}`} className="hover:text-[#2ECC71] transition-colors">{EMAIL}</a></li>
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
      className="group fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.8)] ring-4 ring-[#25D366]/25 transition-transform hover:scale-105 animate-pulse-soft"
    >
      <WhatsAppIcon className="h-9 w-9" />
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
        <About />
        <Segments />
        <WhyChoose />
        <Services />
        <Method />
        <Training />
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
