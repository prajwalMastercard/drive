import OpportunityScoreCard from '@/components/dashboard/OpportunityScoreCard';
import AccountsBreakdown from '@/components/dashboard/AccountsBreakdown';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import { usePortfolio } from '@/context/PortfolioContext';
import { recommendations } from '@/data/recommendations';

const RecommendationsPage = () => {
  const { portfolioType } = usePortfolio();
  
  // Filter recommendations based on portfolio type only
  const filteredRecommendations = recommendations.filter(rec => 
    rec.portfolioType === portfolioType
  );
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Removed Recommendations title as requested */}
      
      <OpportunityScoreCard />
      
      {/* Main content container with scrolling */}
      <div className="h-[calc(100vh-250px)] overflow-y-auto pr-2">
        <AccountsBreakdown />
        
        <h3 className="text-xl font-bold mb-4 mt-8 text-gray-800">Recommendations for Springwell Bank</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {filteredRecommendations.map(recommendation => (
            <RecommendationCard 
              key={recommendation.id} 
              recommendation={recommendation} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
