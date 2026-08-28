ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS manual_source text,
  ADD COLUMN IF NOT EXISTS manual_source_detail text,
  ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS created_by_name text,
  ADD COLUMN IF NOT EXISTS follow_up_at timestamptz,
  ADD COLUMN IF NOT EXISTS short_protocol text,
  ADD COLUMN IF NOT EXISTS archived_at timestamptz,
  ADD COLUMN IF NOT EXISTS archived_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS related_lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS reported_source text,
  ADD COLUMN IF NOT EXISTS attribution_type text;

CREATE UNIQUE INDEX IF NOT EXISTS leads_short_protocol_key ON public.leads (short_protocol) WHERE short_protocol IS NOT NULL;
CREATE INDEX IF NOT EXISTS leads_related_lead_id_idx ON public.leads (related_lead_id);
CREATE INDEX IF NOT EXISTS leads_manual_source_idx ON public.leads (manual_source);

DROP POLICY IF EXISTS admins_insert_leads ON public.leads;
CREATE POLICY admins_insert_leads ON public.leads
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS admins_insert_lead_events ON public.lead_events;
CREATE POLICY admins_insert_lead_events ON public.lead_events
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

GRANT INSERT ON public.leads TO authenticated;
GRANT INSERT ON public.lead_events TO authenticated;