export type PortfolioType = 'Credit' | 'Debit';

export type RecommendationType = {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  description: string;
  portfolioType: PortfolioType;
  actions: string[];
  color: string;
  gradientColor: string;
  borderColor: string;
  percentChange: number;
};

export type OpportunityScore = { // Displayed as "Opportunity Size" in the UI
  value: number;
  formattedValue: string;
  percentChange: number;
  perSegment: string;
};

export type ChartData = {
  name: string;
  value: number;
  percent?: number;
  color?: string;
};

export type BarChartData = {
  name: string;
  value: number;
  percent?: number;
  color?: string;
};

export type LineChartData = {
  name: string;
  value: number;
};

export type StackedBarData = {
  name: string;
  active: number;
  lapsed: number;
  total: number;
};

export type BreakdownData = {
  cardPresent: StackedBarData;
  cardNotPresent: StackedBarData;
};

export type KeyDriverData = {
  category: string;
  distribution: ChartData[];
};

// Transaction Types
export type TransactionType = 'Card Present' | 'Card Not Present' | 'ATM' | 'POS' | 'E-commerce' | 'Recurring';

// Transaction Type Definition (for use with constants)
export interface TransactionTypeDefinition {
  id: string;
  title: string;
  description: string;
  value: string;
  isParent?: boolean;
  children?: string[];
  parent?: string;
}

export type PropensityData = {
  type: string;
  transactions: number;
  value: number;
  opportunity: number;
  percent?: number;
};

export type IndustryData = {
  industry: string;
  value: number;
  opportunity: number;
  percent?: number;
};

export type MerchantData = {
  merchant: string;
  value: number;
  opportunity: number;
  percent?: number;
  color: string;
};

export type PortfolioUsageData = {
  channel: string;
  percent: number;
};

export type ScalingData = {
  month: string;
  value: number;
};

export type CalculatedValueDetails = {
  transactionType: TransactionType;
  calculationPeriod: string;
  baseValue: number;
  growthFactor: number;
  value: number;
  percentChange: number;
  formattedValue: string;
};

export type SelectedRecommendation = {
  id: string;
  title: string;
} | null;
