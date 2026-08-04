import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { SERVICES } from "../data";

export default defineTool({
  name: "list_services",
  title: "Listar serviços",
  description:
    "Lista os serviços de controle de pragas e biossegurança oferecidos pela BIOPRAG, com resumo e descrição técnica. Aceita um termo de busca opcional.",
  inputSchema: {
    search: z
      .string()
      .optional()
      .describe("Termo opcional para filtrar por nome ou descrição do serviço (ex.: 'cupim', 'ratos')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ search }) => {
    const term = search?.trim().toLowerCase();
    const items = term
      ? SERVICES.filter((s) =>
          `${s.title} ${s.short} ${s.description}`.toLowerCase().includes(term),
        )
      : [...SERVICES];
    const payload = { count: items.length, services: items };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
