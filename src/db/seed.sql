GRANT ALL ON SCHEMA meta TO postgres;
GRANT ALL ON SCHEMA meta TO geoff;

DROP TABLE IF EXISTS meta.migrations;
DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY,
  roles TEXT[],
  email TEXT,
  digest TEXT
);

CREATE TABLE meta.migrations (
  id VARCHAR NOT NULL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.users (id, email, digest, roles)
VALUES
  ('00000000-0000-0000-0000-000000000000', 'user@test.test', '', '{user}'),
  ('00000000-0000-0000-0000-000000000001', 'admin@test.test', '', '{user, staff, admin}');