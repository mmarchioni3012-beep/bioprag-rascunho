import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bug,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Droplets,
  Factory,
  FileText,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  Rat,
  Repeat,
  Search,
  Shield,
  ShieldCheck,
  SprayCan,
  Store,
  Target,
  TreePine,
  UtensilsCrossed,
  Wind,
  X,
} from "lucide-react";

import img2953 from "@/assets/IMG_2953.jpg.asset.json";
import img2956 from "@/assets/IMG_2956.jpg.asset.json";
import img2957 from "@/assets/IMG_2957.jpg.asset.json";
import img2958 from "@/assets/IMG_2958.jpg.asset.json";
import img2962 from "@/assets/IMG_2962.jpg.asset.json";
import img2963 from "@/assets/IMG_2963.jpg.asset.json";
import biopragLogo from "@/assets/bioprag-logo.jpeg.asset.json";
import biopragFachada from "@/assets/bioprag-fachada.png.asset.json";

import {
  WHATSAPP_URL,
  company,
  getUtms,
  track,
  whatsappLink,
} from "@/lib/company";

const META_TITLE = "Bioprag | Controle Integrado de Pragas e Biossegurança";
const META_DESC =
  "Controle integrado de pragas, desinsetização, desratização, descupinização, higienização de reservatórios e sanitização. Matriz em Conchas e filial em Campinas. Consulte atendimento para sua cidade.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: "description", content: META_DESC },
      { property: "og:title", content: META_TITLE },
      { property: "og:description", content: META_DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: META_TITLE },
      { name: "twitter:description", content: META_DESC },
    ],
  }),
  component: HomePage,
});

/* ============================ Registros ============================ */
// Confirmar validade e formatação dos registros com a Bioprag antes da publicação final.
// Para exibir um registro no site, altere "verified" para true depois da confirmação oficial.
// Situação em jul/2026:
//  - CNPJ: dígitos verificadores conferem (validado).
//  - Inscrição Estadual: dígitos não conferem no padrão SP — confirmar na SEFAZ-SP.
//  - CRBio-01-SP / IBAMA / V.I.S.A.: não verificáveis por cálculo — confirmar documentos e validade.
const registrations = [
  { label: "CNPJ", value: "05.128.516/0001-30", verified: true },
  { label: "Inscrição Estadual", value: "271.012.217.113", verified: false },
  { label: "CRBio-01-SP", value: "nº 712-01 e nº 82408/01-D", verified: false },
  { label: "Cadastro IBAMA", value: "5775428", verified: false },
  { label: "V.I.S.A.", value: "351230801-812-000001-1-6", verified: false },
];

const visibleRegistrations = registrations.filter((r) => r.verified);


/* ============================ Dados ============================ */
const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#segmentos", label: "Segmentos" },
  { href: "#metodo", label: "Método" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#conformidade", label: "Conformidade" },
  { href: "#contato", label: "Contato" },
];

const INDICATORS = [
  { value: "40 anos", label: "de experiência" },
  { value: "2", label: "bases próprias" },
  { value: "7", label: "etapas no método técnico" },
  { value: "Residencial e empresarial", label: "atendimento" },
];

const RISKS = [
  { icon: ShieldCheck, title: "Riscos sanitários" },
  { icon: Factory, title: "Perdas materiais" },
  { icon: Droplets, title: "Contaminações" },
  { icon: Repeat, title: "Interrupções operacionais" },
  { icon: ClipboardCheck, title: "Problemas em auditorias" },
  { icon: Shield, title: "Danos à imagem" },
];

const STRUCTURE = [
  { title: "Administrativo", desc: "Coordenação, documentação e conformidade." },
  { title: "Comercial", desc: "Atendimento, propostas e relacionamento." },
  { title: "Financeiro", desc: "Gestão, controle e transparência." },
  { title: "Operacional", desc: "Execução técnica e acompanhamento." },
];

const SEGMENTS = [
  {
    icon: Home,
    title: "Residencial",
    desc: "Controle e prevenção de pragas com orientação adequada às características do imóvel.",
  },
  {
    icon: Store,
    title: "Empresarial e comercial",
    desc: "Soluções planejadas para proteger ambientes, estoques, equipes e a continuidade da operação.",
  },
  {
    icon: Factory,
    title: "Industrial",
    desc: "Atendimento técnico compatível com ambientes de maior complexidade e exigência operacional.",
  },
  {
    icon: UtensilsCrossed,
    title: "Alimentação",
    desc: "Prevenção e monitoramento para ambientes que exigem atenção sanitária contínua.",
  },
  {
    icon: HeartPulse,
    title: "Saúde",
    desc: "Procedimentos planejados de acordo com o risco, circulação e características do ambiente.",
  },
  {
    icon: GraduationCap,
    title: "Educação",
    desc: "Controle responsável para espaços de convivência, ensino e circulação de pessoas.",
  },
  {
    icon: Landmark,
    title: "Setor público e institucional",
    desc: "Soluções definidas conforme a necessidade técnica e as exigências da contratação.",
  },
];

const SERVICE_OPTIONS = [
  "Manejo Integrado de Pragas",
  "Desinsetização",
  "Baratas e insetos rasteiros",
  "Insetos voadores",
  "Desratização",
  "Descupinização",
  "Higienização de reservatório",
  "Sanitização e desinfecção",
  "Monitoramento preventivo",
  "Não sei identificar",
  "Outro",
];

const SERVICES = [
  {
    icon: Target,
    title: "Manejo Integrado de Pragas",
    desc: "Programa técnico que combina prevenção, controle e acompanhamento contínuo do ambiente.",
    option: "Manejo Integrado de Pragas",
  },
  {
    icon: SprayCan,
    title: "Desinsetização",
    desc: "Aplicações planejadas conforme o tipo de ocorrência, o ambiente e o nível de risco.",
    option: "Desinsetização",
  },
  {
    icon: Bug,
    title: "Controle de insetos rasteiros",
    desc: "Ações direcionadas a baratas, formigas e outros insetos de deslocamento em superfícies.",
    option: "Baratas e insetos rasteiros",
  },
  {
    icon: Wind,
    title: "Controle de insetos voadores",
    desc: "Manejo de moscas, mosquitos e demais voadores com foco em focos e pontos de atração.",
    option: "Insetos voadores",
  },
  {
    icon: Rat,
    title: "Desratização",
    desc: "Controle de roedores com avaliação de abrigos, rotas de acesso e pontos de monitoramento.",
    option: "Desratização",
  },
  {
    icon: TreePine,
    title: "Descupinização",
    desc: "Tratamento de cupins em madeiras, estruturas e solo conforme a avaliação realizada.",
    option: "Descupinização",
  },
  {
    icon: Bug,
    title: "Pragas urbanas e vetores",
    desc: "Manejo de animais sinantrópicos e vetores presentes em áreas urbanas e periurbanas.",
    option: "Manejo Integrado de Pragas",
  },
  {
    icon: Droplets,
    title: "Higienização de reservatórios",
    desc: "Limpeza e higienização de caixas d'água e reservatórios com procedimento documentado.",
    option: "Higienização de reservatório",
  },
  {
    icon: Leaf,
    title: "Sanitização e desinfecção",
    desc: "Procedimentos de sanitização de ambientes conforme a finalidade e o uso do espaço.",
    option: "Sanitização e desinfecção",
  },
  {
    icon: Search,
    title: "Monitoramento e prevenção",
    desc: "Acompanhamento periódico com registros, análise de ocorrências e ações preventivas.",
    option: "Monitoramento preventivo",
  },
];

const METHOD = [
  { n: "01", title: "Diagnóstico", desc: "Inspeção do ambiente e identificação das ocorrências e condições favoráveis." },
  { n: "02", title: "Planejamento", desc: "Definição das ações, produtos, equipamentos e cronograma adequados." },
  { n: "03", title: "Execução técnica", desc: "Aplicação realizada por equipe preparada, com atenção aos protocolos." },
  { n: "04", title: "Prevenção", desc: "Correção de fatores que favorecem a presença de pragas no ambiente." },
  { n: "05", title: "Monitoramento", desc: "Acompanhamento da evolução e verificação da efetividade das ações." },
  { n: "06", title: "Orientação", desc: "Recomendações práticas para manutenção das condições do ambiente." },
  { n: "07", title: "Registro", desc: "Documentação da execução conforme o serviço e a contratação." },
];

const TECH_POINTS = [
  "Aplicação adequada",
  "Redução de desperdícios",
  "Eficiência no controle",
  "Proteção das pessoas",
  "Responsabilidade ambiental",
  "Compatibilidade com o ambiente",
];

const TEAM_POINTS = [
  "Utilização de EPIs",
  "Atenção aos protocolos",
  "Conhecimento dos produtos",
  "Organização da operação",
  "Cuidado com o ambiente",
  "Orientação ao cliente",
  "Responsabilidade na execução",
];

const DOCUMENTS = [
  "Ordem de serviço",
  "Orientações técnicas",
  "Registros de aplicação",
  "Relatórios de acompanhamento",
  "Documentos da empresa",
  "Registros do responsável técnico",
  "Certificados relacionados ao serviço",
];

const HIRING = [
  "Contato inicial",
  "Levantamento das informações",
  "Definição da solução",
  "Proposta comercial",
  "Programação da execução",
];

const DIFFERENTIALS = [
  "40 anos de experiência",
  "Equipe técnica especializada",
  "Estrutura administrativa e operacional própria",
  "Atendimento personalizado",
  "Métodos planejados e documentados",
  "Produtos e equipamentos adequados",
  "Foco em segurança",
  "Prevenção e orientação",
  "Capacidade para diferentes ambientes",
  "Compromisso com a qualidade da execução",
];

const FAQ = [
  {
    q: "A Bioprag atende minha cidade?",
    a: "A disponibilidade depende da localização, do serviço e da viabilidade operacional. Informe sua cidade no formulário para que a equipe comercial avalie o atendimento.",
  },
  {
    q: "A equipe vai até o imóvel?",
    a: "Sim. Os serviços são executados no local do cliente, conforme agendamento e avaliação da necessidade.",
  },
  {
    q: "Quais tipos de clientes são atendidos?",
    a: "A Bioprag atende ambientes residenciais, comerciais, empresariais, industriais e institucionais.",
  },
  {
    q: "Como é definido o tratamento?",
    a: "A solução considera o ambiente, o tipo de ocorrência, o nível de risco e as condições identificadas.",
  },
  {
    q: "São fornecidos registros do serviço?",
    a: "A documentação depende do serviço e da contratação, podendo incluir ordem de serviço, comprovante de execução, orientações e registros técnicos.",
  },
  {
    q: "Como solicitar uma proposta?",
    a: "Preencha o formulário com cidade, tipo de cliente e necessidade. As informações serão enviadas diretamente ao WhatsApp comercial da Bioprag.",
  },
];

const CLIENT_TYPES = [
  "Residencial",
  "Condomínio",
  "Comércio",
  "Empresa",
  "Indústria",
  "Alimentação",
  "Saúde",
  "Educação",
  "Órgão público/instituição",
  "Outro",
];

const URGENCY = [
  "Preciso de orientação",
  "Quero solicitar orçamento",
  "Preciso agendar o quanto antes",
  "Atendimento recorrente/contrato",
];

const TEAM_PHOTOS = [
  { src: img2953.url, alt: "Técnico da Bioprag equipado durante atendimento em campo" },
  { src: img2956.url, alt: "Equipe da Bioprag em operação de controle de pragas" },
  { src: img2957.url, alt: "Aplicação técnica realizada por profissional da Bioprag" },
  { src: img2958.url, alt: "Equipamentos utilizados nas operações da Bioprag" },
  { src: img2962.url, alt: "Veículo da frota Bioprag em atendimento" },
  { src: img2963.url, alt: "Monitoramento preventivo realizado pela equipe Bioprag" },
];

/* ============================ Utilitários UI ============================ */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      }`}
    >
      {children}
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="mt-4 text-2xl leading-tight text-balance text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p> : null}
    </div>
  );
}

function WhatsAppButton({
  message,
  label = "Falar no WhatsApp",
  className = "",
  context,
}: {
  message?: string;
  label?: string;
  className?: string;
  context?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — WhatsApp comercial Bioprag ${company.whatsappDisplay}`}
      onClick={() => track("whatsapp_click", { origem: context ?? "site" })}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}

/* ============================ Header ============================ */
function Header({ onRequest }: { onRequest: (service?: string) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#topo" className="flex items-center gap-3" aria-label="Bioprag — início">
          <img
            src={biopragLogo.url}
            alt="Logotipo Bioprag"
            width={44}
            height={44}
            className="h-10 w-10 rounded-md object-cover md:h-11 md:w-11"
          />
          <span className="font-display text-lg tracking-tight text-foreground md:text-xl">Bioprag</span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton label="WhatsApp" className="hidden sm:inline-flex" context="header" />
          <button
            type="button"
            onClick={() => onRequest()}
            className="hidden min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:inline-flex"
          >
            Solicitar avaliação
          </button>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Navegação mobile" className="container-page flex flex-col py-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center border-b border-border/60 text-base text-foreground last:border-0"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onRequest();
              }}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              Solicitar avaliação
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

/* ============================ Hero ============================ */
function Hero({ onRequest }: { onRequest: (service?: string) => void }) {
  return (
    <section id="topo" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 -z-10">
        <img
          src={img2956.url}
          alt="Equipe Bioprag em operação de controle integrado de pragas"
          className="h-full w-full object-cover opacity-25"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 hexbg opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
      </div>

      <div className="container-page">
        <span className="eyebrow">
          Desde {company.foundedYear} · Controle Integrado de Pragas e Biossegurança
        </span>
        <h1 className="mt-5 max-w-4xl text-3xl leading-[1.1] text-balance text-foreground sm:text-5xl md:text-6xl">
          Controle de pragas tratado como gestão de risco.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Soluções técnicas para prevenção, controle e monitoramento de pragas em residências,
          empresas, comércios, indústrias e instituições.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
          Matriz em Conchas, filial em Campinas e atendimento sob consulta em diferentes cidades e
          regiões.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onRequest()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Solicitar avaliação
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <WhatsAppButton className="min-h-12 px-6" context="hero" />
        </div>

        <p className="mt-6 text-sm text-ink-soft">
          Atendimento no local · Soluções personalizadas · Execução documentada conforme o serviço
        </p>
        <p className="mt-2 max-w-2xl text-xs text-ink-soft md:text-sm">
          Capacidade de atendimento em diferentes regiões, conforme viabilidade técnica e operacional.
        </p>
      </div>
    </section>
  );
}

/* ============================ Indicadores ============================ */
function Indicators() {
  return (
    <section className="border-y border-border bg-surface/60">
      <div className="container-page grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {INDICATORS.map((i) => (
          <div key={i.label} className="py-6 sm:py-8">
            <p
              className={`font-display text-primary ${
                i.value.length > 10 ? "text-lg md:text-xl" : "text-2xl md:text-3xl"
              }`}
            >
              {i.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{i.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================ Contexto ============================ */
function RiskContext() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHead
            eyebrow="Contexto"
            title="Pragas não representam apenas um incômodo."
            text="Elas podem comprometer a saúde das pessoas, estruturas, produtos, estoques, processos e a reputação de uma empresa. Controlar pragas é proteger toda a operação."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RISKS.map((r) => (
            <Reveal key={r.title}>
              <div className="card-bp h-full p-5 hover:card-bp-hover">
                <r.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold text-foreground">{r.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-4xl border-l-2 border-primary pl-5 text-base leading-relaxed text-foreground md:text-lg">
            Uma aplicação isolada pode resolver uma ocorrência momentânea, mas o controle consistente
            exige diagnóstico, planejamento, execução, prevenção e acompanhamento.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ Sobre ============================ */
function About() {
  return (
    <section id="sobre" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <SectionHead
            eyebrow="Sobre a Bioprag"
            title="Experiência que gera confiança."
            text="A Bioprag é especializada em controle integrado de pragas, saúde ambiental e biossegurança. Desde 1986, desenvolve soluções para ambientes residenciais, empresariais, comerciais, industriais e institucionais."
          />
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Com matriz em Conchas/SP e filial em Campinas/SP, reúne experiência, conhecimento técnico e
            estrutura administrativa, comercial e operacional própria.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 gap-3">
            <figure className="col-span-2 overflow-hidden rounded-xl border border-border">
              <img
                src={biopragFachada.url}
                alt="Fachada da sede da Bioprag em Conchas/SP"
                loading="lazy"
                width={1200}
                height={700}
                className="h-56 w-full object-cover md:h-72"
              />
              <figcaption className="bg-surface px-4 py-2 text-xs text-ink-soft">
                Sede Bioprag — Conchas/SP
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-xl border border-border">
              <img
                src={img2962.url}
                alt="Veículo da frota Bioprag utilizado nos atendimentos"
                loading="lazy"
                width={600}
                height={400}
                className="h-36 w-full object-cover md:h-44"
              />
              <figcaption className="bg-surface px-4 py-2 text-xs text-ink-soft">Frota própria</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-xl border border-border">
              <img
                src={img2953.url}
                alt="Profissional da Bioprag equipado durante operação técnica"
                loading="lazy"
                width={600}
                height={400}
                className="h-36 w-full object-cover md:h-44"
              />
              <figcaption className="bg-surface px-4 py-2 text-xs text-ink-soft">
                Equipe em operação
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ Bases e estrutura ============================ */
function Locations() {
  return (
    <section id="estrutura" className="scroll-mt-24 border-y border-border bg-surface/40 py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHead eyebrow="Bases" title="Duas bases, um só padrão técnico." />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="card-bp h-full p-6">
              <span className="eyebrow">Matriz</span>
              <h3 className="mt-3 text-xl text-foreground">Conchas/SP</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {company.headquarters.address}
                <br />
                CEP {company.headquarters.zipCode}
                <br />
                Sede operacional
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="card-bp h-full p-6">
              <span className="eyebrow">Filial</span>
              <h3 className="mt-3 text-xl text-foreground">Campinas/SP</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {company.branch.address}
                <br />
                Filial
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STRUCTURE.map((s) => (
            <Reveal key={s.title}>
              <div className="card-bp h-full p-5">
                <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ Segmentos ============================ */
function Segments() {
  return (
    <section id="segmentos" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHead eyebrow="Segmentos" title="Soluções adaptadas a diferentes ambientes." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENTS.map((s) => (
            <Reveal key={s.title}>
              <div className="card-bp h-full p-6 hover:card-bp-hover">
                <s.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ Soluções ============================ */
function Services({ onRequest }: { onRequest: (service?: string) => void }) {
  return (
    <section id="solucoes" className="scroll-mt-24 border-y border-border bg-surface/40 py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHead
            eyebrow="Soluções"
            title="Soluções para controle, prevenção e proteção ambiental."
            text="Cada serviço é planejado de acordo com o ambiente, o tipo de ocorrência e o nível de risco identificado."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s) => (
            <Reveal key={s.title}>
              <article className="card-bp flex h-full flex-col p-6 hover:card-bp-hover">
                <s.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <button
                  type="button"
                  onClick={() => onRequest(s.option)}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Consultar atendimento
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ Método ============================ */
function IntegratedMethod() {
  return (
    <section id="metodo" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHead
            eyebrow="Manejo Integrado"
            title="Controle baseado em prevenção e acompanhamento."
            text="O Manejo Integrado de Pragas reúne ações preventivas e corretivas para minimizar ou impedir a presença de pragas e animais sinantrópicos no ambiente."
          />
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METHOD.map((m) => (
            <Reveal key={m.n}>
              <li className="card-bp h-full list-none p-6">
                <span className="font-display text-2xl text-primary">{m.n}</span>
                <h3 className="mt-3 text-base font-semibold text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================ Tecnologia e equipe ============================ */
function Technology() {
  return (
    <section className="border-y border-border bg-surface/40 py-16 md:py-24">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHead
              eyebrow="Tecnologia"
              title="Tecnologia aplicada com responsabilidade."
              text="A Bioprag utiliza produtos de qualidade e equipamentos específicos para cada tipo de aplicação, considerando eficiência, segurança, compatibilidade com o ambiente e responsabilidade ambiental."
            />
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {TECH_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <img
              src={img2958.url}
              alt="Equipamentos técnicos utilizados nas aplicações da Bioprag"
              loading="lazy"
              width={900}
              height={600}
              className="h-64 w-full rounded-xl border border-border object-cover md:h-full"
            />
          </Reveal>
        </div>

        <Reveal>
          <h3 className="mt-16 text-xl text-foreground md:text-2xl">
            Profissionais preparados para diferentes desafios.
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {TEAM_POINTS.map((p) => (
              <li
                key={p}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {TEAM_PHOTOS.map((p) => (
            <Reveal key={p.src}>
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                width={600}
                height={400}
                className="h-40 w-full rounded-xl border border-border object-cover md:h-52"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ Alcance ============================ */
function Coverage({ onRequest }: { onRequest: (service?: string) => void }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHead
            eyebrow="Alcance"
            title="Experiência regional. Capacidade para operações em diferentes regiões."
            text="Com matriz em Conchas e filial em Campinas, a Bioprag avalia atendimentos de acordo com localização, complexidade, tipo de serviço, estrutura do ambiente, frequência necessária e exigências da contratação."
          />
        </Reveal>
        <Reveal>
          <div className="card-bp mt-8 flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-base text-foreground">Consulte a disponibilidade para sua cidade.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Atendimento em diferentes regiões do Brasil, sujeito à análise técnica, comercial e
                operacional.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRequest()}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Consultar atendimento
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ Conformidade ============================ */
function Compliance() {
  return (
    <section id="conformidade" className="scroll-mt-24 border-y border-border bg-surface/40 py-16 md:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <Reveal>
          <SectionHead
            eyebrow="Conformidade"
            title="Segurança técnica e responsabilidade documental."
            text="De acordo com o serviço realizado, a Bioprag pode fornecer registros e documentos relacionados à execução."
          />
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {DOCUMENTS.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-soft">
            A entrega dos documentos ocorre conforme o serviço e a contratação.
          </p>
        </Reveal>

        <Reveal>
          <div className="card-bp p-6">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="text-base font-semibold text-foreground">Registros da empresa</h3>
            </div>
            <dl className="mt-5 divide-y divide-border">
              {visibleRegistrations.map((r) => (
                <div key={r.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
                  <dt className="text-sm text-ink-soft">{r.label}</dt>
                  <dd className="text-sm font-medium text-foreground">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-ink-soft">
              Demais registros técnicos e sanitários, como responsável técnico, cadastro ambiental e
              licença sanitária, são apresentados na proposta e na documentação do serviço.
            </p>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ Contratação e diferenciais ============================ */
function HiringProcess() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHead
            eyebrow="Contratação"
            title="Cada necessidade exige uma solução adequada."
            text="A modalidade de atendimento depende do serviço, ambiente, nível da ocorrência, riscos identificados, urgência, frequência necessária e localização da operação."
          />
          <p className="mt-4 border-l-2 border-primary pl-5 text-base text-foreground">
            Uma solução personalizada, sem pacotes genéricos.
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HIRING.map((h, i) => (
            <Reveal key={h}>
              <li className="card-bp h-full list-none p-5">
                <span className="font-display text-xl text-primary">{`0${i + 1}`}</span>
                <p className="mt-2 text-sm font-medium text-foreground">{h}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Differentials() {
  return (
    <section className="border-y border-border bg-surface/40 py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHead
            eyebrow="Diferenciais"
            title="Experiência e estrutura para proteger o que é importante."
          />
        </Reveal>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((d) => (
            <Reveal key={d}>
              <li className="card-bp flex h-full items-start gap-3 p-5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm text-foreground">{d}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================ FAQ ============================ */
function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 md:py-24">
      <div className="container-page max-w-3xl">
        <Reveal>
          <SectionHead eyebrow="Dúvidas frequentes" title="Perguntas frequentes" />
        </Reveal>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="text-base font-medium text-foreground">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen ? (
                  <p id={`faq-${i}`} className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================ Formulário ============================ */
type FormState = {
  nome: string;
  empresa: string;
  tipoCliente: string;
  cidade: string;
  estado: string;
  bairro: string;
  servico: string;
  urgencia: string;
  mensagem: string;
  consent: boolean;
};

const EMPTY_FORM: FormState = {
  nome: "",
  empresa: "",
  tipoCliente: "",
  cidade: "",
  estado: "",
  bairro: "",
  servico: "",
  urgencia: "",
  mensagem: "",
  consent: false,
};

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-3 text-base text-foreground placeholder:text-ink-soft focus:border-primary focus:outline-2 focus:outline-offset-1 focus:outline-primary";

function ContactForm({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);
  const [opened, setOpened] = useState(false);

  const update = (key: keyof FormState, value: string | boolean) => {
    if (!started) {
      setStarted(true);
      track("form_started");
    }
    if (key === "servico" && typeof value === "string" && value) {
      track("service_selected", { servico: value });
    }
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome.";
    if (!form.cidade.trim()) e.cidade = "Informe sua cidade.";
    if (!form.estado.trim()) e.estado = "Informe o estado.";
    if (!form.tipoCliente) e.tipoCliente = "Selecione o tipo de cliente.";
    if (!form.servico) e.servico = "Selecione o serviço ou necessidade.";
    if (!form.urgencia) e.urgencia = "Selecione a urgência.";
    if (!form.consent) e.consent = "É necessário concordar com a Política de Privacidade.";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      track("form_validation_error", { campos: Object.keys(e).join(",") });
      return;
    }

    const utms = getUtms();
    const lines = [
      "Olá, equipe Bioprag! Vim pelo site e gostaria de solicitar uma avaliação.",
      "",
      `Nome: ${form.nome.trim()}`,
      `Empresa: ${form.empresa.trim() || "Não informado"}`,
      `Tipo de cliente: ${form.tipoCliente}`,
      `Cidade/UF: ${form.cidade.trim()} - ${form.estado.trim().toUpperCase()}`,
      `Bairro: ${form.bairro.trim() || "Não informado"}`,
      `Serviço/necessidade: ${form.servico}`,
      `Urgência: ${form.urgencia}`,
      `Mensagem: ${form.mensagem.trim() || "Sem informações adicionais"}`,
      "",
      "Origem: Site Bioprag",
      `Página: ${typeof window !== "undefined" ? window.location.href : ""}`,
    ];
    if (utms.utm_campaign) lines.push(`Campanha: ${utms.utm_campaign}`);
    if (utms.utm_source || utms.utm_medium) {
      lines.push(
        `Origem de mídia: ${[utms.utm_source, utms.utm_medium].filter(Boolean).join(" / ")}`,
      );
    }

    track("whatsapp_form_continue", {
      servico: form.servico,
      tipo_cliente: form.tipoCliente,
      cidade: form.cidade.trim(),
      estado: form.estado.trim().toUpperCase(),
      urgencia: form.urgencia,
      origem: "site_formulario",
      utm_campaign: utms.utm_campaign,
    });

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setOpened(true);
  };

  const err = (key: string) =>
    errors[key] ? (
      <p id={`${key}-erro`} className="mt-1 text-xs text-primary-glow">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="card-bp flex h-full flex-col p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="text-sm font-medium text-foreground">
            Nome <span aria-hidden="true">*</span>
          </label>
          <input
            id="nome"
            name="nome"
            value={form.nome}
            onChange={(e) => update("nome", e.target.value)}
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "nome-erro" : undefined}
            className={fieldClass}
            placeholder="Seu nome"
          />
          {err("nome")}
        </div>

        <div>
          <label htmlFor="empresa" className="text-sm font-medium text-foreground">
            Empresa
          </label>
          <input
            id="empresa"
            name="empresa"
            value={form.empresa}
            onChange={(e) => update("empresa", e.target.value)}
            className={fieldClass}
            placeholder="Opcional"
          />
        </div>

        <div>
          <label htmlFor="cidade" className="text-sm font-medium text-foreground">
            Cidade <span aria-hidden="true">*</span>
          </label>
          <input
            id="cidade"
            name="cidade"
            value={form.cidade}
            onChange={(e) => update("cidade", e.target.value)}
            aria-invalid={!!errors.cidade}
            aria-describedby={errors.cidade ? "cidade-erro" : undefined}
            className={fieldClass}
            placeholder="Ex.: Botucatu"
          />
          {err("cidade")}
        </div>

        <div>
          <label htmlFor="estado" className="text-sm font-medium text-foreground">
            Estado <span aria-hidden="true">*</span>
          </label>
          <input
            id="estado"
            name="estado"
            value={form.estado}
            onChange={(e) => update("estado", e.target.value)}
            aria-invalid={!!errors.estado}
            aria-describedby={errors.estado ? "estado-erro" : undefined}
            className={fieldClass}
            placeholder="Ex.: SP"
            maxLength={20}
          />
          {err("estado")}
        </div>

        <div>
          <label htmlFor="bairro" className="text-sm font-medium text-foreground">
            Bairro
          </label>
          <input
            id="bairro"
            name="bairro"
            value={form.bairro}
            onChange={(e) => update("bairro", e.target.value)}
            className={fieldClass}
            placeholder="Opcional"
          />
        </div>

        <div>
          <label htmlFor="tipoCliente" className="text-sm font-medium text-foreground">
            Tipo de cliente <span aria-hidden="true">*</span>
          </label>
          <select
            id="tipoCliente"
            name="tipoCliente"
            value={form.tipoCliente}
            onChange={(e) => update("tipoCliente", e.target.value)}
            aria-invalid={!!errors.tipoCliente}
            aria-describedby={errors.tipoCliente ? "tipoCliente-erro" : undefined}
            className={fieldClass}
          >
            <option value="">Selecione</option>
            {CLIENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {err("tipoCliente")}
        </div>

        <div>
          <label htmlFor="servico" className="text-sm font-medium text-foreground">
            Serviço ou necessidade <span aria-hidden="true">*</span>
          </label>
          <select
            id="servico"
            name="servico"
            value={form.servico}
            onChange={(e) => update("servico", e.target.value)}
            aria-invalid={!!errors.servico}
            aria-describedby={errors.servico ? "servico-erro" : undefined}
            className={fieldClass}
          >
            <option value="">Selecione</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {err("servico")}
        </div>

        <div>
          <label htmlFor="urgencia" className="text-sm font-medium text-foreground">
            Urgência <span aria-hidden="true">*</span>
          </label>
          <select
            id="urgencia"
            name="urgencia"
            value={form.urgencia}
            onChange={(e) => update("urgencia", e.target.value)}
            aria-invalid={!!errors.urgencia}
            aria-describedby={errors.urgencia ? "urgencia-erro" : undefined}
            className={fieldClass}
          >
            <option value="">Selecione</option>
            {URGENCY.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          {err("urgencia")}
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <label htmlFor="mensagem" className="text-sm font-medium text-foreground">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={form.mensagem}
          onChange={(e) => update("mensagem", e.target.value)}
          className={`${fieldClass} min-h-28 flex-1 resize-y`}
          placeholder="Descreva a ocorrência, o ambiente e outras informações úteis (opcional)."
        />
      </div>

      <div className="mt-4">
        <label htmlFor="consent" className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-erro" : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-[#2ECC71]"
          />
          <span>
            Li e concordo com a{" "}
            <Link
              to="/politica-de-privacidade"
              className="text-primary underline underline-offset-4"
            >
              Política de Privacidade
            </Link>{" "}
            e autorizo o uso dos dados para retorno sobre esta solicitação.
          </span>
        </label>
        {err("consent")}
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Continuar no WhatsApp
      </button>

      <p aria-live="polite" className="mt-3 min-h-5 text-xs text-ink-soft">
        {opened
          ? "O WhatsApp foi aberto com sua solicitação preenchida. Revise a mensagem e toque em enviar para concluir."
          : ""}
      </p>
    </form>
  );
}

function ContactSection({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  return (
    <section id="contato" className="scroll-mt-24 border-t border-border bg-surface/40 py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHead
            eyebrow="Contato"
            title="Solicite uma avaliação para o seu ambiente."
            text="Preencha as informações abaixo. Ao continuar, você será direcionado ao WhatsApp comercial da Bioprag com a mensagem pronta para envio."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="flex flex-col gap-4">
            <div className="card-bp p-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="text-base font-semibold text-foreground">Matriz — Conchas/SP</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {company.headquarters.address}
                <br />
                CEP {company.headquarters.zipCode}
              </p>
              <a
                href="https://maps.app.goo.gl/AwckADfya2dRDSbs5"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Como chegar
              </a>
            </div>

            <div className="card-bp p-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="text-base font-semibold text-foreground">Filial — Campinas/SP</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {company.branch.address}
              </p>
            </div>

            <div className="card-bp grid gap-4 p-6 sm:grid-cols-2">
              <a
                href={`tel:${company.phone}`}
                onClick={() => track("phone_click")}
                className="flex min-h-11 items-start gap-3"
              >
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-xs text-ink-soft">Telefone</span>
                  <span className="text-sm text-foreground">{company.phoneDisplay}</span>
                </span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { origem: "contato" })}
                className="flex min-h-11 items-start gap-3"
              >
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-xs text-ink-soft">WhatsApp comercial</span>
                  <span className="text-sm text-foreground">{company.whatsappDisplay}</span>
                </span>
              </a>
              <a
                href={`mailto:${company.email}`}
                onClick={() => track("email_click")}
                className="flex min-h-11 items-start gap-3 sm:col-span-2"
              >
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-xs text-ink-soft">E-mail</span>
                  <span className="text-sm break-all text-foreground">{company.email}</span>
                </span>
              </a>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                title="Localização da matriz Bioprag em Conchas/SP"
                src="https://www.google.com/maps?q=Rua%20Goi%C3%A1s%2C%20446%20-%20Centro%2C%20Conchas%20-%20SP%2C%2018570-000&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full grayscale-[0.3]"
              />
            </div>
          </div>

          <ContactForm form={form} setForm={setForm} />
        </div>
      </div>
    </section>
  );
}

/* ============================ Rodapé ============================ */
function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container-page grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={biopragLogo.url}
              alt="Logotipo Bioprag"
              width={40}
              height={40}
              loading="lazy"
              className="h-10 w-10 rounded-md object-cover"
            />
            <span className="font-display text-lg text-foreground">Bioprag</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Controle integrado de pragas, saúde ambiental e biossegurança. Atuação técnica desde 1986.
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          <h2 className="font-display text-base text-foreground">Unidades</h2>
          <p className="mt-3">
            <strong className="font-medium text-foreground">Matriz — Conchas/SP</strong>
            <br />
            {company.headquarters.address} — CEP {company.headquarters.zipCode}
          </p>
          <p className="mt-3">
            <strong className="font-medium text-foreground">Filial — Campinas/SP</strong>
            <br />
            {company.branch.address}
          </p>
          <p className="mt-3">
            <a href={`tel:${company.phone}`} onClick={() => track("phone_click")} className="hover:text-foreground">
              {company.phoneDisplay}
            </a>
            {" · "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { origem: "rodape" })}
              className="hover:text-foreground"
            >
              WhatsApp {company.whatsappDisplay}
            </a>
            <br />
            <a href={`mailto:${company.email}`} onClick={() => track("email_click")} className="hover:text-foreground">
              {company.email}
            </a>
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          <h2 className="font-display text-base text-foreground">Navegação</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-foreground">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/politica-de-privacidade" className="hover:text-foreground">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-10 border-t border-border pt-6 text-xs text-ink-soft">
        © {new Date().getFullYear()} Bioprag. Todos os direitos reservados.
      </div>
    </footer>
  );
}

/* ============================ Botão flutuante ============================ */
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp comercial da Bioprag ${company.whatsappDisplay}`}
      onClick={() => track("whatsapp_click", { origem: "botao_flutuante" })}
      className="fixed right-4 bottom-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:right-6 md:bottom-6"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}

/* ============================ Página ============================ */
function HomePage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const requestQuote = (service?: string) => {
    if (service) setForm((f) => ({ ...f, servico: service }));
    scrollToId("contato");
    if (service) track("service_selected", { servico: service });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onRequest={requestQuote} />
      <main>
        <Hero onRequest={requestQuote} />
        <Indicators />
        <RiskContext />
        <About />
        <Locations />
        <Segments />
        <Services onRequest={requestQuote} />
        <IntegratedMethod />
        <Technology />
        <Coverage onRequest={requestQuote} />
        <Compliance />
        <HiringProcess />
        <Differentials />
        <FaqSection />
        <ContactSection form={form} setForm={setForm} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
