export interface Token {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  balanceUsd: number;
  priceUsd: number;
  change24h: number;
  icon: string;
  network: string;
}

export interface NFTItem {
  id: string;
  name: string;
  collection: string;
  tokenId: string;
  floorPrice: string;
  image: string;
  network: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'bridge';
  title: string;
  description: string;
  timestamp: string;
  amount: string;
  status: 'confirmed' | 'pending' | 'failed';
  txHash: string;
  network: string;
}

export interface Network {
  id: string;
  name: string;
  symbol: string;
  chainId: number;
  icon: string;
  color: string;
  explorerUrl: string;
  isTestnet?: boolean;
}

export interface ProviderQuote {
  id: string;
  name: string;
  logo: string;
  cryptoAmount: string;
  fiatAmount: string;
  rate: string;
  fee: string;
  eta: string;
  isBestRate?: boolean;
}

export interface PredictionMarket {
  id: string;
  question: string;
  category: 'Crypto' | 'Politics' | 'Tech & AI' | 'Macro' | 'Sports';
  yesPrice: number; // e.g. 0.64 ($0.64 per share)
  noPrice: number; // e.g. 0.36 ($0.36 per share)
  yesPercent: number; // 64%
  noPercent: number; // 36%
  volume24h: string; // "$4.2M"
  totalLiquidity: string;
  endDate: string;
  oracle: string;
  icon: string;
}

export interface UserPosition {
  id: string;
  marketId: string;
  question: string;
  outcome: 'YES' | 'NO';
  shares: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalCost: number;
  currentValue: number;
  pnlUsd: number;
  pnlPercent: number;
}

