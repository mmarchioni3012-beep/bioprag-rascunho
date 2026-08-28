-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "users_read_own_roles" ON public.user_roles
FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Leads
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  phone_normalized text,
  email text,
  city text NOT NULL,
  neighborhood text,
  customer_type text NOT NULL DEFAULT 'outro'
    CHECK (customer_type IN ('residencial','empresa','condominio','propriedade_rural','outro')),
  company_name text,
  service_interest text NOT NULL,
  pest_type text,
  message text,
  preferred_contact text NOT NULL DEFAULT 'whatsapp'
    CHECK (preferred_contact IN ('whatsapp','telefone','email')),
  origin text NOT NULL DEFAULT 'site_form'
    CHECK (origin IN ('site_form','whatsapp_form','whatsapp_direct_click','phone_click','manual')),
  status text NOT NULL DEFAULT 'novo'
    CHECK (status IN ('novo','contato_pendente','contatado','qualificado','orcamento_enviado','servico_agendado','ganho','perdido','sem_resposta','spam')),
  loss_reason text,
  estimated_value numeric(12,2),
  closed_value numeric(12,2),
  service_date date,
  assigned_to text,
  internal_notes text,
  whatsapp_intent_at timestamptz,
  whatsapp_received_at timestamptz,
  whatsapp_status text NOT NULL DEFAULT 'nao_confirmado'
    CHECK (whatsapp_status IN ('nao_aberto','aberto','nao_confirmado','mensagem_recebida','respondido','convertido')),
  privacy_acknowledged boolean NOT NULL DEFAULT false,
  privacy_acknowledged_at timestamptz,
  marketing_consent boolean NOT NULL DEFAULT false,
  marketing_consent_at timestamptz,
  retention_review_at timestamptz NOT NULL DEFAULT (now() + interval '24 months'),
  duplicate_suspected boolean NOT NULL DEFAULT false,
  archived boolean NOT NULL DEFAULT false,
  source text,
  medium text,
  campaign text,
  content text,
  term text,
  gclid text,
  wbraid text,
  gbraid text,
  fbclid text,
  landing_page text,
  referrer text,
  device_type text,
  session_id text
);

CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX leads_phone_normalized_idx ON public.leads (phone_normalized);
CREATE INDEX leads_status_idx ON public.leads (status);

GRANT SELECT, UPDATE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins_read_leads" ON public.leads
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins_update_leads" ON public.leads
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Lead events
CREATE TABLE public.lead_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  session_id text,
  event_type text NOT NULL,
  event_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  source text,
  medium text,
  campaign text,
  term text,
  content text,
  gclid text,
  fbclid text,
  page_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX lead_events_lead_id_idx ON public.lead_events (lead_id);
CREATE INDEX lead_events_created_at_idx ON public.lead_events (created_at DESC);

GRANT SELECT ON public.lead_events TO authenticated;
GRANT ALL ON public.lead_events TO service_role;
ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins_read_lead_events" ON public.lead_events
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER leads_set_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- duplicate detection (24h window on same normalized phone)
CREATE OR REPLACE FUNCTION public.flag_duplicate_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.phone_normalized IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.leads
    WHERE phone_normalized = NEW.phone_normalized
      AND id <> NEW.id
      AND created_at > now() - interval '24 hours'
  ) THEN
    NEW.duplicate_suspected = true;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER leads_flag_duplicate
BEFORE INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.flag_duplicate_lead();