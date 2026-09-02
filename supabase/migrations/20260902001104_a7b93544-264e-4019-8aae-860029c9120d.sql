ALTER TABLE public.lead_events DROP CONSTRAINT IF EXISTS lead_events_lead_id_fkey;
ALTER TABLE public.lead_events ADD CONSTRAINT lead_events_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL;

GRANT DELETE ON public.leads TO authenticated;

CREATE POLICY admins_delete_leads ON public.leads FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));