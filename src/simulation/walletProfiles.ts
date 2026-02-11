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
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD11",
    balanceETH: 0,
    balanceUSD: 0,
    tokens: [],
    nfts: [],
    transactionCount: 0,
  },
  low: {
    id: "low",
    label: "Low Balance",
    address: "0x8Ba1f109551bD432803012645Ac136ddd64DBA72",
    balanceETH: 0.023,
    balanceUSD: 42.18,
    tokens: [
      { symbol: "USDC", balance: 12.5, usdValue: 12.5 },
      { symbol: "LINK", balance: 3.2, usdValue: 22.4 },
    ],
    nfts: [],
    transactionCount: 14,
  },
  high: {
    id: "high",
    label: "High Balance",
    address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    balanceETH: 42.69,
    balanceUSD: 78_231.42,
    tokens: [
      { symbol: "USDC", balance: 25_000, usdValue: 25_000 },
      { symbol: "WBTC", balance: 1.2, usdValue: 36_480 },
      { symbol: "UNI", balance: 1_500, usdValue: 10_500 },
      { symbol: "AAVE", balance: 45, usdValue: 4_050 },
    ],
    nfts: [],
    transactionCount: 312,
  },
  nftHeavy: {
    id: "nftHeavy",
    label: "NFT-Heavy Wallet",
    address: "0x1234567890AbCdEf1234567890aBcDeF12345678",
    balanceETH: 5.8,
    balanceUSD: 10_628.4,
    tokens: [
      { symbol: "APE", balance: 200, usdValue: 240 },
    ],
    nfts: [
      { name: "CyberApe #4281", collection: "CyberApes" },
      { name: "PixelPunk #901", collection: "PixelPunks" },
      { name: "MetaLand Plot #12", collection: "MetaLand" },
      { name: "ArtBlock #7744", collection: "ArtBlocks" },
      { name: "Doodle #3322", collection: "Doodles" },
    ],
    transactionCount: 89,
  },
};

export function getWalletProfile(id: string): WalletProfile {
  return WALLET_PROFILES[id] ?? WALLET_PROFILES.empty;
}
