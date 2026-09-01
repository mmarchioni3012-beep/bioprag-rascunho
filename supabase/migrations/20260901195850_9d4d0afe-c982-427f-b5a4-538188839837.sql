ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS phone_alt text,
  ADD COLUMN IF NOT EXISTS consent_version text,
  ADD COLUMN IF NOT EXISTS arrived_at timestamp with time zone NOT NULL DEFAULT now();