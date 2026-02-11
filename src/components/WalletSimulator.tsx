import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fakeProvider, type FakeWalletState } from "@/simulation/fakeProvider";
import { Wallet, CircleDot, ImageIcon, Hash } from "lucide-react";

const WalletSimulator = () => {
  const [state, setState] = useState<FakeWalletState>(fakeProvider.getState());

  useEffect(() => {
    const unsub = fakeProvider.subscribe(setState);
    return () => { unsub(); };
  }, []);

  if (!state.connected || !state.profile) {
    return (
      <div className="rounded-lg border border-border bg-card p-4 text-center text-sm text-muted-foreground">
        <Wallet className="mx-auto h-8 w-8 mb-2 opacity-40" />
        No wallet connected
      </div>
    );
  }

  const { profile: p } = state;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card overflow-hidden"
    >
      <div className="border-b border-border bg-secondary/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
          <span className="text-sm font-semibold text-foreground">{p.label}</span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {p.address.slice(0, 6)}...{p.address.slice(-4)}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Balance */}
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Balance</div>
          <div className="text-2xl font-bold text-foreground">{p.balanceETH} ETH</div>
          <div className="text-sm text-muted-foreground">${p.balanceUSD.toLocaleString()}</div>
        </div>

        {/* Tokens */}
        {p.tokens.length > 0 && (
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
              <CircleDot className="h-3 w-3" /> Tokens
            </div>
            <div className="space-y-1">
              {p.tokens.map((t) => (
                <div key={t.symbol} className="flex justify-between text-sm">
                  <span className="font-mono text-foreground">{t.symbol}</span>
                  <span className="text-muted-foreground">{t.balance.toLocaleString()} (${t.usdValue.toLocaleString()})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NFTs */}
        {p.nfts.length > 0 && (
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
              <ImageIcon className="h-3 w-3" /> NFTs
            </div>
            <div className="space-y-1">
              {p.nfts.map((n) => (
                <div key={n.name} className="flex justify-between text-sm">
                  <span className="text-foreground">{n.name}</span>
                  <span className="text-muted-foreground">{n.collection}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tx count */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t border-border">
          <Hash className="h-3 w-3" />
          {p.transactionCount} transactions (simulated)
        </div>
      </div>
    </motion.div>
  );
};

export default WalletSimulator;
