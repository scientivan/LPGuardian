# Luber — testnet deployment

**Package:** `0xf5b23056a2cf66df0798ff4b97c8e57b7435e3d29a2166b3017cd933fe0c123f` — [explorer](https://suiscan.xyz/testnet/object/0xf5b23056a2cf66df0798ff4b97c8e57b7435e3d29a2166b3017cd933fe0c123f)

**Network:** testnet · **Owner/deployer:** `0x45fab11f7f5d870e5ee01c7536e0289059d80d18060e79839ef8f2bc3e0b2bb5`

> Demo caps are authorized to the OWNER address for seeding. BE Agent: call `authorize_strategist`
> with the real watcher address (optionally `revoke_cap` first) to hand control to the agent.

## Demo portfolios

| Label | Health | Risk | Positions | Portfolio | HealthReport |
|---|---|---|---|---|---|
| Demo1-Amber | 42 | amber | 5 | [0x44360d29…](https://suiscan.xyz/testnet/object/0x44360d29f5f5d1449fd79e3506305dec83b1780060574a7d69495485dd62cef6) | [0x88159ffa…](https://suiscan.xyz/testnet/object/0x88159ffa0f151c57effc7beaf67facacbaacbc895771806c1ed5e06e3e2951a4) |
| Demo2-Red | 35 | red | 8 | [0xac06b1e3…](https://suiscan.xyz/testnet/object/0xac06b1e379006889a894802407105c065adf1e60c23509257898e131ecc4c4e1) | [0x7e56402c…](https://suiscan.xyz/testnet/object/0x7e56402cf97d3b675640a2bd7c31e0f157bbcfeaaffbf1e81fbe080b6f4415a8) |
| Demo3-Green | 65 | green | 3 | [0x0677f941…](https://suiscan.xyz/testnet/object/0x0677f941a26ca8906b290fdb1a74d3509e838b9cf2608b41517e5ae1eebb5ae1) | [0x77132659…](https://suiscan.xyz/testnet/object/0x771326599e42eb66c5c3228eba004420b3dc27fde32ee780a032c0b28336bef4) |

## Move entry points

`create_portfolio`, `deposit`, `add_position`, `authorize_strategist`, `rebalance`, `withdraw`, `revoke_cap`, `mint_health_report`, `register_deepbook_pool` + getters.
