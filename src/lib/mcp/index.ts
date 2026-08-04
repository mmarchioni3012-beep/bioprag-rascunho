import { defineMcp } from "@lovable.dev/mcp-js";

import getCompanyOverview from "./tools/get-company-overview";
import getContactInfo from "./tools/get-contact-info";
import listFaq from "./tools/list-faq";
import listServices from "./tools/list-services";

export default defineMcp({
  name: "bioprag-site",
  title: "BIOPRAG - SITE",
  version: "0.1.0",
  instructions:
    "Ferramentas com informações públicas da BIOPRAG, empresa de controle integrado de pragas, saúde ambiental e biossegurança. Use `get_company_overview` para o posicionamento e o método técnico, `list_services` para os serviços oferecidos, `list_faq` para dúvidas frequentes e `get_contact_info` para telefone, e-mail e endereços da matriz e filial.",
  tools: [getCompanyOverview, listServices, listFaq, getContactInfo],
});
