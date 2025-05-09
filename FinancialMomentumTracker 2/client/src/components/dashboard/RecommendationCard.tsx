import { RecommendationType } from '@/types';
import { usePortfolio } from '@/context/PortfolioContext';

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
  
  // Format growth percentage with + sign and color
  const growthDisplay = recommendation.percentChange > 0 
    ? `+${recommendation.percentChange}%` 
    : `${recommendation.percentChange}%`;
  
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
      {/* Top header with type - always orange */}
      <div 
        className="py-2 px-3 flex items-center"
        style={{ 
          backgroundColor: '#FF5F00'
        }}
      >
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
        
        {/* Calculate Value button - consistent height and alignment */}
        <div className="mt-auto pt-4">
          <button 
            className="w-full flex items-center justify-center py-2.5 rounded-md font-medium text-white text-sm"
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
