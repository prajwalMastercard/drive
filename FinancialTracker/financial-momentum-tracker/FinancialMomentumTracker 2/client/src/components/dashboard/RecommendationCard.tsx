import { useState } from 'react';
import { RecommendationType } from '@/types';
import { usePortfolio } from '@/context/PortfolioContext';
import { exportRecommendationInsights } from '@/utils/pptExport';

type RecommendationCardProps = {
  recommendation: RecommendationType;
};

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const { setSelectedRecommendation, setActiveTab } = usePortfolio();
  
  const handleCalculateValue = () => {
    setSelectedRecommendation({
      id: recommendation.id,
      title: recommendation.title
    });
    setActiveTab('calculator');
  };
  
  const [insightsLoading, setInsightsLoading] = useState<boolean>(false);
  
  const handleInsightsClick = async () => {
    try {
      setInsightsLoading(true);
      
      // Download the Recommendations Insights.pptx directly
      const result = await exportRecommendationInsights({
        recommendation,
        templatePath: '/attached_assets/Recommendations Insights.pptx'
      });
      
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
      
      // Also display insights in the console for debugging
      const insights = {
        title: recommendation.title,
        value: recommendation.formattedValue,
        percentChange: recommendation.percentChange,
        actions: recommendation.actions,
        details: [
          `Industry impact: High opportunity in ${recommendation.portfolioType} space`,
          `Potential annual revenue: ${recommendation.formattedValue}`,
          `Growth rate: ${recommendation.percentChange}% year over year`,
          `Implementation complexity: Medium`,
          `Time to market: 3-6 months`
        ]
      };
      
      console.log('Recommendation Insights:', insights);
    } catch (error) {
      console.error("Error generating insights:", error);
      alert("There was an error generating insights. Please try again later.");
    } finally {
      setInsightsLoading(false);
    }
  };
  
  // Format growth percentage with + sign and color
  const growthDisplay = recommendation.percentChange > 0 
    ? `+${recommendation.percentChange}%` 
    : `${recommendation.percentChange}%`;
  
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
      {/* Top header with type - always orange */}
      <div 
        className="py-2 px-3 flex items-center justify-between"
        style={{ 
          backgroundColor: '#FF5F00'
        }}
      >
        {/* Left side: Sales Recommendation text */}
        <div className="flex items-center">
          <span className="text-xs font-bold text-white">Sales Recommendation</span>
        </div>
        
        {/* Right side: Portfolio Type (Credit/Debit) */}
        <div className="flex items-center">
          <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center mr-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            </svg>
          </div>
          <span className="text-xs font-medium text-white">{recommendation.portfolioType}</span>
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-5">
        <h3 className="font-medium text-gray-800 text-base mb-2">{recommendation.title}</h3>
        <div className="text-gray-900 text-2xl font-bold mb-4">
          {recommendation.formattedValue} <span className="text-xs text-gray-500 font-normal ml-1">opportunity value</span>
        </div>
        
        <div className="mb-4">
          <h4 className="uppercase text-xs font-medium text-gray-500 mb-2">RECOMMENDED ACTIONS</h4>
          <ul className="space-y-2">
            {recommendation.actions.map((action, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Insights and Calculate Value buttons - consistently aligned */}
        <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
          <button 
            className={`flex items-center justify-center py-2.5 rounded-md font-medium text-sm h-10 border border-gray-200 ${
              insightsLoading 
              ? 'bg-gray-300 cursor-not-allowed text-gray-600' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
            onClick={handleInsightsClick}
            disabled={insightsLoading}
          >
            {insightsLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-1.5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Downloading...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Insights
              </>
            )}
          </button>
          
          <button 
            className="flex items-center justify-center py-2.5 rounded-md font-medium text-white text-sm h-10"
            style={{ backgroundColor: '#FF5F00' }}
            onClick={handleCalculateValue}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            Calculate Value
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
