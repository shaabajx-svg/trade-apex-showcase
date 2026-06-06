export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  history: { time: string; price: number }[];
}

export interface Holding {
  assetId: string;
  symbol: string;
  amount: number;
  avgPrice: number;
}

export interface Transaction {
  id: string;
  assetId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  timestamp: number;
}

export interface TradingState {
  balance: number;
  holdings: Holding[];
  history: Transaction[];
}
