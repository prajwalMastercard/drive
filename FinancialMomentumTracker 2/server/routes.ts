import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for the Momentum Value Calculator
  app.get('/api/portfolio/:type', (req, res) => {
    const portfolioType = req.params.type;
    if (portfolioType !== 'Credit' && portfolioType !== 'Debit') {
      return res.status(400).json({ error: 'Invalid portfolio type. Must be "Credit" or "Debit"' });
    }
    
    const opportunityScore = portfolioType === 'Credit' 
      ? { value: 1000000, formattedValue: '$1M', percentChange: 7.2, perSegment: '100K' }
      : { value: 750000, formattedValue: '$750K', percentChange: 4.5, perSegment: '75K' };
    
    res.json({ opportunityScore });
  });
  
  app.get('/api/recommendations/:portfolioType', (req, res) => {
    const portfolioType = req.params.portfolioType;
    if (portfolioType !== 'Credit' && portfolioType !== 'Debit') {
      return res.status(400).json({ error: 'Invalid portfolio type. Must be "Credit" or "Debit"' });
    }
    
    // Return filtered recommendations based on portfolio type
    // In a real app, this would fetch from a database
    const recommendations = getRecommendationsByType(portfolioType);
    res.json({ recommendations });
  });
  
  app.post('/api/calculate', (req, res) => {
    const { recommendationId, transactionType, portfolioType } = req.body;
    
    if (!recommendationId || !transactionType || !portfolioType) {
      return res.status(400).json({ 
        error: 'Missing required parameters: recommendationId, transactionType, portfolioType' 
      });
    }
    
    // In a real app, this would perform an actual calculation based on the parameters
    // For demo purposes, we're returning a simulated result
    const calculatedValue = calculateValue(recommendationId, transactionType, portfolioType);
    res.json({ calculatedValue });
  });
  
  const httpServer = createServer(app);

  return httpServer;
}

// Helper functions for the routes

function getRecommendationsByType(portfolioType: string) {
  const recommendations = [
    {
      id: 'rec-1',
      title: 'Target high-volume, high-spending users with promotional cashback',
      value: 3225000,
      formattedValue: '$3,225,000',
      description: 'Estimated opportunity value',
      portfolioType: 'Credit',
      actions: [
        'Identify high-frequency and high-spend customers in top performing merchant clusters',
        'Create targeted 2% cashback offers for specific merchant categories',
        'Focus on card present transactions to maintain interchange fees',
        'Deploy as a limited-time offer with specific expiration date'
      ],
      color: '#EB001B'
    },
    {
      id: 'rec-2',
      title: 'Increase activation for dormant card members',
      value: 2580000,
      formattedValue: '$2,580,000',
      description: 'Estimated opportunity value',
      portfolioType: 'Credit',
      actions: [
        'Identify cards with no activity in the last 60-90 days',
        'Create first-purchase incentive campaign based on spending patterns pre-dormancy',
        'Target top merchant categories from previous activity',
        'Implement a tiered bonus structure that rewards continued usage'
      ],
      color: '#FF5F00'
    },
    {
      id: 'rec-5',
      title: 'Increase debit card usage through merchant-specific offers',
      value: 1850000,
      formattedValue: '$1,850,000',
      description: 'Estimated opportunity value',
      portfolioType: 'Debit',
      actions: [
        'Target top merchants by transaction volume',
        'Develop cash-back incentives for frequent debit card usage',
        'Create limited-time exclusive merchant partnerships',
        'Focus on everyday purchases like groceries and gas'
      ],
      color: '#EB001B'
    },
    {
      id: 'rec-6',
      title: 'Promote contactless payment adoption',
      value: 1420000,
      formattedValue: '$1,420,000',
      description: 'Estimated opportunity value',
      portfolioType: 'Debit',
      actions: [
        'Identify customers who haven\'t used contactless features',
        'Create educational content about contactless payment security',
        'Offer incentives for first contactless transaction',
        'Partner with merchants to promote tap-to-pay at checkout'
      ],
      color: '#FF5F00'
    }
  ];
  
  return recommendations.filter(rec => rec.portfolioType === portfolioType);
}

function calculateValue(recommendationId: string, transactionType: string, portfolioType: string) {
  // Map of base values by transaction type
  const baseValueMap: Record<string, number> = {
    'POS': 350000,
    'Card Present': 420000,
    'Card Not Present': 380000,
    'ATM': 290000,
    'E-commerce': 310000,
    'Recurring': 270000
  };
    
  const growthFactorMap: Record<string, number> = {
    'POS': 1.56,
    'Card Present': 1.45,
    'Card Not Present': 1.38,
    'ATM': 1.32,
    'E-commerce': 1.62,
    'Recurring': 1.72
  };
  
  // Apply portfolio type modifier
  const portfolioModifier = portfolioType === 'Credit' ? 1.0 : 0.85;
  
  const baseValue = (baseValueMap[transactionType] || 300000) * portfolioModifier;
  const growthFactor = growthFactorMap[transactionType] || 1.5;
  
  // Calculate value
  const calculatedValue = Math.round(baseValue / 1000) * 20;
  
  return {
    transactionType,
    calculationPeriod: '12 Months',
    baseValue,
    growthFactor,
    value: calculatedValue,
    percentChange: 7.5,
    formattedValue: `$${calculatedValue.toLocaleString()}`
  };
}
