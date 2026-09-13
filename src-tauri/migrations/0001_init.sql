CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS learner_profiles (
  language_code TEXT PRIMARY KEY,
  cefr_level TEXT NOT NULL DEFAULT 'A1',
  cefr_score REAL NOT NULL DEFAULT 8,
  streak INTEGER NOT NULL DEFAULT 0,
  total_study_minutes INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS skill_scores (
  language_code TEXT NOT NULL,
  skill_id TEXT NOT NULL,
  score REAL NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (language_code, skill_id)
);

CREATE TABLE IF NOT EXISTS vocab_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  language_code TEXT NOT NULL,
  word TEXT NOT NULL,
  translation TEXT NOT NULL,
  pronunciation TEXT,
  example_sentence TEXT,
  difficulty REAL NOT NULL DEFAULT 0.3,
  memory_strength REAL NOT NULL DEFAULT 0,
  ease_factor REAL NOT NULL DEFAULT 2.5,
  repetitions INTEGER NOT NULL DEFAULT 0,
  interval_days REAL NOT NULL DEFAULT 0,
  next_review_date TEXT NOT NULL DEFAULT (datetime('now')),
  mistake_count INTEGER NOT NULL DEFAULT 0,
  last_reviewed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_vocab_items_lang_due
  ON vocab_items (language_code, next_review_date);

CREATE TABLE IF NOT EXISTS review_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vocab_item_id INTEGER NOT NULL REFERENCES vocab_items(id),
  reviewed_at TEXT NOT NULL DEFAULT (datetime('now')),
  correct INTEGER NOT NULL,
  response_ms INTEGER
);

CREATE TABLE IF NOT EXISTS placement_test_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  language_code TEXT NOT NULL,
  cefr_level TEXT NOT NULL,
  score REAL NOT NULL,
  taken_at TEXT NOT NULL DEFAULT (datetime('now')),
  raw_answers TEXT
);
