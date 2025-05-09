import { RecommendationType } from '@/types';

export const recommendations: RecommendationType[] = [
  {
    id: 'rec-1',
    title: 'Target high-volume, high-spending users with consistent patterns',
    value: 320000,
    formattedValue: '$320,000',
    description: 'opportunity value',
    portfolioType: 'Credit',
    percentChange: 16,
    actions: [
      'Flag recurring spending above a certain threshold (e.g., $125 monthly) across multiple categories like Groceries, Office supplies, Fuel',
      'Monitor transaction modes and usage frequency (POS, ATM, E-commerce)',
      'Target POS-heavy users with recurring transactions in groceries, office supplies, fuel',
      'Focus on E-commerce users who spend on office supplies or bulk purchases'
    ],
    color: '#E62621',
    gradientColor: '#FF5A4E',
    borderColor: 'border-[#E62621]'
  },
  {
    id: 'rec-2',
    title: 'Increase activation for dormant card members',
    value: 280000,
    formattedValue: '$280,000',
    description: 'opportunity value',
    portfolioType: 'Credit',
    percentChange: 15,
    actions: [
      'Identify cards with minimal or no usage over 60-day periods',
      'Create tiered incentive campaigns based on spending potential',
      'Target with category-specific cashback offers for first transactions',
      'Implement automated activation reminders with escalating benefits'
    ],
    color: '#E65C21',
    gradientColor: '#FF914E',
    borderColor: 'border-[#E65C21]'
  },
  {
    id: 'rec-3',
    title: 'Expand recurring payment enrollment',
    value: 400000,
    formattedValue: '$400,000',
    description: 'opportunity value',
    portfolioType: 'Credit',
    percentChange: 22,
    actions: [
      'Identify users with periodic identical payments but not using recurring setup',
      'Analyze subscription economy spending patterns across demographic segments',
      'Target subscription-heavy users with incentives for additional recurring setups',
      'Create educational campaign about benefits of automated payments'
    ],
    color: '#E62170',
    gradientColor: '#FF4E9E',
    borderColor: 'border-[#E62170]'
  },
  {
    id: 'rec-4',
    title: 'Enhance cross-border transaction volume',
    value: 215000,
    formattedValue: '$215,000',
    description: 'opportunity value',
    portfolioType: 'Credit',
    percentChange: 19,
    actions: [
      'Identify cardholders with international travel history',
      'Create targeted international transaction fee waiver campaign',
      'Develop merchant partnerships in popular tourist destinations',
      'Implement real-time currency conversion alerts for transparency'
    ],
    color: '#3C21E6',
    gradientColor: '#694EFF',
    borderColor: 'border-[#3C21E6]'
  },
  {
    id: 'rec-5',
    title: 'Increase debit card usage through merchant-specific offers',
    value: 225000,
    formattedValue: '$225,000',
    description: 'opportunity value',
    portfolioType: 'Debit',
    percentChange: 18,
    actions: [
      'Target top merchants by transaction volume',
      'Develop limited-time exclusive merchant partnerships',
      'Create cash-back incentives for frequent debit card usage',
      'Focus on everyday purchases like groceries and gas'
    ],
    color: '#E62621',
    gradientColor: '#FF5A4E',
    borderColor: 'border-[#E62621]'
  },
  {
    id: 'rec-6',
    title: 'Promote contactless payment adoption',
    value: 185000,
    formattedValue: '$185,000',
    description: 'opportunity value',
    portfolioType: 'Debit',
    percentChange: 14,
    actions: [
      'Identify customers who haven\'t used contactless features',
      'Create educational content about contactless payment security',
      'Offer incentives for first contactless transaction',
      'Partner with merchants to promote tap-to-pay at checkout'
    ],
    color: '#E65C21',
    gradientColor: '#FF914E',
    borderColor: 'border-[#E65C21]'
  },
  {
    id: 'rec-7',
    title: 'Drive online debit card usage',
    value: 260000,
    formattedValue: '$260,000',
    description: 'opportunity value',
    portfolioType: 'Debit',
    percentChange: 17,
    actions: [
      'Target customers who primarily use debit in-person only',
      'Create e-commerce specific rewards for debit transactions',
      'Address security concerns with enhanced fraud protection messaging',
      'Develop partnerships with popular online retailers'
    ],
    color: '#0072CE',
    gradientColor: '#2B9DFF',
    borderColor: 'border-[#0072CE]'
  },
  {
    id: 'rec-8',
    title: 'Increase automated bill payment penetration',
    value: 195000,
    formattedValue: '$195,000',
    description: 'opportunity value',
    portfolioType: 'Debit',
    percentChange: 16,
    actions: [
      'Identify customers paying bills manually',
      'Offer simplified bill payment setup through mobile app',
      'Promote automatic payments for utilities and subscriptions',
      'Provide incentives for setting up multiple automatic payments'
    ],
    color: '#21B866',
    gradientColor: '#4EE993',
    borderColor: 'border-[#21B866]'
  }
];
