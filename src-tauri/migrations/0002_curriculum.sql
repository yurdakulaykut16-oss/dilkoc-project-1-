CREATE TABLE IF NOT EXISTS curriculum_progress (
  language_code TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed')),
  mastery_score REAL NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (language_code, topic_id)
);
