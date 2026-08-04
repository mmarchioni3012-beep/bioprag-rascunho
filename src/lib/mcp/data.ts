// Public, marketing-level information about BIOPRAG, shared by the MCP tools.

export const COMPANY = {
  name: "BIOPRAG",
  tagline: "Controle integrado de pragas, saúde ambiental e biossegurança",
  summary:
    "Empresa com mais de 40 anos de operação em controle integrado de pragas, saúde ambiental e biossegurança. Método técnico, auditável e 100% documentado, com produtos aprovados pela ANVISA e cobertura nacional.",
  site: "https://bioprag.lovable.app",
  phone: "+55 14 3845-4011",
  phoneDisplay: "(14) 3845-4011",
  whatsapp: "+55 14 99999-0000",
  email: "vendas@bioprag.com.br",
  coverage: "Atendimento em todo o território brasileiro (Norte, Nordeste, Centro-Oeste, Sudeste e Sul).",
  units: [
    {
      type: "Matriz",
      address: "Rua Goiás, 446 — Centro, Conchas/SP, CEP 18570-043",
      directions:
        "https://www.google.com/maps/dir/?api=1&destination=" +
        encodeURIComponent("Rua Goiás, 446 - Centro, Conchas - SP, 18570-043"),
    },
    {
      type: "Filial",
      address: "Rua Emerson José Moreira, 1710 — Sala 07, Chácara Primavera, Campinas/SP, CEP 13087-441",
      directions:
        "https://www.google.com/maps/dir/?api=1&destination=" +
        encodeURIComponent("Rua Emerson José Moreira, 1710 - Chácara Primavera, Campinas - SP, 13087-441"),
    },
  ],
} as const;

export const SERVICES = [
  {
    title: "Desinsetização",
    short: "Controle químico e mecânico de insetos",
    description:
      "Aplicação técnica com produtos registrados na ANVISA e protocolo de biossegurança.",
  },
  {
    title: "Controle de Insetos Rasteiros",
    short: "Baratas, formigas e pragas rasteiras",
    description:
      "Eliminação técnica de pragas rasteiras em ambientes residenciais, comerciais e industriais.",
  },
  {
    title: "Controle de Insetos Voadores",
    short: "Mosquitos, moscas e mariposas",
    description:
      "Manejo integrado de voadores com produtos certificados e baixo impacto ambiental.",
  },
  {
    title: "Desratização",
    short: "Ratos, camundongos e roedores",
    description: "Mapa de iscas, porta-iscas lacrados e monitoramento contínuo de atividade.",
  },
  {
    title: "Descupinização",
    short: "Cupins de solo e de madeira",
    description: "Tratamento estrutural preventivo e corretivo com garantia contra cupins.",
  },
  {
    title: "Higienização de Reservatórios",
    short: "Limpeza de caixas d'água",
    description: "Higienização de reservatórios com laudo técnico e controle de potabilidade.",
  },
] as const;

export const METHOD = [
  { step: 1, title: "Diagnóstico", description: "Vistoria técnica completa e identificação de focos." },
  { step: 2, title: "Planejamento", description: "Plano de controle personalizado para o ambiente." },
  { step: 3, title: "Execução", description: "Aplicação com produtos certificados e EPI completo." },
  { step: 4, title: "Registro", description: "Documentação técnica e laudo do serviço." },
  { step: 5, title: "Monitoramento", description: "Acompanhamento contínuo e garantia de resultado." },
] as const;

export const FAQ = [
  {
    question: "Como funciona o processo do início ao fim?",
    answer:
      "Iniciamos com vistoria técnica gratuita, elaboramos um plano personalizado, executamos com produtos certificados e entregamos laudo + cronograma de monitoramento.",
  },
  {
    question: "Os produtos utilizados são seguros para crianças e pets?",
    answer:
      "Sim. Trabalhamos exclusivamente com produtos aprovados pela ANVISA, aplicados por profissionais treinados, com baixíssima toxicidade residual.",
  },
  {
    question: "Preciso sair de casa durante o serviço?",
    answer:
      "Na maioria dos serviços não é necessário. Para casos específicos orientamos um curto período de ausência, sempre informado previamente.",
  },
  {
    question: "Vocês emitem laudo técnico?",
    answer:
      "Sim. Todo atendimento gera laudo técnico detalhado, exigível por órgãos sanitários e auditorias.",
  },
  {
    question: "Qual o prazo de garantia dos serviços?",
    answer:
      "A garantia varia por serviço, podendo chegar a 12 meses com plano de monitoramento contínuo.",
  },
  {
    question: "Atendem empresas de grande porte?",
    answer:
      "Sim. Operamos com indústrias, redes de varejo, hospitais e condomínios, com estrutura para grandes volumes.",
  },
] as const;
