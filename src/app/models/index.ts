// Authentication
export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt: Date;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Portfolio
export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  holdings: Holding[];
  totalCost: number;
  currentValue: number;
  unrealizedProfit: number;
  realizedProfit: number;
  roi: number;
}

export interface Holding {
  id: string;
  portfolioId: string;
  symbol: string;
  companyName: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  profit: number;
  returnPercentage: number;
}

// Transaction
export type TransactionType = 'BUY' | 'SELL' | 'DIVIDEND' | 'STOCK_SPLIT';

export interface Transaction {
  id: string;
  portfolioId: string;
  symbol: string;
  type: TransactionType;
  date: Date;
  quantity: number;
  price: number;
  fee?: number;
  totalValue: number;
  notes?: string;
}

// Market
export interface Stock {
  symbol: string;
  companyName: string;
  industry?: string;
  currentPrice: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  marketCap?: number;
  changePercent: number;
  lastUpdate: Date;
}

export interface StockDetail extends Stock {
  revenue?: number;
  profit?: number;
  eps?: number;
  roe?: number;
  roa?: number;
  pe?: number;
}

export interface OHLCData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Watchlist
export interface Watchlist {
  id: string;
  userId: string;
  name: string;
  symbols: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard
export interface DashboardMetrics {
  totalPortfolioValue: number;
  totalProfit: number;
  dailyProfit: number;
  totalInvestedCapital: number;
  cashBalance: number;
  roi: number;
  dayChangePercent: number;
}

export interface TopStock {
  symbol: string;
  companyName: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  profit: number;
  returnPercentage: number;
}

// Chart Data
export interface ChartData {
  timestamp: number | string;
  value: number;
  label?: string;
}

export interface PieChartData {
  name: string;
  value: number;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: Date;
}

// Benchmark
export interface Benchmark {
  name: string;
  symbol: string;
  currentValue: number;
  change: number;
  changePercent: number;
}

export interface BenchmarkComparison {
  portfolioReturn: number;
  benchmarks: Benchmark[];
}

// Report
export type ReportPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type ReportFormat = 'PDF' | 'EXCEL';

export interface Report {
  id: string;
  portfolioId: string;
  period: ReportPeriod;
  startDate: Date;
  endDate: Date;
  totalValue: number;
  totalProfit: number;
  roi: number;
  createdAt: Date;
}
