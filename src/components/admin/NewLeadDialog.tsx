import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createLeadManually, findLeadsByPhone } from "@/lib/admin-leads.functions";
import {
  CUSTOMER_TYPES,
  CUSTOMER_TYPE_LABEL,
  LEAD_STATUS,
  LEAD_STATUS_LABEL,
  MANUAL_SOURCES,
  MANUAL_SOURCE_LABEL,
  originLabel,
  suggestedWhatsappMessage,
  whatsappUrl,
} from "@/lib/leads-constants";

const input =
  "w-full rounded-md border border-[#1C3D22] bg-[#08150D] px-3 py-2 text-sm text-[#F0F4F0] outline-none focus:border-[#2ECC71]";
const label = "mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8FA98F]";

type DupLead = {
  id: string;
  name: string;
  city: string;
  service_interest: string;
  origin: string | null;
  manual_source: string | null;
  manual_source_detail: string | null;
  source: string | null;
  campaign: string | null;
  status: string | null;
  created_at: string;
  updated_at: string | null;
  short_protocol: string | null;
};

const fmtDate = (v: string | null) =>
  v ? new Date(v).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "—";

const STATUS_OPTIONS = LEAD_STATUS.filter((s) => s !== "spam");

export function NewLeadDialog({
  onClose,
  onCreated,
  onOpenLead,
}: {
  onClose: () => void;
  onCreated: () => void;
  onOpenLead: (id: string) => void;
}) {
  const create = useServerFn(createLeadManually);
  const findByPhone = useServerFn(findLeadsByPhone);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    manual_source: "whatsapp",
    manual_source_detail: "",
    service_interest: "",
    status: "novo",
    email: "",
    neighborhood: "",
    customer_type: "",
    company_name: "",
    message: "",
    preferred_contact: "whatsapp",
    assigned_to: "",
    estimated_value: "",
    follow_up_at: "",
    internal_notes: "",
    reported_source: "",
  });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const [error, setError] = useState<string | null>(null);
  const [dups, setDups] = useState<DupLead[] | null>(null);
  const [checking, setChecking] = useState(false);
  const [created, setCreated] = useState<{ id: string; short_protocol: string | null } | null>(null);
  const [waMessage, setWaMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (relatedLeadId: string | null) =>
      create({
        data: {
          name: form.name,
          phone: form.phone,
          city: form.city,
          manual_source: form.manual_source,
          manual_source_detail: form.manual_source_detail || null,
          service_interest: form.service_interest,
          status: form.status,
          email: form.email || null,
          neighborhood: form.neighborhood || null,
          customer_type: form.customer_type || undefined,
          company_name: form.company_name || null,
          message: form.message || null,
          preferred_contact: form.preferred_contact,
          assigned_to: form.assigned_to || null,
          estimated_value: form.estimated_value ? Number(form.estimated_value) : null,
          follow_up_at: form.follow_up_at ? new Date(form.follow_up_at).toISOString() : null,
          internal_notes: form.internal_notes || null,
          reported_source: form.reported_source || null,
          related_lead_id: relatedLeadId,
        },
      } as never),
    onSuccess: (res) => {
      const r = res as { success: boolean; lead: { id: string; short_protocol: string | null } | null; message: string };
      if (!r.success || !r.lead) {
        setError(r.message);
        return;
      }
      setError(null);
      setDups(null);
      setCreated(r.lead);
      setWaMessage(suggestedWhatsappMessage(form.name, form.service_interest));
      onCreated();
    },
    onError: (e: Error) => setError(e.message),
  });

  const validate = () => {
    if (form.name.trim().length < 2) return "Informe o nome do contato.";
    if (form.phone.replace(/\D/g, "").length < 10) return "Informe um telefone válido com DDD.";
    if (form.city.trim().length < 2) return "Informe a cidade.";
    if (!form.service_interest.trim()) return "Informe o serviço ou problema.";
    if (form.manual_source === "outro" && !form.manual_source_detail.trim()) return "Descreva a origem do contato.";
    return null;
  };

  const submit = async () => {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setChecking(true);
    try {
      const found = (await findByPhone({ data: { phone: form.phone } })) as unknown as DupLead[];
      if (found.length > 0) {
        setDups(found);
        return;
      }
      mutation.mutate(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setChecking(false);
    }
  };

  const resetForNext = () => {
    setCreated(null);
    setDups(null);
    setError(null);
    setForm((f) => ({
      ...f,
      name: "",
      phone: "",
      email: "",
      neighborhood: "",
      company_name: "",
      service_interest: "",
      message: "",
      estimated_value: "",
      follow_up_at: "",
      internal_notes: "",
      status: "novo",
    }));
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 p-3 sm:p-6" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full max-w-3xl rounded-2xl border border-[#1C3D22] bg-[#0B1D11] p-4 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-xl font-extrabold text-[#F0F4F0]">Cadastrar novo lead</h2>
          <button onClick={onClose} className="rounded-md border border-[#1C3D22] px-3 py-1.5 text-sm text-[#8FA98F]">
            Fechar
          </button>
        </div>

        {created ? (
          <div className="mt-6">
            <div className="rounded-xl border border-[#2ECC71]/40 bg-[#2ECC71]/10 p-4">
              <p className="font-semibold text-[#2ECC71]">Lead cadastrado com sucesso.</p>
              <p className="mt-1 text-xs text-[#8FA98F]">Protocolo {created.short_protocol ?? "—"}</p>
            </div>
            <div className="mt-4">
              <label className={label} htmlFor="wa-msg">Mensagem do WhatsApp (editável)</label>
              <textarea
                id="wa-msg"
                className={`${input} min-h-[90px]`}
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
              />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                onClick={() => onOpenLead(created.id)}
                className="rounded-lg bg-[#2ECC71] px-4 py-3 text-sm font-semibold text-[#06180D]"
              >
                Abrir lead
              </button>
              <a
                href={whatsappUrl(form.phone, waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#2ECC71] px-4 py-3 text-center text-sm font-semibold text-[#2ECC71]"
              >
                Abrir conversa no WhatsApp
              </a>
              <button onClick={() => onOpenLead(created.id)} className="rounded-lg border border-[#1C3D22] px-4 py-3 text-sm text-[#8FA98F]">
                Adicionar observação
              </button>
              <button onClick={() => onOpenLead(created.id)} className="rounded-lg border border-[#1C3D22] px-4 py-3 text-sm text-[#8FA98F]">
                Agendar retorno
              </button>
              <button onClick={() => onOpenLead(created.id)} className="rounded-lg border border-[#1C3D22] px-4 py-3 text-sm text-[#8FA98F]">
                Registrar orçamento
              </button>
              <button onClick={resetForNext} className="rounded-lg border border-[#1C3D22] px-4 py-3 text-sm text-[#8FA98F]">
                Cadastrar outro lead
              </button>
            </div>
          </div>
        ) : (
          <>
            {dups && (
              <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
                <p className="font-semibold text-amber-300">Já existe um contato com este telefone.</p>
                <ul className="mt-3 space-y-2">
                  {dups.map((d) => (
                    <li key={d.id} className="rounded-lg border border-[#1C3D22] bg-[#08150D] p-3 text-sm text-[#F0F4F0]">
                      <p className="font-semibold">{d.name}</p>
                      <p className="mt-1 text-xs text-[#8FA98F]">
                        {d.city} · {d.service_interest} · {originLabel(d)} · {LEAD_STATUS_LABEL[d.status ?? "novo"]}
                      </p>
                      <p className="text-xs text-[#8FA98F]">Último contato: {fmtDate(d.updated_at ?? d.created_at)}</p>
                      <button
                        onClick={() => onOpenLead(d.id)}
                        className="mt-2 rounded-md border border-[#2ECC71] px-3 py-1.5 text-xs font-semibold text-[#2ECC71]"
                      >
                        Abrir lead existente
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    disabled={mutation.isPending}
                    onClick={() => mutation.mutate(dups[0]?.id ?? null)}
                    className="rounded-md bg-[#2ECC71] px-4 py-2 text-sm font-semibold text-[#06180D] disabled:opacity-60"
                  >
                    Registrar nova oportunidade para este contato
                  </button>
                  <button onClick={() => setDups(null)} className="rounded-md border border-[#1C3D22] px-4 py-2 text-sm text-[#8FA98F]">
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="n-name">Nome *</label>
                <input id="n-name" className={input} value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="n-phone">Telefone / WhatsApp *</label>
                <input id="n-phone" className={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="n-city">Cidade *</label>
                <input id="n-city" className={input} value={form.city} onChange={(e) => set("city", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="n-source">Origem do contato *</label>
                <select id="n-source" className={input} value={form.manual_source} onChange={(e) => set("manual_source", e.target.value)}>
                  {MANUAL_SOURCES.map((s) => (
                    <option key={s} value={s}>{MANUAL_SOURCE_LABEL[s]}</option>
                  ))}
                </select>
              </div>
              {form.manual_source === "outro" && (
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="n-source-detail">Descreva a origem *</label>
                  <input id="n-source-detail" className={input} value={form.manual_source_detail} onChange={(e) => set("manual_source_detail", e.target.value)} />
                </div>
              )}
              <div>
                <label className={label} htmlFor="n-service">Serviço ou problema *</label>
                <input id="n-service" className={input} value={form.service_interest} onChange={(e) => set("service_interest", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="n-status">Status inicial *</label>
                <select id="n-status" className={input} value={form.status} onChange={(e) => set("status", e.target.value)}>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{LEAD_STATUS_LABEL[s]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="n-email">E-mail</label>
                <input id="n-email" type="email" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="n-hood">Bairro</label>
                <input id="n-hood" className={input} value={form.neighborhood} onChange={(e) => set("neighborhood", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="n-type">Tipo de cliente</label>
                <select id="n-type" className={input} value={form.customer_type} onChange={(e) => set("customer_type", e.target.value)}>
                  <option value="">Não informado</option>
                  {CUSTOMER_TYPES.map((c) => (
                    <option key={c} value={c}>{CUSTOMER_TYPE_LABEL[c]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="n-company">Nome da empresa</label>
                <input id="n-company" className={input} value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="n-contact">Forma de contato preferida</label>
                <select id="n-contact" className={input} value={form.preferred_contact} onChange={(e) => set("preferred_contact", e.target.value)}>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="telefone">Telefone</option>
                  <option value="email">E-mail</option>
                </select>
              </div>
              <div>
                <label className={label} htmlFor="n-owner">Responsável pelo atendimento</label>
                <input id="n-owner" className={input} value={form.assigned_to} onChange={(e) => set("assigned_to", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="n-value">Valor estimado (R$)</label>
                <input id="n-value" type="number" min="0" step="0.01" className={input} value={form.estimated_value} onChange={(e) => set("estimated_value", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="n-followup">Data prevista para retorno</label>
                <input id="n-followup" type="datetime-local" className={input} value={form.follow_up_at} onChange={(e) => set("follow_up_at", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="n-reported">Origem informada pelo cliente</label>
                <select id="n-reported" className={input} value={form.reported_source} onChange={(e) => set("reported_source", e.target.value)}>
                  <option value="">Não informada</option>
                  <option value="google_ads">Google Ads (informada pelo cliente)</option>
                  <option value="meta_ads">Meta Ads (informada pelo cliente)</option>
                  <option value="google_organico">Google (busca)</option>
                  <option value="indicacao">Indicação</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="n-message">Descrição da necessidade</label>
                <textarea id="n-message" className={`${input} min-h-[80px]`} value={form.message} onChange={(e) => set("message", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="n-notes">Observações internas</label>
                <textarea id="n-notes" className={`${input} min-h-[80px]`} value={form.internal_notes} onChange={(e) => set("internal_notes", e.target.value)} />
              </div>
            </div>

            {error && <p className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                disabled={checking || mutation.isPending}
                onClick={submit}
                className="rounded-lg bg-[#2ECC71] px-5 py-3 text-sm font-semibold text-[#06180D] disabled:opacity-60"
              >
                {checking || mutation.isPending ? "Salvando…" : "Cadastrar lead"}
              </button>
              <button onClick={onClose} className="rounded-lg border border-[#1C3D22] px-5 py-3 text-sm text-[#8FA98F]">
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
