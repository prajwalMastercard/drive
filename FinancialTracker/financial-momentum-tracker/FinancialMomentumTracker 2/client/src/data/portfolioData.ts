import { BreakdownData, KeyDriverData, PropensityData, IndustryData, MerchantData, PortfolioUsageData, ScalingData } from '@/types';

export const accountBreakdown: BreakdownData = {
  cardPresent: {
    name: 'E-Card Present (CP)',
    active: 35,
    lapsed: 65,
    total: 34200000
  },
  cardNotPresent: {
    name: 'E-Card Not Present (CNP)',
    active: 45,
    lapsed: 55,
    total: 49100000
  }
};

export const keyDrivers: KeyDriverData = {
  category: 'Merchant Distribution',
  distribution: [
    { name: 'POS', value: 35, color: '#EB001B' },
    { name: 'E-Commerce', value: 25, color: '#2196F3' },
    { name: 'ATM', value: 20, color: '#4CAF50' },
    { name: 'Recurring', value: 10, color: '#FF5F00' },
    { name: 'Others', value: 10, color: '#9E9E9E' }
  ]
};

export const propensityData: PropensityData[] = [
  { type: 'Card Present', transactions: 45234, value: 640670, opportunity: 12500, percent: 60 },
  { type: 'Card Not Present', transactions: 32157, value: 582290, opportunity: 7500, percent: 40 },
  { type: 'Total', transactions: 77391, value: 1222960, opportunity: 20000, percent: 100 }
];

export const portfolioUsage: PortfolioUsageData[] = [
  { channel: 'ATM', percent: 75 },
  { channel: 'POS', percent: 45.5 },
  { channel: 'ECOM', percent: 30.2 },
  { channel: 'Recurring', percent: 15.6 }
];

export const industryData: IndustryData[] = [
  { industry: 'Retail', value: 320430, opportunity: 8500, percent: 100 },
  { industry: 'Groceries', value: 240570, opportunity: 5500, percent: 75 },
  { industry: 'Travel', value: 150440, opportunity: 4300, percent: 45 },
  { industry: 'Other', value: 211520, opportunity: 1700, percent: 65 }
];

export const merchantData: MerchantData[] = [
  { merchant: 'SuperMart', value: 129780, opportunity: 5700, percent: 35, color: '#EB001B' },
  { merchant: 'QuickMart', value: 105430, opportunity: 4900, percent: 25, color: '#FF5F00' },
  { merchant: 'Convenience', value: 87430, opportunity: 3600, percent: 20, color: '#2196F3' },
  { merchant: 'Others', value: 70000, opportunity: 1800, percent: 20, color: '#9E9E9E' }
];

export const scalingData: ScalingData[] = [
  { month: 'Month 1', value: 5000 },
  { month: 'Month 2', value: 7500 },
  { month: 'Month 3', value: 10000 },
  { month: 'Month 4', value: 12500 },
  { month: 'Month 5', value: 15000 },
  { month: 'Month 6', value: 20000 }
];
