import { 
  BreakdownData, 
  KeyDriverData, 
  PropensityData, 
  PortfolioUsageData, 
  IndustryData, 
  MerchantData, 
  ScalingData, 
  ChartData, 
  RecommendationType, 
  PortfolioType,
  TransactionTypeDefinition
} from '@/types';
import appDataJson from './appData.json';

// Type the JSON data for TypeScript
interface AppDataStructure {
  mastercard: {
    colors: Record<string, string>;
  };
  opportunityScores: Record<PortfolioType, {
    value: number;
    formattedValue: string;
    percentChange: number;
    perSegment: string;
  }>;
  transactionTypes: TransactionTypeDefinition[];
  accountBreakdown: BreakdownData;
  keyDrivers: KeyDriverData;
  propensityData: PropensityData[];
  portfolioUsage: PortfolioUsageData[];
  industryData: IndustryData[];
  merchantData: MerchantData[];
  scalingData: ScalingData[];
  charts: {
    pieChartData: ChartData[];
    barChartData: ChartData[];
    industryBarData: ChartData[];
    donutChartData: ChartData[];
    lineChartData: { month: string; value: number }[];
  };
  recommendations: RecommendationType[];
}

// Cast the imported JSON to our typed interface
const appData = appDataJson as unknown as AppDataStructure;

// Export the entire data object
export default appData;

// Export individual data sections for easier imports
export const MASTERCARD_COLORS = appData.mastercard.colors;
export const OPPORTUNITY_SCORES = appData.opportunityScores;
export const TRANSACTION_TYPES = appData.transactionTypes;
export const accountBreakdown = appData.accountBreakdown;
export const keyDrivers = appData.keyDrivers;
export const propensityData = appData.propensityData;
export const portfolioUsage = appData.portfolioUsage;
export const industryData = appData.industryData;
export const merchantData = appData.merchantData;
export const scalingData = appData.scalingData;
export const pieChartData = appData.charts.pieChartData;
export const barChartData = appData.charts.barChartData;
export const industryBarData = appData.charts.industryBarData;
export const donutChartData = appData.charts.donutChartData;
export const lineChartData = appData.charts.lineChartData;
export const recommendations = appData.recommendations;