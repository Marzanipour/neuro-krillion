CREATE TABLE IF NOT EXISTS nk_rooms (
  code TEXT PRIMARY KEY NOT NULL,
  data TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  public INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS nk_rooms_public_updated ON nk_rooms(public,updated_at);
