import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { listLeads, listLeadEvents, updateLead, getMyAdminAccess } from "@/lib/admin-leads.functions";
import { NewLeadDialog } from "@/components/admin/NewLeadDialog";
import {
  LEAD_STATUS,
  LEAD_STATUS_LABEL,
  MANUAL_SOURCES,
  MANUAL_SOURCE_LABEL,
  ORIGIN_GROUPS,
  ORIGIN_GROUP_LABEL,
  originLabel,
  whatsappUrl,
  suggestedWhatsappMessage,
} from "@/lib/leads-constants";

type Lead = Tables<"leads">;
type LeadEvent = Tables<"lead_events">;

export const Route = createFileRoute("/_authenticated/admin/leads")({
  head: () => ({
    meta: [
      { title: "Gestão de leads | BIOPRAG" },
      { name: "description", content: "Painel interno da BIOPRAG para acompanhamento e qualificação de leads." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Gestão de leads | BIOPRAG" },
      { property: "og:description", content: "Painel interno de leads da BIOPRAG." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LeadsAdmin,
});

const STATUS = LEAD_STATUS;
const STATUS_LABEL = LEAD_STATUS_LABEL;

const WA_STATUS = ["nao_aberto", "aberto", "nao_confirmado", "mensagem_recebida", "respondido", "convertido"] as const;
const WA_LABEL: Record<string, string> = {
  nao_aberto: "Não abriu WhatsApp",
  aberto: "Abriu WhatsApp",
  nao_confirmado: "Não confirmado",
  mensagem_recebida: "Mensagem recebida",
  respondido: "Respondido",
  convertido: "Convertido",
};

const fmtDate = (v: string | null) =>
  v ? new Date(v).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "—";

const input =
  "w-full rounded-md border border-[#1C3D22] bg-[#08150D] px-3 py-2 text-sm text-[#F0F4F0] outline-none focus:border-[#2ECC71]";
const label = "mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8FA98F]";

function LeadsAdmin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchAccess = useServerFn(getMyAdminAccess);
  const fetchLeads = useServerFn(listLeads);
  const fetchEvents = useServerFn(listLeadEvents);
  const saveLead = useServerFn(updateLead);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    city: "",
    service_interest: "",
    customer_type: "",
    origin: "",
    campaign: "",
    term: "",
    status: "",
    assigned_to: "",
    whatsapp_received: "todos" as "sim" | "nao" | "todos",
    include_archived: false,
    search: "",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const access = useQuery({ queryKey: ["admin-access"], queryFn: () => fetchAccess({ data: undefined }) });

  const leadsQuery = useQuery({
    queryKey: ["leads", filters],
    enabled: access.data?.isAdmin === true,
    queryFn: () =>
      fetchLeads({
        data: {
          from: filters.from ? new Date(`${filters.from}T00:00:00`).toISOString() : null,
          to: filters.to ? new Date(`${filters.to}T23:59:59`).toISOString() : null,
          city: filters.city || null,
          service_interest: filters.service_interest || null,
          customer_type: filters.customer_type || null,
          origin: filters.origin || null,
          campaign: filters.campaign || null,
          term: filters.term || null,
          status: filters.status || null,
          assigned_to: filters.assigned_to || null,
          whatsapp_received: filters.whatsapp_received,
          include_archived: filters.include_archived,
          search: filters.search || null,
        },
      }) as Promise<Lead[]>,
  });

  const leads = leadsQuery.data ?? [];
  const selected = leads.find((l) => l.id === selectedId) ?? null;

  const eventsQuery = useQuery({
    queryKey: ["lead-events", selectedId],
    enabled: Boolean(selectedId),
    queryFn: () => fetchEvents({ data: { lead_id: selectedId as string } }) as Promise<LeadEvent[]>,
  });

  const mutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => saveLead({ data: payload } as never),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["leads"] });
      void queryClient.invalidateQueries({ queryKey: ["lead-events"] });
    },
  });

  const kpis = useMemo(() => {
    const total = leads.length;
    const withWa = leads.filter((l) => l.whatsapp_received_at).length;
    const won = leads.filter((l) => l.status === "ganho").length;
    const value = leads.reduce((sum, l) => sum + Number(l.closed_value ?? 0), 0);
    return { total, withWa, won, value };
  }, [leads]);

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const exportCsv = () => {
    const cols: (keyof Lead)[] = [
      "created_at",
      "name",
      "phone",
      "email",
      "city",
      "neighborhood",
      "customer_type",
      "company_name",
      "service_interest",
      "pest_type",
      "preferred_contact",
      "status",
      "whatsapp_status",
      "whatsapp_received_at",
      "assigned_to",
      "estimated_value",
      "closed_value",
      "service_date",
      "origin",
      "source",
      "medium",
      "campaign",
      "term",
      "content",
      "gclid",
      "landing_page",
      "referrer",
      "device_type",
      "message",
      "internal_notes",
    ];
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...leads.map((l) => cols.map((c) => escape(l[c])).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `bioprag-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (access.isLoading) {
    return <div className="grid min-h-screen place-items-center bg-[#0A1A0F] text-[#8FA98F]">Carregando…</div>;
  }

  if (!access.data?.isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#0A1A0F] px-4 text-center text-[#F0F4F0]">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Acesso restrito</h1>
          <p className="mt-2 max-w-md text-sm text-[#8FA98F]">
            Sua conta não possui permissão de administrador. Solicite a liberação ao responsável interno da BIOPRAG.
          </p>
          <button onClick={signOut} className="mt-6 rounded-md border border-[#1C3D22] px-4 py-2 text-sm">
            Sair
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1A0F] text-[#F0F4F0]">
      <header className="border-b border-[#1C3D22] bg-[#0B1D11]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <h1 className="font-display text-xl font-extrabold">Gestão de leads</h1>
            <p className="text-xs text-[#8FA98F]">Dados sensíveis — uso interno BIOPRAG</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCsv} className="rounded-md bg-[#2ECC71] px-4 py-2 text-sm font-semibold text-[#06180D]">
              Exportar CSV
            </button>
            <button onClick={signOut} className="rounded-md border border-[#1C3D22] px-4 py-2 text-sm text-[#8FA98F]">
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { l: "Leads no filtro", v: String(kpis.total) },
            { l: "Com mensagem no WhatsApp", v: String(kpis.withWa) },
            { l: "Ganhos", v: String(kpis.won) },
            { l: "Valor fechado", v: kpis.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) },
          ].map((k) => (
            <div key={k.l} className="rounded-xl border border-[#1C3D22] bg-[#0B1D11] p-4">
              <p className="text-xs uppercase tracking-wider text-[#8FA98F]">{k.l}</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-[#2ECC71]">{k.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 rounded-xl border border-[#1C3D22] bg-[#0B1D11] p-4 md:grid-cols-3 lg:grid-cols-6">
          <div>
            <label className={label} htmlFor="f-from">De</label>
            <input id="f-from" type="date" className={input} value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value })} />
          </div>
          <div>
            <label className={label} htmlFor="f-to">Até</label>
            <input id="f-to" type="date" className={input} value={filters.to} onChange={(e) => setFilters({ ...filters, to: e.target.value })} />
          </div>
          <div>
            <label className={label} htmlFor="f-search">Nome / telefone</label>
            <input id="f-search" className={input} value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          </div>
          <div>
            <label className={label} htmlFor="f-city">Cidade</label>
            <input id="f-city" className={input} value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} />
          </div>
          <div>
            <label className={label} htmlFor="f-status">Status</label>
            <select id="f-status" className={input} value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="">Todos</option>
              {STATUS.map((s) => (
                <option key={s} value={s}>{STATUS_LABEL[s]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="f-wa">WhatsApp recebido</label>
            <select
              id="f-wa"
              className={input}
              value={filters.whatsapp_received}
              onChange={(e) => setFilters({ ...filters, whatsapp_received: e.target.value as "sim" | "nao" | "todos" })}
            >
              <option value="todos">Todos</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>
          <div>
            <label className={label} htmlFor="f-service">Serviço</label>
            <input id="f-service" className={input} value={filters.service_interest} onChange={(e) => setFilters({ ...filters, service_interest: e.target.value })} />
          </div>
          <div>
            <label className={label} htmlFor="f-campaign">Campanha</label>
            <input id="f-campaign" className={input} value={filters.campaign} onChange={(e) => setFilters({ ...filters, campaign: e.target.value })} />
          </div>
          <div>
            <label className={label} htmlFor="f-term">Palavra-chave</label>
            <input id="f-term" className={input} value={filters.term} onChange={(e) => setFilters({ ...filters, term: e.target.value })} />
          </div>
          <div>
            <label className={label} htmlFor="f-owner">Responsável</label>
            <input id="f-owner" className={input} value={filters.assigned_to} onChange={(e) => setFilters({ ...filters, assigned_to: e.target.value })} />
          </div>
          <div className="flex items-end gap-2">
            <input
              id="f-arch"
              type="checkbox"
              checked={filters.include_archived}
              onChange={(e) => setFilters({ ...filters, include_archived: e.target.checked })}
              className="h-4 w-4 accent-[#2ECC71]"
            />
            <label htmlFor="f-arch" className="text-xs text-[#8FA98F]">Incluir arquivados</label>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-[#1C3D22] bg-[#0B1D11]">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-[#1C3D22] text-xs uppercase tracking-wider text-[#8FA98F]">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Cidade</th>
                <th className="px-4 py-3">Serviço</th>
                <th className="px-4 py-3">Origem</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leadsQuery.isLoading && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#8FA98F]">Carregando leads…</td></tr>
              )}
              {!leadsQuery.isLoading && leads.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#8FA98F]">Nenhum lead encontrado com os filtros atuais.</td></tr>
              )}
              {leads.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => setSelectedId(l.id)}
                  className="cursor-pointer border-b border-[#132A19] transition-colors hover:bg-[#0F2415]"
                >
                  <td className="px-4 py-3 text-[#8FA98F]">{fmtDate(l.created_at)}</td>
                  <td className="px-4 py-3">
                    {l.name}
                    {l.duplicate_suspected && (
                      <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] text-amber-300">duplicado?</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#8FA98F]">{l.city}</td>
                  <td className="px-4 py-3 text-[#8FA98F]">{l.service_interest}</td>
                  <td className="px-4 py-3 text-[#8FA98F]">{l.source ?? "—"}{l.campaign ? ` / ${l.campaign}` : ""}</td>
                  <td className="px-4 py-3 text-[#8FA98F]">{WA_LABEL[l.whatsapp_status ?? "nao_aberto"]}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-[#2ECC71]/12 px-2 py-1 text-xs text-[#2ECC71]">
                      {STATUS_LABEL[l.status ?? "novo"]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={() => setSelectedId(null)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="h-full w-full max-w-xl overflow-y-auto border-l border-[#1C3D22] bg-[#0B1D11] p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-extrabold">{selected.name}</h2>
                <p className="text-xs text-[#8FA98F]">Recebido em {fmtDate(selected.created_at)}</p>
              </div>
              <button onClick={() => setSelectedId(null)} className="rounded-md border border-[#1C3D22] px-3 py-1.5 text-sm text-[#8FA98F]">
                Fechar
              </button>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ["Telefone", selected.phone],
                ["E-mail", selected.email ?? "—"],
                ["Cidade", selected.city],
                ["Bairro", selected.neighborhood ?? "—"],
                ["Perfil", selected.customer_type],
                ["Empresa", selected.company_name ?? "—"],
                ["Serviço", selected.service_interest],
                ["Praga", selected.pest_type ?? "—"],
                ["Contato preferido", selected.preferred_contact ?? "—"],
                ["Origem", selected.origin ?? "—"],
                ["Source / Medium", `${selected.source ?? "—"} / ${selected.medium ?? "—"}`],
                ["Campanha", selected.campaign ?? "—"],
                ["Palavra-chave", selected.term ?? "—"],
                ["GCLID", selected.gclid ?? "—"],
                ["Dispositivo", selected.device_type ?? "—"],
                ["Landing page", selected.landing_page ?? "—"],
                ["Consentimento marketing", selected.marketing_consent ? "Sim" : "Não"],
                ["Aviso de privacidade", selected.privacy_acknowledged ? "Aceito" : "—"],
              ].map(([k, v]) => (
                <div key={String(k)} className="rounded-lg border border-[#132A19] bg-[#08150D] p-3">
                  <dt className="text-[11px] uppercase tracking-wider text-[#8FA98F]">{k}</dt>
                  <dd className="mt-1 break-words text-[#F0F4F0]">{String(v)}</dd>
                </div>
              ))}
            </dl>

            {selected.message && (
              <div className="mt-4 rounded-lg border border-[#132A19] bg-[#08150D] p-3 text-sm">
                <p className="text-[11px] uppercase tracking-wider text-[#8FA98F]">Mensagem</p>
                <p className="mt-1 whitespace-pre-wrap">{selected.message}</p>
              </div>
            )}

            <LeadEditor
              lead={selected}
              saving={mutation.isPending}
              onSave={(payload) => mutation.mutate({ id: selected.id, ...payload })}
            />

            <div className="mt-8">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">Histórico</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {(eventsQuery.data ?? []).map((ev) => (
                  <li key={ev.id} className="rounded-lg border border-[#132A19] bg-[#08150D] p-3">
                    <p className="text-[#F0F4F0]">{ev.event_type}</p>
                    <p className="text-xs text-[#8FA98F]">{fmtDate(ev.created_at)}</p>
                  </li>
                ))}
                {eventsQuery.data?.length === 0 && <li className="text-[#8FA98F]">Nenhum evento registrado.</li>}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function LeadEditor({
  lead,
  saving,
  onSave,
}: {
  lead: Lead;
  saving: boolean;
  onSave: (payload: Record<string, unknown>) => void;
}) {
  const [state, setState] = useState({
    status: lead.status ?? "novo",
    whatsapp_status: lead.whatsapp_status ?? "aberto",
    whatsapp_received: Boolean(lead.whatsapp_received_at),
    assigned_to: lead.assigned_to ?? "",
    internal_notes: lead.internal_notes ?? "",
    loss_reason: lead.loss_reason ?? "",
    estimated_value: lead.estimated_value != null ? String(lead.estimated_value) : "",
    closed_value: lead.closed_value != null ? String(lead.closed_value) : "",
    service_date: lead.service_date ?? "",
    archived: Boolean(lead.archived),
  });

  return (
    <div className="mt-6 rounded-xl border border-[#1C3D22] bg-[#08150D] p-4">
      <h3 className="font-display text-sm font-bold uppercase tracking-wider">Gestão comercial</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="e-status">Status</label>
          <select id="e-status" className={input} value={state.status} onChange={(e) => setState({ ...state, status: e.target.value })}>
            {STATUS.map((s) => (<option key={s} value={s}>{STATUS_LABEL[s]}</option>))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="e-wa">Status WhatsApp</label>
          <select id="e-wa" className={input} value={state.whatsapp_status} onChange={(e) => setState({ ...state, whatsapp_status: e.target.value })}>
            {WA_STATUS.map((s) => (<option key={s} value={s}>{WA_LABEL[s]}</option>))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="e-owner">Responsável</label>
          <input id="e-owner" className={input} value={state.assigned_to} onChange={(e) => setState({ ...state, assigned_to: e.target.value })} />
        </div>
        <div>
          <label className={label} htmlFor="e-date">Data do serviço</label>
          <input id="e-date" type="date" className={input} value={state.service_date} onChange={(e) => setState({ ...state, service_date: e.target.value })} />
        </div>
        <div>
          <label className={label} htmlFor="e-est">Valor estimado (R$)</label>
          <input id="e-est" type="number" min="0" step="0.01" className={input} value={state.estimated_value} onChange={(e) => setState({ ...state, estimated_value: e.target.value })} />
        </div>
        <div>
          <label className={label} htmlFor="e-closed">Valor fechado (R$)</label>
          <input id="e-closed" type="number" min="0" step="0.01" className={input} value={state.closed_value} onChange={(e) => setState({ ...state, closed_value: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="e-loss">Motivo de perda</label>
          <input id="e-loss" className={input} value={state.loss_reason} onChange={(e) => setState({ ...state, loss_reason: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="e-notes">Observações internas</label>
          <textarea id="e-notes" className={`${input} min-h-[90px]`} value={state.internal_notes} onChange={(e) => setState({ ...state, internal_notes: e.target.value })} />
        </div>
        <div className="flex items-center gap-2">
          <input id="e-received" type="checkbox" className="h-4 w-4 accent-[#2ECC71]" checked={state.whatsapp_received} onChange={(e) => setState({ ...state, whatsapp_received: e.target.checked })} />
          <label htmlFor="e-received" className="text-xs text-[#8FA98F]">Mensagem recebida no WhatsApp</label>
        </div>
        <div className="flex items-center gap-2">
          <input id="e-archived" type="checkbox" className="h-4 w-4 accent-[#2ECC71]" checked={state.archived} onChange={(e) => setState({ ...state, archived: e.target.checked })} />
          <label htmlFor="e-archived" className="text-xs text-[#8FA98F]">Arquivar lead</label>
        </div>
      </div>
      <button
        disabled={saving}
        onClick={() =>
          onSave({
            status: state.status,
            whatsapp_status: state.whatsapp_status,
            whatsapp_received: state.whatsapp_received,
            assigned_to: state.assigned_to || null,
            internal_notes: state.internal_notes || null,
            loss_reason: state.loss_reason || null,
            estimated_value: state.estimated_value ? Number(state.estimated_value) : null,
            closed_value: state.closed_value ? Number(state.closed_value) : null,
            service_date: state.service_date || null,
            archived: state.archived,
          })
        }
        className="mt-4 w-full rounded-lg bg-[#2ECC71] px-4 py-3 text-sm font-semibold text-[#06180D] transition-all hover:brightness-110 disabled:opacity-60"
      >
        {saving ? "Salvando…" : "Salvar alterações"}
      </button>
    </div>
  );
}
