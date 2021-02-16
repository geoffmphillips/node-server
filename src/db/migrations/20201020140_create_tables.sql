CREATE TABLE IF NOT EXISTS users (
  id UUID,
  roles TEXT[],
  email TEXT,
  digest TEXT
)