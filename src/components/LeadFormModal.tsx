import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { pushTrackingEvent } from "@/lib/tracking";
import { getAttribution } from "@/lib/attribution";
import { submitLead, trackSiteEvent } from "@/lib/leads.functions";

const WHATSAPP_NUMBER = "5514981752595";
const DRAFT_KEY = "bioprag_lead_draft";
const CONSENT_VERSION = "aviso-privacidade-v1";
const FORM_NAME = "solicitar_avaliacao";

export const PERFIS_PUBLICOS = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
  { value: "industrial", label: "Industrial" },
  { value: "condominio", label: "Condomínio" },
  { value: "propriedade_rural", label: "Propriedade rural" },
  { value: "outro", label: "Outro" },
] as const;

export const SERVICOS_PUBLICOS = [
  "Desinsetização",
  "Controle de insetos rasteiros",
  "Controle de insetos voadores",
  "Desratização",
  "Descupinização",
  "Higienização de reservatórios",
  "Outro",
] as const;

const EMPTY = {
  nome: "",
  whatsapp: "",
  telefoneAlt: "",
  email: "",
  cidade: "",
  bairro: "",
  perfil: "",
  servico: "",
  praga: "",
  mensagem: "",
  honeypot: "",
};

type FormState = typeof EMPTY;

function readDraft(): FormState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<FormState>) };
  } catch {
    return EMPTY;
  }
}

/** Máscara de telefone brasileira: (00) 00000-0000 */
function maskPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const labelCls = "block font-sans text-xs font-semibold text-[#C7D8C7] mb-1.5";
const inputCls =
  "w-full rounded-lg border border-[#1C3D22] bg-[#0A1A0F] px-4 py-3 text-base text-[#F0F4F0] placeholder:text-[#8FA98F]/60 outline-none transition-colors focus:border-[#2ECC71]";

export function LeadFormModal({ onClose, initialService }: { onClose: () => void; initialService?: string }) {
  const sendLead = useServerFn(submitLead);
  const sendEvent = useServerFn(trackSiteEvent);

  const [form, setForm] = useState<FormState>(() => {
    const draft = readDraft();
    return initialService ? { ...draft, servico: initialService } : draft;
  });
  const [privacidade, setPrivacidade] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [protocolo, setProtocolo] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const originRef = useRef<Element | null>(null);
  const startedRef = useRef(false);
  const sentRef = useRef(false);

  // Rascunho apenas na sessão do navegador (nada é enviado a terceiros).
  useEffect(() => {
    if (sentRef.current) return;
    try {
      const { honeypot: _hp, ...rest } = form;
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
    } catch {
      /* noop */
    }
  }, [form]);

  useEffect(() => {
    originRef.current = document.activeElement;
    pushTrackingEvent("lead_form_opened", { form_name: FORM_NAME });
    firstFieldRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      (originRef.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  const dirty = Object.entries(form).some(([k, v]) => k !== "honeypot" && v.trim() !== "");

  const requestClose = useCallback(() => {
    if (status !== "sent" && dirty && !window.confirm("Você preencheu alguns dados. Deseja fechar o formulário?")) return;
    pushTrackingEvent("lead_form_closed", { form_name: FORM_NAME, submitted: status === "sent" });
    onClose();
  }, [dirty, onClose, status]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea',
      );
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    pushTrackingEvent("lead_form_start", { form_name: FORM_NAME });
    void sendEvent({
      data: {
        event_type: "form_started",
        page_url: typeof window !== "undefined" ? window.location.href : null,
        attribution: getAttribution(),
      },
    }).catch(() => undefined);
  };

  const update =
    (k: keyof FormState, mask?: (v: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      markStarted();
      const value = mask ? mask(e.target.value) : e.target.value;
      setForm((f) => ({ ...f, [k]: value }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || sentRef.current) return;
    setErro(null);

    const digits = form.whatsapp.replace(/\D/g, "");
    if (form.nome.trim().length < 2) {
      pushTrackingEvent("lead_form_error", { form_name: FORM_NAME, field: "name" });
      return setErro("Informe seu nome completo.");
    }
    if (digits.length < 10 || digits.length > 11) {
      pushTrackingEvent("lead_form_error", { form_name: FORM_NAME, field: "phone" });
      return setErro("Informe um WhatsApp válido com DDD.");
    }
    if (form.cidade.trim().length < 2) {
      pushTrackingEvent("lead_form_error", { form_name: FORM_NAME, field: "city" });
      return setErro("Informe a cidade onde precisa do atendimento.");
    }
    if (!form.perfil) {
      pushTrackingEvent("lead_form_error", { form_name: FORM_NAME, field: "customer_type" });
      return setErro("Selecione o tipo de atendimento.");
    }
    if (!form.servico) {
      pushTrackingEvent("lead_form_error", { form_name: FORM_NAME, field: "service" });
      return setErro("Selecione o serviço desejado.");
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      pushTrackingEvent("lead_form_error", { form_name: FORM_NAME, field: "email" });
      return setErro("Informe um e-mail válido.");
    }
    if (!privacidade) {
      pushTrackingEvent("lead_form_error", { form_name: FORM_NAME, field: "privacy" });
      return setErro("Confirme o aviso de privacidade para enviar sua solicitação.");
    }

    setStatus("sending");
    try {
      const result = await sendLead({
        data: {
          name: form.nome,
          phone: form.whatsapp,
          phone_alt: form.telefoneAlt || null,
          email: form.email || null,
          city: form.cidade,
          neighborhood: form.bairro || null,
          customer_type: form.perfil as "residencial",
          service_interest: form.servico,
          pest_type: form.praga || null,
          message: form.mensagem || null,
          preferred_contact: "whatsapp" as const,
          privacy_acknowledged: true as const,
          consent_version: CONSENT_VERSION,
          marketing_consent: marketing,
          honeypot: form.honeypot,
          attribution: getAttribution(),
        },
      });

      if (!result.success) {
        setStatus("idle");
        pushTrackingEvent("lead_form_error", { form_name: FORM_NAME, field: "server" });
        setErro(result.message);
        return;
      }

      sentRef.current = true;
      try {
        window.sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* noop */
      }
      setProtocolo(result.short_protocol ?? null);
      setStatus("sent");

      // Um único evento de conversão, sem dados pessoais.
      pushTrackingEvent("lead_form_submit", { form_name: FORM_NAME });

      const perfilLabel = PERFIS_PUBLICOS.find((p) => p.value === form.perfil)?.label ?? "Não informado";
      const msg = [
        "Olá, equipe Bioprag! Acabei de solicitar atendimento pelo site.",
        result.short_protocol ? `Protocolo: ${result.short_protocol}` : "",
        `Nome: ${form.nome}`,
        `Cidade: ${form.cidade}`,
        `Bairro: ${form.bairro || "Não informado"}`,
        `Tipo de atendimento: ${perfilLabel}`,
        `Serviço: ${form.servico}`,
        `Praga/ocorrência: ${form.praga || "Não informado"}`,
        `Descrição: ${form.mensagem || "Não informada"}`,
        "Gostaria de receber uma avaliação técnica.",
      ]
        .filter(Boolean)
        .join("\n");

      pushTrackingEvent("whatsapp_click", { click_location: "formulario_sucesso", cta_label: "envio_formulario" });
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    } catch {
      setStatus("idle");
      pushTrackingEvent("lead_form_error", { form_name: FORM_NAME, field: "network" });
      setErro("Não conseguimos enviar agora. Tente novamente ou fale direto no WhatsApp.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={requestClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="relative flex h-full w-full flex-col overflow-hidden border-[#1C3D22] bg-[#0F2415] sm:h-auto sm:max-h-[92vh] sm:max-w-[660px] sm:rounded-2xl sm:border"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#1C3D22] bg-[#0F2415] px-5 py-4 sm:px-7">
          <div>
            <h2 id="lead-modal-title" className="font-display text-lg font-bold text-[#F0F4F0] sm:text-xl">
              Solicitar avaliação
            </h2>
            <p className="mt-1 text-xs text-[#8FA98F]">
              {status === "sent" ? "Solicitação registrada" : "Preencha os dados e continue o atendimento no WhatsApp."}
            </p>
          </div>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Fechar formulário"
            className="shrink-0 rounded-lg border border-[#1C3D22] p-2 text-[#8FA98F] transition-colors hover:text-[#F0F4F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2ECC71]"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="lf-nome" className={labelCls}>Nome completo *</label>
                <input
                  ref={firstFieldRef}
                  id="lf-nome"
                  required
                  autoComplete="name"
                  value={form.nome}
                  onChange={update("nome")}
                  className={inputCls}
                  placeholder="Como podemos te chamar?"
                />
              </div>

              <div>
                <label htmlFor="lf-whats" className={labelCls}>WhatsApp *</label>
                <input
                  id="lf-whats"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.whatsapp}
                  onChange={update("whatsapp", maskPhone)}
                  className={inputCls}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label htmlFor="lf-tel" className={labelCls}>Telefone alternativo</label>
                <input
                  id="lf-tel"
                  inputMode="tel"
                  value={form.telefoneAlt}
                  onChange={update("telefoneAlt", maskPhone)}
                  className={inputCls}
                  placeholder="Opcional"
                />
              </div>

              <div>
                <label htmlFor="lf-cidade" className={labelCls}>Cidade *</label>
                <input
                  id="lf-cidade"
                  required
                  autoComplete="address-level2"
                  value={form.cidade}
                  onChange={update("cidade")}
                  className={inputCls}
                  placeholder="Cidade do atendimento"
                />
              </div>

              <div>
                <label htmlFor="lf-bairro" className={labelCls}>Bairro</label>
                <input
                  id="lf-bairro"
                  value={form.bairro}
                  onChange={update("bairro")}
                  className={inputCls}
                  placeholder="Opcional"
                />
              </div>

              <div>
                <label htmlFor="lf-perfil" className={labelCls}>Tipo de atendimento *</label>
                <select id="lf-perfil" required value={form.perfil} onChange={update("perfil")} className={inputCls}>
                  <option value="">Selecione</option>
                  {PERFIS_PUBLICOS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="lf-servico" className={labelCls}>Serviço desejado *</label>
                <select id="lf-servico" required value={form.servico} onChange={update("servico")} className={inputCls}>
                  <option value="">Selecione</option>
                  {SERVICOS_PUBLICOS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="lf-praga" className={labelCls}>Praga ou ocorrência observada</label>
                <input
                  id="lf-praga"
                  value={form.praga}
                  onChange={update("praga")}
                  className={inputCls}
                  placeholder="Opcional — ex.: baratas na cozinha"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="lf-email" className={labelCls}>E-mail</label>
                <input
                  id="lf-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  className={inputCls}
                  placeholder="Opcional"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="lf-mensagem" className={labelCls}>Descrição da necessidade</label>
                <textarea
                  id="lf-mensagem"
                  rows={4}
                  maxLength={1500}
                  value={form.mensagem}
                  onChange={update("mensagem")}
                  className={`${inputCls} resize-none`}
                  placeholder="Conte rapidamente o que está acontecendo (opcional)."
                />
              </div>
            </div>

            {/* Campo anti-spam: invisível para usuários reais */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="lf-site">Site</label>
              <input id="lf-site" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={update("honeypot")} />
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0A1A0F] p-4">
                <input
                  id="lf-privacidade"
                  type="checkbox"
                  checked={privacidade}
                  onChange={(e) => setPrivacidade(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#2ECC71]"
                />
                <label htmlFor="lf-privacidade" className="text-xs leading-relaxed text-[#C7D8C7]">
                  Autorizo o contato da Bioprag e li o{" "}
                  <Link to="/politica-de-privacidade" className="text-[#2ECC71] hover:underline">
                    aviso de privacidade
                  </Link>
                  . *
                </label>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0A1A0F] p-4">
                <input
                  id="lf-marketing"
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#2ECC71]"
                />
                <label htmlFor="lf-marketing" className="text-xs leading-relaxed text-[#C7D8C7]">
                  Quero receber informações e comunicações da Bioprag (opcional).
                </label>
              </div>
            </div>

            {erro && (
              <p role="alert" className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {erro}
              </p>
            )}

            {status === "sent" && (
              <div className="mt-4 rounded-lg border border-[#2ECC71]/40 bg-[#2ECC71]/10 px-4 py-3 text-sm text-[#7DFFB3]">
                Seus dados foram registrados{protocolo ? ` — protocolo ${protocolo}` : ""}. Se o WhatsApp não abrir
                automaticamente,{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  data-click-location="formulario_sucesso"
                  data-cta-label="abrir_whatsapp_manual"
                  className="font-semibold underline"
                >
                  clique aqui para falar com a equipe
                </a>
                .
              </div>
            )}
          </div>

          <footer
            className="sticky bottom-0 z-10 border-t border-[#1C3D22] bg-[#0F2415] px-5 py-4 sm:px-7"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#2ECC71] px-6 py-3.5 text-sm font-bold text-[#06180D] transition-all hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === "sending" ? "Enviando…" : status === "sent" ? "Solicitação enviada" : "Enviar e falar no WhatsApp"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
