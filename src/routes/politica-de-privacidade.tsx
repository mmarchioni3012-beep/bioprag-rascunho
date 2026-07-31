import { createFileRoute, Link } from "@tanstack/react-router";
import { company } from "@/lib/company";

const TITLE = "Política de Privacidade | Bioprag";
const DESC =
  "Como a Bioprag trata os dados informados no site, a finalidade do contato e os canais para correção ou exclusão das informações.";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-foreground md:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        {children}
      </div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container-page max-w-3xl py-16 md:py-24">
        <Link to="/" className="eyebrow hover:opacity-80">
          ← Voltar para o início
        </Link>
        <h1 className="mt-6 text-3xl leading-tight text-foreground md:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-muted-foreground md:text-base">
          Esta página explica como a {company.name} trata as informações enviadas por meio do site.
        </p>

        <Section title="1. Identificação">
          <p>
            {company.name} — controle integrado de pragas, saúde ambiental e biossegurança.
            Matriz: {company.headquarters.address}, {company.headquarters.city}/
            {company.headquarters.state}, CEP {company.headquarters.zipCode}. Filial:{" "}
            {company.branch.address}, {company.branch.city}/{company.branch.state}.
          </p>
        </Section>

        <Section title="2. Dados solicitados">
          <p>
            No formulário do site são solicitados: nome, cidade, estado, tipo de cliente, serviço ou
            necessidade e nível de urgência. Opcionalmente podem ser informados empresa, bairro e uma
            mensagem livre.
          </p>
        </Section>

        <Section title="3. Finalidade">
          <p>
            Os dados são utilizados exclusivamente para entender a solicitação, avaliar a viabilidade
            de atendimento e retornar o contato comercial sobre o pedido realizado.
          </p>
        </Section>

        <Section title="4. Envio das informações ao WhatsApp">
          <p>
            Ao continuar no formulário, as informações preenchidas são organizadas em uma mensagem e o
            WhatsApp comercial da {company.name} é aberto em uma nova aba. O envio só ocorre quando o
            próprio usuário conclui o envio dentro do WhatsApp. Nesse fluxo, os dados também passam a
            ser tratados pela plataforma WhatsApp, conforme as políticas do respectivo provedor.
          </p>
        </Section>

        <Section title="5. Ferramentas de mensuração e cookies">
          <p>
            Quando ferramentas de mensuração estiverem instaladas (por exemplo, gerenciador de tags,
            analytics e ferramentas de anúncios), poderão ser coletadas informações de navegação, como
            páginas acessadas, origem do acesso e interações com botões. Não são enviados a essas
            ferramentas nome, telefone, e-mail ou o conteúdo da mensagem pessoal.
          </p>
        </Section>

        <Section title="6. Compartilhamento">
          <p>
            As informações não são comercializadas. O compartilhamento ocorre apenas com os provedores
            necessários para a comunicação e o atendimento da solicitação.
          </p>
        </Section>

        <Section title="7. Correção e exclusão">
          <p>
            Para solicitar acesso, correção ou exclusão dos dados informados, entre em contato pelo
            e-mail{" "}
            <a className="text-primary underline underline-offset-4" href={`mailto:${company.email}`}>
              {company.email}
            </a>{" "}
            ou pelo telefone {company.phoneDisplay}. A solicitação será avaliada e respondida pelos
            canais oficiais da empresa.
          </p>
        </Section>

        <Section title="8. Retenção">
          <p>
            O período de retenção das informações segue as necessidades do atendimento e as obrigações
            aplicáveis. <em>Campo editável: informar o prazo definido pela empresa.</em>
          </p>
        </Section>

        <Section title="9. Encarregado pelo tratamento de dados">
          <p>
            <em>Campo editável: informar nome e contato do responsável designado pela empresa.</em> Até
            a definição, as solicitações podem ser enviadas para {company.email}.
          </p>
        </Section>

        <Section title="10. Atualizações">
          <p>
            Esta política pode ser atualizada para refletir mudanças nos serviços, nas ferramentas
            utilizadas ou na legislação aplicável.
          </p>
        </Section>

        <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {company.name}. Todos os direitos reservados.
        </div>
      </div>
    </main>
  );
}
