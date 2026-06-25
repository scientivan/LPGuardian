import type { Position } from "@luber/core";

/** Canonical demo-1 wallet: 5 positions that are secretly one 87% ETH bet. */
export const DEMO_POSITIONS: Position[] = [
  { objectId: "0xpos1", protocol: "cetus", poolId: "0xdemo1", pair: "ETH-USDC", tokenX: "ETH", tokenY: "USDC", valueUSD: 3800, inRange: true },
  { objectId: "0xpos2", protocol: "cetus", poolId: "0xdemo2", pair: "ETH-USDT", tokenX: "ETH", tokenY: "USDT", valueUSD: 2600, inRange: true },
  { objectId: "0xpos3", protocol: "turbos", poolId: "0xdemo3", pair: "WETH-SUI", tokenX: "ETH", tokenY: "SUI", valueUSD: 2300, inRange: false, daysOutOfRange: 14 },
  { objectId: "0xpos4", protocol: "cetus", poolId: "0xdemo4", pair: "stETH-ETH", tokenX: "ETH", tokenY: "ETH", valueUSD: 1500, inRange: true },
  { objectId: "0xpos5", protocol: "cetus", poolId: "0xdemo5", pair: "BTC-USDC", tokenX: "BTC", tokenY: "USDC", valueUSD: 50, inRange: true, isDust: true },
];

/**
 * Canonical DEMO_MODE portfolio — MUST stay in sync with the mcp-server fixtures
 * (apps/mcp-server/src/demoData.ts `demoPositions`). The MCP demo flow generates
 * web deep-links (e.g. /d/<wallet>/pool/0xdemo_pool_sui_usdt) that the web app
 * resolves against this server's /portfolio/pool-health, so the object IDs and
 * pool IDs here must match the MCP fixtures or the deep-link 404s.
 *
 * Hero story: "You think you have 5 positions. You actually have 1 bet — SUI."
 */
export const DEMO_MODE_POSITIONS: Position[] = [
  {
    objectId: "0xdemo_pos_001",
    protocol: "cetus",
    poolId: "0xdemo_pool_sui_usdc",
    pair: "SUI-USDC",
    tokenX: "SUI",
    tokenY: "USDC",
    token: "SUI",
    valueUSD: 3_200,
    inRange: true,
    daysOutOfRange: 0,
    isDust: false,
    source: "demo",
    recommendation: "hold",
    migrationReason: "Position is active and earning fees inside its configured range.",
  },
  {
    objectId: "0xdemo_pos_002",
    protocol: "turbos",
    poolId: "0xdemo_pool_sui_usdt",
    pair: "SUI-USDT",
    tokenX: "SUI",
    tokenY: "USDT",
    token: "SUI",
    valueUSD: 1_870,
    inRange: false,
    daysOutOfRange: 11,
    isDust: false,
    source: "demo",
    recommendation: "migrate",
    migrationReason: "Position has stayed outside its range for 11 days; migrate into a range centered on current price.",
  },
  {
    objectId: "0xdemo_pos_003",
    protocol: "cetus",
    poolId: "0xdemo_pool_sui_weth",
    pair: "SUI-WETH",
    tokenX: "SUI",
    tokenY: "WETH",
    token: "SUI",
    valueUSD: 2_450,
    inRange: true,
    daysOutOfRange: 0,
    isDust: false,
    source: "demo",
    recommendation: "hold",
    migrationReason: "Position is active and earning fees inside its configured range.",
  },
  {
    objectId: "0xdemo_pos_004",
    protocol: "cetus",
    poolId: "0xdemo_pool_stsui_sui",
    pair: "stSUI-SUI",
    tokenX: "SUI",
    tokenY: "SUI",
    token: "SUI",
    valueUSD: 1_680,
    inRange: true,
    daysOutOfRange: 0,
    isDust: false,
    source: "demo",
    recommendation: "hold",
    migrationReason: "Position is active and earning fees inside its configured range.",
  },
  {
    objectId: "0xdemo_pos_005",
    protocol: "cetus",
    poolId: "0xdemo_pool_btc_usdc",
    pair: "BTC-USDC",
    tokenX: "BTC",
    tokenY: "USDC",
    token: "BTC",
    valueUSD: 47,
    inRange: true,
    daysOutOfRange: 0,
    isDust: true,
    source: "demo",
    recommendation: "hold",
    migrationReason: "Dust position — worth less than the gas to close, but still adds IL exposure.",
  },
];

export function isDemoPosition(positionId: string): boolean {
  return DEMO_MODE_POSITIONS.some((position) => position.objectId === positionId);
}

/** Synthetic correlated price history for the compute service. */
export function demoPriceHistory(n = 120): Record<string, number[]> {
  const base: number[] = [];
  let acc = 0;
  for (let i = 0; i < n; i++) {
    acc += (Math.random() - 0.5) * 2;
    base.push(acc);
  }
  const walk = (factorW: number, noise: number, start: number) =>
    base.map((b) => start * Math.exp(0.01 * (factorW * b + noise * (Math.random() - 0.5) * 10)));
  return {
    ETH: walk(1.0, 0.2, 3000),
    BTC: walk(0.3, 0.8, 60000),
    SUI: walk(0.5, 0.6, 1.2),
    USDC: Array(n).fill(1),
    USDT: Array(n).fill(1),
  };
}
