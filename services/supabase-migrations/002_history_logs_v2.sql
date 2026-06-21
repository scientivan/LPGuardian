-- Migration: 2026-06-22 - Extend history_logs for app-level history queries

ALTER TABLE history_logs
  ADD COLUMN IF NOT EXISTS level TEXT,
  ADD COLUMN IF NOT EXISTS pool_id TEXT,
  ADD COLUMN IF NOT EXISTS summary TEXT,
  ADD COLUMN IF NOT EXISTS tx_digest TEXT,
  ADD COLUMN IF NOT EXISTS money_saved NUMERIC;

UPDATE history_logs
SET
  level = COALESCE(level, details->>'level', 'portfolio'),
  pool_id = COALESCE(pool_id, details->>'poolId'),
  summary = COALESCE(summary, details->>'summary'),
  tx_digest = COALESCE(tx_digest, details->>'txDigest'),
  money_saved = COALESCE(money_saved, NULLIF(details->>'moneySaved', '')::numeric)
WHERE
  level IS NULL
  OR pool_id IS NULL
  OR summary IS NULL
  OR tx_digest IS NULL
  OR money_saved IS NULL;

CREATE INDEX IF NOT EXISTS idx_history_logs_level ON history_logs(level);
CREATE INDEX IF NOT EXISTS idx_history_logs_pool_id ON history_logs(pool_id);
CREATE INDEX IF NOT EXISTS idx_history_logs_tx_digest ON history_logs(tx_digest);
