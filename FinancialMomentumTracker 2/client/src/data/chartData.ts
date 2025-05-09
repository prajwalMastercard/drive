import { ChartData } from '@/types';

export const pieChartData: ChartData[] = [
  { name: 'Card Present', value: 45234, percent: 60, color: '#EB001B' },
  { name: 'Card Not Present', value: 32157, percent: 40, color: '#FF5F00' }
];

export const barChartData: ChartData[] = [
  { name: 'ATM', value: 75, color: '#FF5F00' },
  { name: 'POS', value: 45.5, color: '#FF5F00' },
  { name: 'ECOM', value: 30.2, color: '#FF5F00' },
  { name: 'Recurring', value: 15.6, color: '#FF5F00' }
];

export const industryBarData: ChartData[] = [
  { name: 'Retail', value: 320430, percent: 100, color: '#EB001B' },
  { name: 'Groceries', value: 240570, percent: 75, color: '#EB001B' },
  { name: 'Travel', value: 150440, percent: 45, color: '#EB001B' },
  { name: 'Other', value: 211520, percent: 65, color: '#EB001B' }
];

export const donutChartData: ChartData[] = [
  { name: 'SuperMart', value: 129780, percent: 35, color: '#EB001B' },
  { name: 'QuickMart', value: 105430, percent: 25, color: '#FF5F00' },
  { name: 'Convenience', value: 87430, percent: 20, color: '#2196F3' },
  { name: 'Others', value: 70000, percent: 20, color: '#9E9E9E' }
];

export const lineChartData = [
  { month: 'Month 1', value: 5000 },
  { month: 'Month 2', value: 7500 },
  { month: 'Month 3', value: 10000 },
  { month: 'Month 4', value: 12500 },
  { month: 'Month 5', value: 15000 },
  { month: 'Month 6', value: 20000 }
];
