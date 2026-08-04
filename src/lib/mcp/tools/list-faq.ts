import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { FAQ } from "../data";

export default defineTool({
  name: "list_faq",
  title: "Perguntas frequentes",
  description:
    "Retorna as perguntas frequentes públicas da BIOPRAG (segurança dos produtos, laudos, garantia, prazos). Aceita um termo de busca opcional.",
  inputSchema: {
    search: z
      .string()
      .optional()
      .describe("Termo opcional para filtrar perguntas e respostas (ex.: 'garantia', 'laudo')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ search }) => {
    const term = search?.trim().toLowerCase();
    const items = term
      ? FAQ.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(term))
      : [...FAQ];
    const payload = { count: items.length, faq: items };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
