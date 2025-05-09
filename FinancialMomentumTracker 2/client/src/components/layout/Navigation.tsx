import { usePortfolio } from '@/context/PortfolioContext';

const Navigation = () => {
  const { activeTab, setActiveTab, portfolioType, setPortfolioType } = usePortfolio();
  
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <nav className="flex overflow-x-auto hide-scrollbar" aria-label="Main Navigation">
            <a 
              href="#recommendations" 
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('recommendations');
              }}
              className={`px-6 py-4 text-center text-sm font-medium relative transition-all duration-200 hover:text-orange-500
                ${activeTab === 'recommendations' 
                  ? 'text-orange-500 font-semibold' 
                  : 'text-gray-600'}
              `}
              aria-current={activeTab === 'recommendations' ? 'page' : undefined}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="8" y1="10" x2="16" y2="10"/>
                  <line x1="8" y1="14" x2="16" y2="14"/>
                  <line x1="8" y1="18" x2="12" y2="18"/>
                </svg>
                <span>Recommendations</span>
              </div>
              {activeTab === 'recommendations' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
              )}
            </a>
            {/* Value Calculator tab: not clickable - it's activated when a recommendation is selected */}
            <div 
              className={`px-6 py-4 text-center text-sm font-medium relative
                ${activeTab === 'calculator' 
                  ? 'text-orange-500 font-semibold' 
                  : 'text-gray-400 cursor-not-allowed'}
              `}
              aria-current={activeTab === 'calculator' ? 'page' : undefined}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="10" y1="10" x2="10" y2="10" />
                  <line x1="14" y1="10" x2="14" y2="10" />
                  <line x1="10" y1="14" x2="10" y2="14" />
                  <line x1="14" y1="14" x2="14" y2="14" />
                  <line x1="10" y1="18" x2="10" y2="18" />
                  <line x1="14" y1="18" x2="14" y2="18" />
                </svg>
                <span>Value Calculator</span>
              </div>
              {activeTab === 'calculator' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
              )}
            </div>
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Issuer information */}
            <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-1 text-sm">
                <span className="text-gray-500">Issuer:</span>
                <span className="font-semibold text-gray-800 max-w-[170px] truncate" title="Springwell Bank">Springwell Bank</span>
              </div>
            </div>
            
            {/* Credit/Debit Toggle */}
            <div className="flex items-center space-x-3 border border-gray-200 rounded-full px-4 py-1.5 shadow-sm bg-white">
              <span className={`text-sm font-medium transition-colors ${portfolioType === 'Credit' ? 'text-orange-500' : 'text-gray-400'}`}>
                Credit
              </span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="portfolio-toggle" 
                  className="sr-only"
                  checked={portfolioType === 'Debit'}
                  onChange={() => setPortfolioType(portfolioType === 'Credit' ? 'Debit' : 'Credit')}
                />
                <label 
                  htmlFor="portfolio-toggle" 
                  className={`block w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                    portfolioType === 'Debit' ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                >
                  <span 
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 ${
                      portfolioType === 'Debit' ? 'transform translate-x-6' : ''
                    }`}
                  />
                </label>
              </div>
              <span className={`text-sm font-medium transition-colors ${portfolioType === 'Debit' ? 'text-orange-500' : 'text-gray-400'}`}>
                Debit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
