export interface WalletProfile {
  id: string;
  label: string;
  address: string;
  balanceETH: number;
  balanceUSD: number;
  tokens: { symbol: string; balance: number; usdValue: number }[];
  nfts: { name: string; collection: string; imageUrl?: string }[];
  transactionCount: number;
}

export const WALLET_PROFILES: Record<string, WalletProfile> = {
  empty: {
    id: "empty",
    label: "Empty Wallet",
    address: "xxxxxx35Cc6634C0532925a3b844Bc9e7595f2bD11",
    balanceETH: 0,
    balanceUSD: 0,
    tokens: [],
    nfts: [],
    transactionCount: 0,
  },
};

export function getWalletProfile(id: string): WalletProfile {
  return WALLET_PROFILES[id] ?? WALLET_PROFILES.empty;
}
