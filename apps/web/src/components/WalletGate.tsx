import type { ReactNode } from "react";
import { useCurrentAccount, useCurrentWallet, useDAppKit, useWallets } from "@mysten/dapp-kit-react";

function normalize(addr: string): string {
  const hex = addr.toLowerCase().replace(/^0x/, "");
  return "0x" + hex.padStart(64, "0");
}

export function WalletGate({
  expected,
  children,
}: {
  expected: string;
  children: ReactNode;
}) {
  const account = useCurrentAccount();
  const currentWallet = useCurrentWallet();
  const wallets = useWallets();
  const dAppKit = useDAppKit();

  if (!account) {
    return (
      <section className="product-auth product-grid-paper">
        <div className="product-auth-panel">
          <span className="product-kicker product-kicker-badge">Web3 authentication</span>
          <h2>Connect The Linked Wallet To Continue.</h2>
          <p>This page is bound to <b>{expected.slice(0, 10)}…{expected.slice(-6)}</b>. Connect that exact wallet to inspect diagnosis details or continue protected actions.</p>
          <div className="product-auth-actions">
            {wallets.length === 0 ? (
              <span className="wallet-chip">No Sui wallet detected — install Slush first.</span>
            ) : (
              wallets.map((w) => (
                <button key={w.name} className="product-primary" onClick={() => void dAppKit.connectWallet({ wallet: w })}>
                  Connect {w.name}
                </button>
              ))
            )}
          </div>
        </div>
      </section>
    );
  }

  const connected = normalize(account.address);
  const target = normalize(expected);

  if (connected !== target) {
    // If the expected wallet is already authorized, the user can switch to it in
    // one click — no disconnect/reconnect dance needed.
    const match = currentWallet?.accounts?.find((a) => normalize(a.address) === target);
    return (
      <section className="product-auth product-grid-paper">
        <div className="product-auth-panel mismatch">
          <span className="product-kicker product-kicker-badge">Wallet mismatch</span>
          <h2>Connected Wallet Does Not Match This Diagnosis Link.</h2>
          <p>
            Connected: <b>{account.address.slice(0, 10)}…{account.address.slice(-6)}</b>
          </p>
          <p>
            Expected: <b>{expected.slice(0, 10)}…{expected.slice(-6)}</b>
          </p>
          <p>
            {match
              ? "The expected account is authorized in your wallet — switch to it below."
              : "That account isn't shared with this site. Disconnect, then reconnect and authorize the expected account in your wallet."}
          </p>
          <div className="product-auth-actions">
            {match && (
              <button className="product-primary" onClick={() => dAppKit.switchAccount({ account: match })}>
                Switch to this account
              </button>
            )}
            <button className="product-outline" onClick={() => dAppKit.disconnectWallet()}>
              Disconnect
            </button>
          </div>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
