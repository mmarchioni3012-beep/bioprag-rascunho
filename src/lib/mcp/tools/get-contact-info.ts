import { defineTool } from "@lovable.dev/mcp-js";

import { COMPANY } from "../data";

export default defineTool({
  name: "get_contact_info",
  title: "Contato e unidades",
  description:
    "Retorna os canais de contato públicos da BIOPRAG (telefone, e-mail, site) e os endereços da matriz em Conchas/SP e da filial em Campinas/SP, com links de rota no Google Maps.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = {
      phone: COMPANY.phone,
      phoneDisplay: COMPANY.phoneDisplay,
      email: COMPANY.email,
      site: COMPANY.site,
      coverage: COMPANY.coverage,
      units: COMPANY.units,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
