CREATE TABLE IF NOT EXISTS mistakes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  language_code TEXT NOT NULL,
  skill_id TEXT NOT NULL,
  topic_id TEXT,
  detail TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_mistakes_lang_created
  ON mistakes (language_code, created_at DESC);
