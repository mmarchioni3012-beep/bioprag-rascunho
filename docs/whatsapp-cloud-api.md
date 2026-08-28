# Evolução futura: confirmação real de mensagens no WhatsApp

Hoje o site registra o lead no banco **antes** de abrir o WhatsApp e marca
`whatsapp_status = 'aberto'` com `whatsapp_intent_at`. Isso comprova a intenção,
mas não comprova que a mensagem chegou ao número da BIOPRAG. A confirmação real
é feita manualmente no painel (`/admin/leads` → "Mensagem recebida no WhatsApp").

## Como automatizar depois (WhatsApp Cloud API)

1. **Conta**: criar um app no Meta for Developers, adicionar o produto
   *WhatsApp*, vincular o número comercial e gerar um token permanente de sistema.
2. **Segredos**: guardar `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` e
   `WHATSAPP_WEBHOOK_VERIFY_TOKEN` como secrets do projeto (nunca no código).
3. **Webhook**: criar a rota pública
   `src/routes/api/public/webhooks/whatsapp.ts`
   - `GET`: responder ao desafio de verificação comparando `hub.verify_token`
     com `WHATSAPP_WEBHOOK_VERIFY_TOKEN`.
   - `POST`: validar a assinatura `x-hub-signature-256` (HMAC SHA-256 com o
     app secret) **antes** de ler o corpo.
4. **Correlação lead ↔ mensagem**: o texto pré-preenchido já inclui o protocolo
   (`BP-XXXXXX`). No webhook:
   - extrair o protocolo do corpo da mensagem; se ausente, casar pelo telefone
     normalizado (`phone_normalized`) das últimas 24 h.
   - atualizar o lead: `whatsapp_received_at = now()`,
     `whatsapp_status = 'mensagem_recebida'`.
   - inserir um evento em `lead_events` com `event_type = 'whatsapp_message_received'`
     e o `wa_message_id` em `event_data` (idempotência: ignorar ids repetidos).
5. **Status de entrega/resposta**: os eventos `statuses` do webhook permitem
   marcar `respondido` quando um atendente responde pelo número comercial.
6. **Métricas**: com esses campos preenchidos, o painel passa a mostrar taxa real
   de "lead → conversa iniciada" sem depender de marcação manual.

Nenhuma dessas etapas exige mudança de schema: as colunas
`whatsapp_status`, `whatsapp_intent_at` e `whatsapp_received_at` e a tabela
`lead_events` já suportam o fluxo.
