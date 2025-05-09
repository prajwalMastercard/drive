import { usePortfolio } from '@/context/PortfolioContext';
import { OPPORTUNITY_SCORES } from '@/lib/constants';

const OpportunityScoreCard = () => {
  const { portfolioType } = usePortfolio();
  const score = OPPORTUNITY_SCORES[portfolioType];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-gray-800">Opportunity Size for {portfolioType} Portfolio</h2>
            
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-1 text-gray-500 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="15" y2="9"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
                <span>Springwell Bank</span>
              </div>
              
              {/* Q3 Analysis removed as requested */}
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 text-right">
          <div className="text-4xl font-bold text-gray-900">{score.formattedValue}</div>
          {/* Up arrow and percentage removed as requested */}
          <div className="text-sm text-gray-500 mt-1">Total opportunity value</div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityScoreCard;
