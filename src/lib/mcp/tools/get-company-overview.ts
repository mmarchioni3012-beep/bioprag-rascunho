import { defineTool } from "@lovable.dev/mcp-js";

import { COMPANY, METHOD } from "../data";

export default defineTool({
  name: "get_company_overview",
  title: "Visão geral da BIOPRAG",
  description:
    "Retorna a apresentação institucional da BIOPRAG: posicionamento, cobertura nacional e as 5 etapas do método técnico de controle de pragas.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = {
      name: COMPANY.name,
      tagline: COMPANY.tagline,
      summary: COMPANY.summary,
      site: COMPANY.site,
      coverage: COMPANY.coverage,
      method: METHOD,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
