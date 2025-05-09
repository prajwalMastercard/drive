import { usePortfolio } from '@/context/PortfolioContext';

const CalculatedValue = () => {
  const { calculatedValue, selectedTransactionTypes } = usePortfolio();
  
  if (!calculatedValue) return null;
  
  return (
    <div className="card p-6 mb-6 bg-white rounded-lg card-shadow">
      <div className="mb-4">
        <div className="flex items-center text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="10" x2="12" y2="16"></line>
            <line x1="9" y1="13" x2="15" y2="13"></line>
          </svg>
          <h3 className="font-semibold">Calculated Opportunity Value</h3>
        </div>
      </div>
      
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-2/3 mb-4 md:mb-0">
          <div className="text-4xl font-bold text-primary mb-2">{calculatedValue.formattedValue}</div>
          <div className="flex items-center text-[#4CAF50] text-sm mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
            <span>+{calculatedValue.percentChange}%</span>
          </div>
          <p className="text-sm text-gray-500">
            Calculated value for {selectedTransactionTypes.length} transaction {selectedTransactionTypes.length === 1 ? 'type' : 'types'}
          </p>
          
          <div className="mt-4 text-sm flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <p>Transaction Insight: The calculated value represents the incremental revenue opportunity from optimizing selected transaction types over the specified period.</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-md">
          <h4 className="text-sm font-medium mb-3">Calculation Details</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-start">
              <span className="text-gray-500">Transaction Types:</span>
              <div className="text-right">
                {selectedTransactionTypes.length === 1 ? (
                  <span className="font-medium">{selectedTransactionTypes[0]}</span>
                ) : (
                  <div className="flex flex-col items-end">
                    {selectedTransactionTypes.map((type, index) => (
                      <span key={index} className="font-medium">
                        {type}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Calculation Period:</span>
              <span className="font-medium">{calculatedValue.calculationPeriod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Base Value:</span>
              <span className="font-medium">${calculatedValue.baseValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatedValue;
