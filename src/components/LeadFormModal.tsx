import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Loader2, X } from "lucide-react";
import { pushTrackingEvent } from "@/lib/tracking";
import { getAttribution } from "@/lib/attribution";
import { submitLead, trackSiteEvent } from "@/lib/leads.functions";

const WHATSAPP_NUMBER = "5514981752595";
const DRAFT_KEY = "bioprag_lead_draft";

export const PERFIS_PUBLICOS = [
  { value: "residencial", label: "Residencial" },
  { value: "empresa", label: "Empresa" },
  { value: "condominio", label: "Condomínio" },
  { value: "propriedade_rural", label: "Propriedade rural" },
  { value: "outro", label: "Outro" },
] as const;

export const SERVICOS_PUBLICOS = [
  "Dedetização geral",
  "Baratas",
  "Ratos",
  "Cupins",
  "Escorpiões",
  "Formigas",
  "Aranhas",
  "Pulgas e carrapatos",
  "Limpeza de reservatório",
  "Sanitização",
  "Monitoramento preventivo",
  "Outro",
] as const;

const EMPTY = {
  nome: "",
  whatsapp: "",
  cidade: "",
  email: "",
  perfil: "",
  servico: "",
  praga: "",
  bairro: "",
  mensagem: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  estado: "",
  referencia: "",
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

const labelCls = "block font-sans text-xs font-semibold text-[#C7D8C7] mb-1.5";
const inputCls =
  "w-full rounded-lg border border-[#1C3D22] bg-[#0A1A0F] px-4 py-3 text-base text-[#F0F4F0] placeholder:text-[#8FA98F]/60 outline-none transition-colors focus:border-[#2ECC71]";

export function LeadFormModal({ onClose }: { onClose: () => void }) {
  const sendLead = useServerFn(submitLead);
  const sendEvent = useServerFn(trackSiteEvent);

  const [form, setForm] = useState<FormState>(() => readDraft());
  const [step, setStep] = useState<1 | 2>(1);
  const [showAddress, setShowAddress] = useState(false);
  const [privacidade, setPrivacidade] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "error">("idle");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [protocolo, setProtocolo] = useState<string | null>(null);

  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const step2FieldRef = useRef<HTMLSelectElement | null>(null);
  const startedRef = useRef(false);
  const sentRef = useRef(false);

  // Persistência temporária apenas na sessão do navegador (sem envio a terceiros).
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
    pushTrackingEvent("lead_form_opened", { form_name: "formulario_publico", step: 1 });
    firstFieldRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const dirty = Object.entries(form).some(([k, v]) => k !== "honeypot" && v.trim() !== "");

  const requestClose = useCallback(() => {
    if (status !== "sent" && dirty && !window.confirm("Você preencheu alguns dados. Deseja fechar o formulário?")) return;
    pushTrackingEvent("lead_form_closed", { form_name: "formulario_publico", step, submitted: status === "sent" });
    onClose();
  }, [dirty, onClose, status, step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    void sendEvent({
      data: {
        event_type: "form_started",
        page_url: typeof window !== "undefined" ? window.location.href : null,
        attribution: getAttribution(),
      },
    }).catch(() => undefined);
  };

  const update =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      markStarted();
      setForm((f) => ({ ...f, [k]: e.target.value }));
    };

  const lookupCep = async (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepStatus("loading");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const json = (await res.json()) as {
        erro?: boolean;
        logradouro?: string;
        bairro?: string;
        localidade?: string;
        uf?: string;
      };
      if (json.erro) throw new Error("cep");
      setForm((f) => ({
        ...f,
        logradouro: json.logradouro || f.logradouro,
        bairro: json.bairro || f.bairro,
        cidade: json.localidade || f.cidade,
        estado: json.uf || f.estado,
      }));
      setCepStatus("idle");
    } catch {
      // A consulta de CEP nunca bloqueia o envio.
      setCepStatus("error");
    }
  };

  const goStep2 = () => {
    setErro(null);
    const digits = form.whatsapp.replace(/\D/g, "");
    if (form.nome.trim().length < 2) return setErro("Informe seu nome.");
    if (digits.length < 10 || digits.length > 13) return setErro("Informe um telefone ou WhatsApp válido.");
    if (form.cidade.trim().length < 2) return setErro("Informe a cidade onde precisa do atendimento.");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setErro("Informe um e-mail válido.");

    pushTrackingEvent("lead_form_step_1_completed", { form_name: "formulario_publico" });
    setStep(2);
    pushTrackingEvent("lead_form_step_2_viewed", { form_name: "formulario_publico" });
    window.setTimeout(() => step2FieldRef.current?.focus(), 30);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) return goStep2();
    setErro(null);

    if (!form.servico) {
      pushTrackingEvent("lead_form_error", { form_name: "formulario_publico", field: "service" });
      return setErro("Selecione o serviço ou problema.");
    }
    if (!privacidade) {
      pushTrackingEvent("lead_form_error", { form_name: "formulario_publico", field: "privacy" });
      return setErro("Confirme que leu a Política de Privacidade para enviar sua solicitação.");
    }

    setStatus("sending");
    try {
      const result = await sendLead({
        data: {
          name: form.nome,
          phone: form.whatsapp,
          email: form.email || null,
          city: form.cidade,
          neighborhood: form.bairro || null,
          ...(form.perfil ? { customer_type: form.perfil as "residencial" } : {}),
          service_interest: form.servico,
          pest_type: form.praga || null,
          message: form.mensagem || null,
          preferred_contact: "whatsapp" as const,
          privacy_acknowledged: true as const,
          marketing_consent: false,
          address: {
            cep: form.cep || null,
            street: form.logradouro || null,
            number: form.numero || null,
            complement: form.complemento || null,
            state: form.estado || null,
            reference: form.referencia || null,
          },
          honeypot: form.honeypot,
          attribution: getAttribution(),
        },
      });

      if (!result.success) {
        setStatus("idle");
        pushTrackingEvent("lead_form_error", { form_name: "formulario_publico", field: "server" });
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

      pushTrackingEvent("lead_form_submitted", {
        form_name: "formulario_publico",
        city: form.cidade,
        profile: form.perfil || "nao_informado",
        service: form.servico,
      });
      pushTrackingEvent("lead_form_submit", {
        form_name: "formulario_publico",
        city: form.cidade,
        profile: form.perfil || "nao_informado",
        service: form.servico,
      });

      const perfilLabel = PERFIS_PUBLICOS.find((p) => p.value === form.perfil)?.label ?? "Não informado";
      const msg = [
        "Olá, equipe Bioprag! Acabei de solicitar atendimento pelo site.",
        result.short_protocol ? `Protocolo: ${result.short_protocol}` : "",
        `Nome: ${form.nome}`,
        `Cidade: ${form.cidade}`,
        `Bairro: ${form.bairro || "Não informado"}`,
        `Perfil: ${perfilLabel}`,
        `Serviço: ${form.servico}`,
        `Praga: ${form.praga || "Não informado"}`,
        `Descrição: ${form.mensagem || "Não informada"}`,
        "Gostaria de receber uma avaliação.",
      ]
        .filter(Boolean)
        .join("\n");

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    } catch {
      setStatus("idle");
      pushTrackingEvent("lead_form_error", { form_name: "formulario_publico", field: "network" });
      setErro("Não conseguimos enviar agora. Tente novamente ou fale direto no WhatsApp.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={requestClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="relative flex h-full w-full flex-col overflow-hidden border-[#1C3D22] bg-[#0F2415] sm:h-auto sm:max-h-[90vh] sm:max-w-[660px] sm:rounded-2xl sm:border"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#1C3D22] bg-[#0F2415] px-5 py-4 sm:px-7">
          <div>
            <h2 id="lead-modal-title" className="font-display text-lg font-bold text-[#F0F4F0] sm:text-xl">
              Solicitar avaliação
            </h2>
            <p className="mt-1 text-xs text-[#8FA98F]">
              {status === "sent" ? "Solicitação registrada" : `Etapa ${step} de 2 — ${step === 1 ? "Como podemos fazer contato?" : "Como podemos ajudar?"}`}
            </p>
          </div>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Fechar formulário"
            className="rounded-lg border border-[#1C3D22] p-2 text-[#8FA98F] transition-colors hover:text-[#F0F4F0]"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="h-1 w-full bg-[#0A1A0F]">
          <div className="h-full bg-[#2ECC71] transition-all" style={{ width: step === 1 ? "50%" : "100%" }} />
        </div>

        <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            {step === 1 && (
              <div className="grid gap-4">
                <div>
                  <label htmlFor="lf-nome" className={labelCls}>Nome *</label>
                  <input id="lf-nome" ref={firstFieldRef} required value={form.nome} onChange={update("nome")} className={inputCls} placeholder="Seu nome" autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="lf-whatsapp" className={labelCls}>WhatsApp / telefone *</label>
                  <input id="lf-whatsapp" type="tel" inputMode="tel" required value={form.whatsapp} onChange={update("whatsapp")} className={inputCls} placeholder="(00) 00000-0000" autoComplete="tel" />
                </div>
                <div>
                  <label htmlFor="lf-cidade" className={labelCls}>Cidade *</label>
                  <input id="lf-cidade" required value={form.cidade} onChange={update("cidade")} className={inputCls} placeholder="Cidade onde precisa do atendimento" autoComplete="address-level2" />
                </div>
                <div>
                  <label htmlFor="lf-email" className={labelCls}>E-mail (opcional)</label>
                  <input id="lf-email" type="email" value={form.email} onChange={update("email")} className={inputCls} placeholder="seu@email.com.br" autoComplete="email" />
                </div>
                <p className="text-xs leading-relaxed text-[#8FA98F]">
                  Seus dados serão utilizados somente para responder à sua solicitação, conforme nossa{" "}
                  <Link to="/politica-de-privacidade" className="text-[#2ECC71] hover:underline">Política de Privacidade</Link>.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                <div>
                  <label htmlFor="lf-perfil" className={labelCls}>Tipo de atendimento (opcional)</label>
                  <select id="lf-perfil" ref={step2FieldRef} value={form.perfil} onChange={update("perfil")} className={inputCls}>
                    <option value="">Selecione</option>
                    {PERFIS_PUBLICOS.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="lf-servico" className={labelCls}>Serviço ou problema *</label>
                  <select id="lf-servico" required value={form.servico} onChange={update("servico")} className={inputCls}>
                    <option value="">Selecione</option>
                    {SERVICOS_PUBLICOS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lf-praga" className={labelCls}>Tipo de praga (opcional)</label>
                    <input id="lf-praga" value={form.praga} onChange={update("praga")} className={inputCls} placeholder="Baratas, ratos, cupins…" />
                  </div>
                  <div>
                    <label htmlFor="lf-bairro" className={labelCls}>Bairro (opcional)</label>
                    <input id="lf-bairro" value={form.bairro} onChange={update("bairro")} className={inputCls} placeholder="Bairro" />
                  </div>
                </div>
                <div>
                  <label htmlFor="lf-mensagem" className={labelCls}>Descrição do problema (opcional)</label>
                  <textarea id="lf-mensagem" value={form.mensagem} onChange={update("mensagem")} className={`${inputCls} min-h-[90px]`} placeholder="Conte rapidamente o que está acontecendo" />
                </div>

                <div className="rounded-lg border border-[#1C3D22] bg-[#0A1A0F]">
                  <button
                    type="button"
                    onClick={() => setShowAddress((v) => !v)}
                    aria-expanded={showAddress}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-[#C7D8C7]"
                  >
                    Adicionar endereço do atendimento — opcional
                    <ChevronDown className={`h-4 w-4 shrink-0 text-[#2ECC71] transition-transform ${showAddress ? "rotate-180" : ""}`} />
                  </button>
                  {showAddress && (
                    <div className="grid gap-4 border-t border-[#1C3D22] p-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="lf-cep" className={labelCls}>CEP</label>
                        <input
                          id="lf-cep"
                          inputMode="numeric"
                          value={form.cep}
                          onChange={(e) => {
                            update("cep")(e);
                            void lookupCep(e.target.value);
                          }}
                          className={inputCls}
                          placeholder="00000-000"
                        />
                        {cepStatus === "loading" && <p className="mt-1 text-xs text-[#8FA98F]">Consultando CEP…</p>}
                        {cepStatus === "error" && (
                          <p className="mt-1 text-xs text-[#8FA98F]">Não conseguimos consultar o CEP. Você pode preencher manualmente.</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lf-logradouro" className={labelCls}>Logradouro</label>
                        <input id="lf-logradouro" value={form.logradouro} onChange={update("logradouro")} className={inputCls} placeholder="Rua / Avenida" />
                      </div>
                      <div>
                        <label htmlFor="lf-numero" className={labelCls}>Número</label>
                        <input id="lf-numero" value={form.numero} onChange={update("numero")} className={inputCls} placeholder="Número" />
                      </div>
                      <div>
                        <label htmlFor="lf-complemento" className={labelCls}>Complemento</label>
                        <input id="lf-complemento" value={form.complemento} onChange={update("complemento")} className={inputCls} placeholder="Apto, bloco…" />
                      </div>
                      <div>
                        <label htmlFor="lf-estado" className={labelCls}>Estado</label>
                        <input id="lf-estado" value={form.estado} onChange={update("estado")} className={inputCls} placeholder="UF" />
                      </div>
                      <div>
                        <label htmlFor="lf-referencia" className={labelCls}>Ponto de referência</label>
                        <input id="lf-referencia" value={form.referencia} onChange={update("referencia")} className={inputCls} placeholder="Próximo a…" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Campo anti-spam: invisível para usuários reais */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="lf-site">Site</label>
                  <input id="lf-site" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={update("honeypot")} />
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-[#1C3D22] bg-[#0A1A0F] p-4">
                  <input
                    id="lf-privacidade"
                    type="checkbox"
                    checked={privacidade}
                    onChange={(e) => setPrivacidade(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#2ECC71]"
                  />
                  <label htmlFor="lf-privacidade" className="text-xs leading-relaxed text-[#C7D8C7]">
                    Li a{" "}
                    <Link to="/politica-de-privacidade" className="text-[#2ECC71] hover:underline">Política de Privacidade</Link>{" "}
                    e estou ciente de que meus dados serão utilizados para responder à minha solicitação. *
                  </label>
                </div>
              </div>
            )}

            {erro && (
              <p role="alert" className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {erro}
              </p>
            )}

            {status === "sent" && (
              <div className="mt-4 rounded-lg border border-[#2ECC71]/40 bg-[#2ECC71]/10 px-4 py-3 text-sm text-[#7DFFB3]">
                Seus dados foram registrados{protocolo ? ` — protocolo ${protocolo}` : ""}. Se o WhatsApp não abrir
                automaticamente,{" "}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="font-semibold underline">
                  clique aqui para falar com a equipe
                </a>
                .
              </div>
            )}
          </div>

          <footer
            className="sticky bottom-0 z-10 flex flex-col gap-3 border-t border-[#1C3D22] bg-[#0F2415] px-5 py-4 sm:flex-row sm:items-center sm:px-7"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            {step === 2 && (
              <button
                type="button"
                onClick={() => {
                  setErro(null);
                  setStep(1);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#1C3D22] px-5 py-3.5 text-sm font-semibold text-[#C7D8C7] transition-colors hover:text-[#F0F4F0]"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-[#2ECC71] px-6 py-3.5 text-sm font-bold text-[#06180D] transition-all hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
              {step === 1 ? "Continuar" : status === "sending" ? "Enviando…" : "Enviar e falar no WhatsApp"}
              {step === 1 && <ArrowRight className="h-4 w-4" />}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
