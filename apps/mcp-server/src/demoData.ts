/**
 * DEMO_MODE fixture data — used when DEMO_MODE=true so the MCP server
 * returns realistic LP data without needing the backend or on-chain state.
 *
 * Hero story: "You think you have 5 positions. You actually have 1 bet —
 * 87% SUI exposure."
 */

export const DEMO_WALLET = process.env.DEMO_WALLET || "0x123demo";

export const isDemoMode = () => process.env.DEMO_MODE === "true";

export const isDemoRequest = (walletAddress: string) =>
  isDemoMode() && walletAddress.toLowerCase() === DEMO_WALLET.toLowerCase();

// ─── Positions (discover_positions) ─────────────────────────────────────────

export const demoPositions = [
  {
    objectId: "0xdemo_pos_001",
    protocol: "cetus",
    poolId: "0xdemo_pool_sui_usdc",
    pair: "SUI/USDC",
    tokenX: "SUI",
    tokenY: "USDC",
    token: "SUI",
    valueUSD: 3200,
    inRange: true,
    isDust: false,
  },
  {
    objectId: "0xdemo_pos_002",
    protocol: "turbos",
    poolId: "0xdemo_pool_sui_usdt",
    pair: "SUI/USDT",
    tokenX: "SUI",
    tokenY: "USDT",
    token: "SUI",
    valueUSD: 1870,
    inRange: false,
    daysOutOfRange: 11,
    isDust: false,
  },
  {
    objectId: "0xdemo_pos_003",
    protocol: "cetus",
    poolId: "0xdemo_pool_sui_weth",
    pair: "SUI/WETH",
    tokenX: "SUI",
    tokenY: "WETH",
    token: "SUI",
    valueUSD: 2450,
    inRange: true,
    isDust: false,
  },
  {
    objectId: "0xdemo_pos_004",
    protocol: "cetus",
    poolId: "0xdemo_pool_stsui_sui",
    pair: "stSUI/SUI",
    tokenX: "SUI",
    tokenY: "SUI",
    token: "SUI",
    valueUSD: 1680,
    inRange: true,
    isDust: false,
  },
  {
    objectId: "0xdemo_pos_005",
    protocol: "cetus",
    poolId: "0xdemo_pool_btc_usdc",
    pair: "BTC/USDC",
    tokenX: "BTC",
    tokenY: "USDC",
    token: "BTC",
    valueUSD: 47,
    inRange: true,
    isDust: true,
  },
];

const totalValue = demoPositions.reduce((s, p) => s + p.valueUSD, 0);

// ─── Portfolio Health (diagnose_portfolio) ──────────────────────────────────

export const demoPortfolioHealth = {
  walletAddress: DEMO_WALLET,
  healthScore: 42,
  riskLevel: "amber" as const,
  totalValueUSD: totalValue,
  positionCount: demoPositions.length,
  cluster: {
    token: "SUI",
    exposurePct: 87,
    positions: [0, 1, 2, 3],
  },
  stress: {
    asset: "SUI",
    pct: -10,
    atRiskUSD: 1840,
    perPosition: [
      { positionIndex: 0, lossUSD: 640 },
      { positionIndex: 1, lossUSD: 374 },
      { positionIndex: 2, lossUSD: 490 },
      { positionIndex: 3, lossUSD: 336 },
    ],
  },
  positions: demoPositions,
  bleedingPools: [
    {
      poolId: "0xdemo_pool_sui_usdt",
      protocol: "turbos",
      pair: "SUI/USDT",
      status: "bleeding" as const,
    },
    {
      poolId: "0xdemo_pool_btc_usdc",
      protocol: "cetus",
      pair: "BTC/USDC",
      status: "watch" as const,
    },
  ],
  insights: [
    {
      id: "demo-insight-1",
      type: "correlation_risk" as const,
      severity: "critical" as const,
      title: "87% exposed to SUI cluster",
      description:
        "4 of your 5 positions are secretly the same bet — if SUI drops 10%, you lose ~$1,840 across all of them at once.",
      affectedPositions: [0, 1, 2, 3],
    },
    {
      id: "demo-insight-2",
      type: "out_of_range" as const,
      severity: "warning" as const,
      title: "SUI/USDT out of range for 11 days",
      description:
        "Position #2 (Turbos SUI/USDT) has been out of range for 11 days — earning zero fees but still exposed to IL. Consider migrating to a closer range on Cetus.",
      affectedPositions: [1],
    },
    {
      id: "demo-insight-3",
      type: "dust_detected" as const,
      severity: "info" as const,
      title: "Dust position: BTC/USDC ($47)",
      description:
        "Position #5 is worth less than the gas cost to close. But it still adds IL exposure. Consider closing when gas is cheap.",
      affectedPositions: [4],
    },
  ],
  suggestedAllocation: {
    allocations: [
      { token: "SUI", currentPct: 87, targetPct: 40 },
      { token: "BTC", currentPct: 1, targetPct: 25 },
      { token: "USDC", currentPct: 8, targetPct: 25 },
      { token: "WETH", currentPct: 4, targetPct: 10 },
    ],
    expectedHealthRange: [58, 72] as [number, number],
    confidence: 0.72,
    riskOfWorsening: 0.15,
    assumptions: [
      "Based on 120-day rolling correlation of SUI, BTC, USDC, WETH",
      "DeepBook depth sufficient for rebalance at <2% slippage",
      "No major protocol exploits or depegs assumed",
    ],
  },
  source: "demo",
};

// ─── Pool Deep Dive (deep_diagnose_pool) ────────────────────────────────────

export const demoPoolDives: Record<string, any> = {
  "0xdemo_pool_sui_usdc": {
    poolId: "0xdemo_pool_sui_usdc",
    protocol: "cetus",
    pair: "SUI/USDC",
    status: "healthy",
    inRange: true,
    daysOutOfRange: 0,
    estImpermanentLossUSD: 48,
    contributionToClusterPct: 34.7,
    exitLiquidity: {
      depthUSD: 2_100_000,
      slippageBpsAt30pct: 8,
      feasible: true,
    },
    diagnosis: {
      health: "healthy",
      message:
        "Posisi LP masih berada dalam range dan menghasilkan fee dengan baik.",
      recommendation: "Hold posisi saat ini.",
    },
    source: "demo",
  },
  "0xdemo_pool_sui_usdt": {
    poolId: "0xdemo_pool_sui_usdt",
    protocol: "turbos",
    pair: "SUI/USDT",
    status: "bleeding",
    inRange: false,
    daysOutOfRange: 11,
    estImpermanentLossUSD: 112,
    contributionToClusterPct: 20.3,
    exitLiquidity: {
      depthUSD: 850_000,
      slippageBpsAt30pct: 12,
      feasible: true,
    },
    diagnosis: {
      health: "warning",
      message:
        "Harga SUI sudah keluar dari range LP selama 11 hari, sehingga posisi tidak lagi menghasilkan fee secara optimal.",
      recommendation:
        "Migrate ke range baru yang lebih dekat dengan harga saat ini.",
    },
    canMigrate: true,
    migrationTarget: {
      protocol: "cetus",
      poolName: "SUI/USDC",
      suggestedMinPrice: 3.2,
      suggestedMaxPrice: 3.7,
      estimatedApr: 21.7,
      reason:
        "Pool ini punya APR lebih tinggi dan range lebih dekat dengan harga pasar saat ini.",
    },
    source: "demo",
  },
  "0xdemo_pool_sui_weth": {
    poolId: "0xdemo_pool_sui_weth",
    protocol: "cetus",
    pair: "SUI/WETH",
    status: "healthy",
    inRange: true,
    daysOutOfRange: 0,
    estImpermanentLossUSD: 36,
    contributionToClusterPct: 26.6,
    exitLiquidity: {
      depthUSD: 1_400_000,
      slippageBpsAt30pct: 10,
      feasible: true,
    },
    source: "demo",
  },
  "0xdemo_pool_stsui_sui": {
    poolId: "0xdemo_pool_stsui_sui",
    protocol: "cetus",
    pair: "stSUI/SUI",
    status: "healthy",
    inRange: true,
    daysOutOfRange: 0,
    estImpermanentLossUSD: 12,
    contributionToClusterPct: 18.2,
    exitLiquidity: {
      depthUSD: 3_200_000,
      slippageBpsAt30pct: 4,
      feasible: true,
    },
    source: "demo",
  },
  "0xdemo_pool_btc_usdc": {
    poolId: "0xdemo_pool_btc_usdc",
    protocol: "cetus",
    pair: "BTC/USDC",
    status: "watch",
    inRange: true,
    daysOutOfRange: 0,
    estImpermanentLossUSD: 3,
    contributionToClusterPct: 0,
    exitLiquidity: {
      depthUSD: 5_600_000,
      slippageBpsAt30pct: 2,
      feasible: true,
    },
    diagnosis: {
      health: "info",
      message:
        "Posisi dust — nilainya ($47) lebih kecil dari gas untuk menutupnya.",
      recommendation: "Close saat gas murah.",
    },
    source: "demo",
  },
};

// ─── Simulate Shock (simulate_shock) ────────────────────────────────────────

export function demoShock(asset: string, pct: number) {
  const suiExposure = 87;
  const suiValue = totalValue * (suiExposure / 100);
  const impactFactor = asset.toUpperCase() === "SUI" ? 1.0 : 0.15;
  const atRiskUSD = Math.round(suiValue * Math.abs(pct / 100) * impactFactor);
  const moneySaved = Math.round(atRiskUSD * 0.65);
  const postHealth = Math.min(
    100,
    Math.max(10, demoPortfolioHealth.healthScore + (pct > 0 ? 8 : -12))
  );

  return {
    scenario: { asset: asset.toUpperCase(), pct },
    atRiskUSD,
    guarded: {
      moneySaved,
      postShockLossUSD: atRiskUSD - moneySaved,
      postHealth,
      formula: `(cluster_value_without_rebalance - portfolio_value_after_rebalance) at ${asset} ${pct > 0 ? "+" : ""}${pct}%`,
    },
    source: "demo",
  };
}

// ─── History (get_history) ───────────────────────────────────────────────────

export const demoHistory = {
  items: [
    {
      id: "demo-hist-1",
      type: "diagnosis",
      level: "portfolio",
      timestamp: new Date(Date.now() - 3600_000).toISOString(),
      summary:
        "Health 42/100, 87% SUI cluster — 4 of 5 positions correlated",
      moneySaved: undefined,
      txDigest: undefined,
    },
    {
      id: "demo-hist-2",
      type: "autonomous_save",
      level: "portfolio",
      timestamp: new Date(Date.now() - 7200_000).toISOString(),
      summary:
        "SUI dropped 4.2% — Guard rebalanced SUI cluster 87%→52% via DeepBook",
      moneySaved: 1195,
      txDigest: `DEMO_TX_${Date.now() - 7200_000}`,
    },
    {
      id: "demo-hist-3",
      type: "fix",
      level: "pool",
      timestamp: new Date(Date.now() - 86400_000).toISOString(),
      summary:
        "Migrated SUI/USDT from Turbos (out of range) to Cetus SUI/USDC",
      moneySaved: 82,
      txDigest: `DEMO_TX_${Date.now() - 86400_000}`,
    },
  ],
  source: "demo",
};

// ─── Guard Status (guard_status) ────────────────────────────────────────────

export const demoGuardStatus = {
  walletAddress: DEMO_WALLET,
  guardEnabled: true,
  thresholdPct: -5,
  lastCheckAt: new Date(Date.now() - 30_000).toISOString(),
  watching: true,
  clusterToken: "SUI",
  baselinePrices: { SUI: 3.42, BTC: 104500, USDC: 1.0, USDT: 1.0, WETH: 3850 },
  recentActivity: [
    {
      type: "autonomous_save",
      timestamp: new Date(Date.now() - 7200_000).toISOString(),
      summary:
        "SUI dropped 4.2% — rebalanced cluster 87%→52% via DeepBook",
      moneySaved: 1195,
      txDigest: `DEMO_TX_GUARD_${Date.now() - 7200_000}`,
    },
  ],
  source: "demo",
};
