import Database from "@tauri-apps/plugin-sql";

let dbPromise: Promise<Database> | null = null;

/** Lazily opens (and migrates, via Rust-registered migrations) the local db. */
export function getDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = Database.load("sqlite:dilkoc.db");
  }
  return dbPromise;
}
