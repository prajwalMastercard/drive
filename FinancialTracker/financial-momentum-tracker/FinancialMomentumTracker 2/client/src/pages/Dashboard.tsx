import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import RecommendationsPage from '@/pages/RecommendationsPage';
import ValueCalculatorPage from '@/pages/ValueCalculatorPage';
import { usePortfolio } from '@/context/PortfolioContext';

const Dashboard = () => {
  const { activeTab } = usePortfolio();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Fixed Header and Navigation */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Header />
        <Navigation />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-grow" style={{ paddingBottom: '60px' }}>
        <div className="max-w-[1440px] w-full mx-auto transition-all duration-300">
          {activeTab === 'recommendations' ? (
            <RecommendationsPage />
          ) : (
            <ValueCalculatorPage />
          )}
        </div>
      </main>
      
      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
