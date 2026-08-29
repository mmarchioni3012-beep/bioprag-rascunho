ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS address_cep text,
  ADD COLUMN IF NOT EXISTS address_street text,
  ADD COLUMN IF NOT EXISTS address_number text,
  ADD COLUMN IF NOT EXISTS address_complement text,
  ADD COLUMN IF NOT EXISTS address_state text,
  ADD COLUMN IF NOT EXISTS address_reference text,
  ADD COLUMN IF NOT EXISTS address_zone text,
  ADD COLUMN IF NOT EXISTS address_status text NOT NULL DEFAULT 'nao_informado';