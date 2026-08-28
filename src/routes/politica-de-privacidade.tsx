import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | BIOPRAG" },
      {
        name: "description",
        content:
          "Como a BIOPRAG coleta, usa e protege os dados enviados pelo site: finalidade, base legal, prazo de guarda e seus direitos pela LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade | BIOPRAG" },
      {
        property: "og:description",
        content: "Tratamento de dados pessoais no site da BIOPRAG, em conformidade com a LGPD.",
      },
      {
        name: "twitter:description",
        content: "Tratamento de dados pessoais no site da BIOPRAG, em conformidade com a LGPD.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://bioprag.lovable.app/politica-de-privacidade" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A1A0F] px-4 py-16 text-[#F0F4F0]">
      <article className="mx-auto max-w-3xl">
        <Link to="/" className="text-sm text-[#2ECC71] hover:underline">
          ← Voltar para o site
        </Link>
        <h1 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">Política de Privacidade</h1>
        <p className="mt-3 text-sm text-[#8FA98F]">Tratamento de dados pessoais no site da BIOPRAG (LGPD — Lei 13.709/2018).</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#C7D6C7]">
          <section>
            <h2 className="font-display text-lg font-bold text-[#F0F4F0]">1. Quais dados coletamos</h2>
            <p className="mt-2">
              Ao preencher o formulário do site, coletamos: nome, telefone/WhatsApp, e-mail (opcional), cidade e bairro,
              tipo de cliente, empresa (quando aplicável), serviço de interesse, tipo de praga, mensagem e a forma de
              contato preferida. Também registramos dados técnicos e de marketing: origem, mídia, campanha, palavra-chave,
              identificadores de anúncio (por exemplo, gclid), página de entrada, referenciador e tipo de dispositivo.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-[#F0F4F0]">2. Finalidade</h2>
            <p className="mt-2">
              Os dados são usados exclusivamente para responder à sua solicitação, elaborar orçamento, executar o serviço
              contratado, manter histórico de atendimento e medir a eficiência dos nossos canais de divulgação. O envio de
              comunicações comerciais ocorre somente com o seu consentimento específico.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-[#F0F4F0]">3. Base legal</h2>
            <p className="mt-2">
              Tratamos os dados com base na execução de contrato e em procedimentos preliminares a pedido do titular
              (art. 7º, V), no legítimo interesse para gestão do atendimento (art. 7º, IX) e no consentimento, quando você
              autoriza o recebimento de comunicações de marketing (art. 7º, I).
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-[#F0F4F0]">4. Compartilhamento</h2>
            <p className="mt-2">
              Não vendemos seus dados. Eles são acessados apenas pela equipe interna autorizada da BIOPRAG e por
              provedores de infraestrutura tecnológica (hospedagem, banco de dados e ferramentas de mensuração) que atuam
              como operadores, sob obrigação de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-[#F0F4F0]">5. Prazo de guarda</h2>
            <p className="mt-2">
              Leads não convertidos são mantidos por até 24 meses. Registros de clientes atendidos são mantidos pelo prazo
              necessário ao cumprimento de obrigações legais, fiscais e sanitárias. Após esses prazos, os dados são
              eliminados ou anonimizados.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-[#F0F4F0]">6. Segurança</h2>
            <p className="mt-2">
              Os dados ficam armazenados em banco de dados com acesso restrito, políticas de segurança por linha e
              autenticação obrigatória para a área interna. Não é possível consultar dados de leads publicamente.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-[#F0F4F0]">7. Seus direitos</h2>
            <p className="mt-2">
              Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, revogação do
              consentimento e exclusão dos seus dados. Basta escrever para{" "}
              <a href="mailto:vendas@bioprag.com.br" className="text-[#2ECC71] hover:underline">
                vendas@bioprag.com.br
              </a>
              . Responderemos no prazo legal.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
