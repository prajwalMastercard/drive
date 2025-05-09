import { createContext, useState, useContext, ReactNode } from 'react';
import { PortfolioType, SelectedRecommendation, TransactionType, CalculatedValueDetails, TransactionTypeDefinition } from '@/types';
import { TRANSACTION_TYPES } from '@/lib/constants';

// Duration in months for the calculator
export type DurationInMonths = 0 | 3 | 6 | 9 | 12;

interface PortfolioContextType {
  portfolioType: PortfolioType;
  setPortfolioType: (type: PortfolioType) => void;
  activeTab: 'recommendations' | 'calculator';
  setActiveTab: (tab: 'recommendations' | 'calculator') => void;
  selectedRecommendation: SelectedRecommendation;
  setSelectedRecommendation: (recommendation: SelectedRecommendation) => void;
  // Updated to support multiple selections
  selectedTransactionTypes: TransactionType[];
  toggleTransactionType: (type: TransactionType) => void;
  calculatedValue: CalculatedValueDetails | null;
  setCalculatedValue: (value: CalculatedValueDetails | null) => void;
  calculateValue: () => void;
  duration: DurationInMonths;
  setDuration: (months: DurationInMonths) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolioType, setPortfolioType] = useState<PortfolioType>('Credit');
  const [activeTab, setActiveTab] = useState<'recommendations' | 'calculator'>('recommendations');
  const [selectedRecommendation, setSelectedRecommendation] = useState<SelectedRecommendation>(null);
  // For backward compatibility
  const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionType | null>(null);
  // New state for multiple selections
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<TransactionType[]>([]);
  const [calculatedValue, setCalculatedValue] = useState<CalculatedValueDetails | null>(null);
  const [duration, setDuration] = useState<DurationInMonths>(12);
  
  // We're using the TransactionTypeDefinition type imported from @/types

  // Function to toggle a transaction type selection with parent-child relationships
  const toggleTransactionType = (type: TransactionType) => {
    // Find the current type in our transaction types data
    const typeData = TRANSACTION_TYPES.find((t: TransactionTypeDefinition) => t.value === type);
    
    if (!typeData) return;
    
    setSelectedTransactionTypes(prev => {
      // Start with a copy of the current selections
      let newSelections = [...prev];
      
      // Handle parent-child relationship logic
      if (typeData.isParent) {
        // If it's a parent type (e.g., Card Present or Card Not Present)
        if (prev.includes(type)) {
          // If parent is being unchecked, remove parent and all its children
          const childTypes = TRANSACTION_TYPES
            .filter((t: TransactionTypeDefinition) => t.parent === typeData.id)
            .map((t: TransactionTypeDefinition) => t.value as TransactionType);
          
          newSelections = newSelections.filter((t: TransactionType) => 
            t !== type && !childTypes.includes(t)
          );
        } else {
          // If parent is being checked, add parent and all its children
          newSelections.push(type);
          
          // Add all child types
          TRANSACTION_TYPES
            .filter((t: TransactionTypeDefinition) => t.parent === typeData.id)
            .forEach((child: TransactionTypeDefinition) => {
              if (!newSelections.includes(child.value as TransactionType)) {
                newSelections.push(child.value as TransactionType);
              }
            });
        }
      } else if (typeData.parent) {
        // It's a child type (e.g., ATM, POS, E-commerce, Recurring)
        const parentType = TRANSACTION_TYPES.find((t: TransactionTypeDefinition) => t.id === typeData.parent);
        
        if (!parentType) return prev;
        
        if (prev.includes(type)) {
          // If child is being unchecked
          newSelections = newSelections.filter((t: TransactionType) => t !== type);
          
          // Check if all siblings are unchecked, if so also uncheck the parent
          const siblings = TRANSACTION_TYPES
            .filter((t: TransactionTypeDefinition) => t.parent === typeData.parent)
            .map((t: TransactionTypeDefinition) => t.value as TransactionType);
          
          const anySiblingSelected = siblings.some((siblingType: TransactionType) => 
            siblingType !== type && newSelections.includes(siblingType)
          );
          
          if (!anySiblingSelected) {
            // If no siblings are selected, also uncheck the parent
            newSelections = newSelections.filter((t: TransactionType) => t !== parentType.value);
          }
        } else {
          // If child is being checked
          newSelections.push(type);
          
          // Also check the parent if not already checked
          if (!newSelections.includes(parentType.value as TransactionType)) {
            newSelections.push(parentType.value as TransactionType);
          }
        }
      }
      
      return newSelections;
    });
    
    // For backwards compatibility with existing code
    setSelectedTransactionType(type);
  };

  const calculateValue = () => {
    if (selectedTransactionTypes.length === 0 || duration === 0) return;
    
    // In a real application, this would make an API call
    // Here we're generating a consistent calculation based on the transaction type
    const baseValueMap: Record<TransactionType, number> = {
      'POS': 350000,
      'Card Present': 420000,
      'Card Not Present': 380000,
      'ATM': 290000,
      'E-commerce': 310000,
      'Recurring': 270000
    };
    
    const growthFactorMap: Record<TransactionType, number> = {
      'POS': 1.56,
      'Card Present': 1.45,
      'Card Not Present': 1.38,
      'ATM': 1.32,
      'E-commerce': 1.62,
      'Recurring': 1.72
    };
    
    // Calculate combined value from all selected transaction types
    let totalBaseValue = 0;
    let combinedGrowthFactor = 0;
    
    // Sum up values from all selected transaction types
    selectedTransactionTypes.forEach(type => {
      totalBaseValue += baseValueMap[type];
      combinedGrowthFactor += growthFactorMap[type];
    });
    
    // Average growth factor across selected types
    combinedGrowthFactor = combinedGrowthFactor / selectedTransactionTypes.length;
    
    // Apply a multiplier based on the selected duration
    const durationMultiplier = duration / 12;
    let calculatedValue = Math.round((totalBaseValue / 1000) * 20 * durationMultiplier);
    
    // Adjust percent change based on duration
    const percentChange = duration === 12 ? 7.5 : 7.5 * durationMultiplier;
    
    // Display the primary selected transaction type (for backwards compatibility)
    // In a real app, we might want to show "Multiple types" or list all selected types
    const primaryType = selectedTransactionTypes[0];
    
    setCalculatedValue({
      transactionType: primaryType,
      calculationPeriod: `${duration} Months`,
      baseValue: totalBaseValue * durationMultiplier,
      growthFactor: parseFloat(combinedGrowthFactor.toFixed(2)),
      value: calculatedValue,
      percentChange: parseFloat(percentChange.toFixed(1)),
      formattedValue: `$${calculatedValue.toLocaleString()}`
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioType,
        setPortfolioType,
        activeTab,
        setActiveTab,
        selectedRecommendation,
        setSelectedRecommendation,
        selectedTransactionTypes,
        toggleTransactionType,
        calculatedValue,
        setCalculatedValue,
        calculateValue,
        duration,
        setDuration
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
