import { usePortfolio } from '@/context/PortfolioContext';
import OpportunityScoreCard from '@/components/dashboard/OpportunityScoreCard';
import PortfolioParams from '@/components/dashboard/PortfolioParams';
import CalculatedValue from '@/components/dashboard/CalculatedValue';
import PropensityModels from '@/components/dashboard/PropensityModels';

const ValueCalculatorPage = () => {
  const { selectedRecommendation, calculatedValue } = usePortfolio();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        {selectedRecommendation ? (
          <p className="text-gray-500">Based on your selected Credit recommendation: "{selectedRecommendation.title}"</p>
        ) : (
          <p className="text-gray-500">Select parameters to calculate opportunity value</p>
        )}
      </div>
      
      <OpportunityScoreCard />
      
      {/* Main content container with scrolling */}
      <div className="h-[calc(100vh-250px)] overflow-y-auto pr-2">
        <PortfolioParams />
        <CalculatedValue />
        
        {/* Show PropensityModels only after Calculate Value is clicked */}
        {calculatedValue && (
          <div 
            className="mb-8 mt-8 p-6 border border-[#FF5F00] rounded-lg bg-white card-shadow"
          >
            <PropensityModels />
          </div>
        )}
      </div>
    </div>
  );
};

export default ValueCalculatorPage;
