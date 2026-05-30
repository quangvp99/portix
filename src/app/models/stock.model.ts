export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  currentPrice: number;
  previousClose: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  marketCap: number;
  pe: number;
  pb: number;
  eps: number;
  dividendYield: number;
  change: number;
  changePercent: number;
}

export interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockHolding {
  symbol: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  weight: number;
}

export interface Portfolio {
  id: string;
  name: string;
  investedCapital: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
  holdings: StockHolding[];
  createdAt: Date;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  date: Date;
  notes?: string;
}
