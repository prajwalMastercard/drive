import { PortfolioType } from '@/types';

export const MASTERCARD_COLORS = {
  red: '#EB001B',
  orange: '#FF5F00',
  dark: '#333333',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  blue: '#2196F3',
  green: '#4CAF50',
  purple: '#9C27B0',
  gray: '#9E9E9E',
};

export const OPPORTUNITY_SCORES: Record<PortfolioType, { // Renamed from Opportunity Score to Opportunity Size in the UI
  value: number;
  formattedValue: string;
  percentChange: number;
  perSegment: string;
}> = {
  Credit: {
    value: 1000000,
    formattedValue: '$1M',
    percentChange: 16.5, // Used in UI but hidden per request
    perSegment: '100K'
  },
  Debit: {
    value: 750000,
    formattedValue: '$750K',
    percentChange: 14.2, // Used in UI but hidden per request
    perSegment: '75K'
  }
};

// Organized hierarchically for better UI representation
export const TRANSACTION_TYPES = [
  {
    id: 'card-present',
    title: 'Card Present (CP)',
    description: 'In-person/physical transactions at physical locations',
    value: 'Card Present',
    isParent: true,
    children: ['atm', 'pos']
  },
  {
    id: 'card-not-present',
    title: 'Card Not Present (CNP)',
    description: 'Remote transactions without physical card use',
    value: 'Card Not Present',
    isParent: true,
    children: ['ecommerce', 'recurring']
  },
  {
    id: 'atm',
    title: 'ATM',
    description: 'Cash withdrawals and deposits at ATMs',
    value: 'ATM',
    parent: 'card-present'
  },
  {
    id: 'pos',
    title: 'POS',
    description: 'Point of sale terminal transactions',
    value: 'POS',
    parent: 'card-present'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Online shopping and digital transactions',
    value: 'E-commerce',
    parent: 'card-not-present'
  },
  {
    id: 'recurring',
    title: 'Recurring',
    description: 'Scheduled repeat payments and subscriptions',
    value: 'Recurring',
    parent: 'card-not-present'
  }
];
