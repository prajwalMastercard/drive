import { usePortfolio } from '@/context/PortfolioContext';
import { TRANSACTION_TYPES } from '@/data/appData';
import { TransactionType } from '@/types';
import { DurationInMonths } from '@/context/PortfolioContext';

const PortfolioParams = () => {
  const { 
    selectedTransactionTypes,
    toggleTransactionType,
    calculateValue,
    duration,
    setDuration,
    selectedRecommendation,
    calculatedValue
  } = usePortfolio();

  const handleTransactionTypeToggle = (type: TransactionType) => {
    toggleTransactionType(type);
  };
  
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setDuration(value as DurationInMonths);
  };
  
  // Duration options
  const durationOptions: DurationInMonths[] = [0, 3, 6, 9, 12];
  
  // Filter parent types and child types
  const parentTypes = TRANSACTION_TYPES.filter(type => type.isParent);
  
  // Count only parent KPIs
  const selectedParentKPIs = selectedTransactionTypes.filter(typeValue => {
    const type = TRANSACTION_TYPES.find(t => t.value === typeValue);
    return type?.isParent;
  });
  
  // Function to render a checkbox
  const renderCheckbox = (type: typeof TRANSACTION_TYPES[0], isChild = false) => {
    return (
      <div 
        key={type.id}
        className={`border rounded-lg p-4 hover:border-[#FF5F00] cursor-pointer transition-colors ${
          selectedTransactionTypes.includes(type.value as TransactionType) ? 'border-[#FF5F00] bg-orange-50' : 'border-gray-200'
        } ${isChild ? 'ml-6' : ''}`}
        onClick={() => handleTransactionTypeToggle(type.value as TransactionType)}
      >
        <div className="flex items-start">
          <div className={`w-5 h-5 rounded border ${
            selectedTransactionTypes.includes(type.value as TransactionType) ? 'border-[#FF5F00] bg-[#FF5F00]' : 'border-gray-300 bg-white'
          } flex items-center justify-center mr-2 transition-colors`}>
            {selectedTransactionTypes.includes(type.value as TransactionType) && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          <div>
            <h4 className="font-medium mb-1">{type.title}</h4>
            <p className="text-xs text-gray-500">{type.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-card p-6 mb-6">
      <h3 className="font-semibold mb-4 text-gray-800">Portfolio Product Parameters</h3>
      <p className="text-sm text-gray-500 mb-6">Select one or more KPIs to calculate combined opportunity size with respect to recommendation</p>
      
      {/* Hierarchical checkboxes */}
      <div className="space-y-6 mb-6">
        {/* Card Present (CP) group */}
        <div>
          {/* CP Parent */}
          {renderCheckbox(parentTypes[0])}
          
          {/* CP Children */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {TRANSACTION_TYPES.filter(type => type.parent === 'card-present').map(type => (
              <div key={type.id} className="ml-6">
                {renderCheckbox(type, true)}
              </div>
            ))}
          </div>
        </div>
        
        {/* Card Not Present (CNP) group */}
        <div>
          {/* CNP Parent */}
          {renderCheckbox(parentTypes[1])}
          
          {/* CNP Children */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {TRANSACTION_TYPES.filter(type => type.parent === 'card-not-present').map(type => (
              <div key={type.id} className="ml-6">
                {renderCheckbox(type, true)}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Duration Slider */}
      <div className="mb-8 mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium text-gray-700">Duration</h4>
          <span className="text-gray-700 font-medium">{duration} Months</span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="0"
            max="12"
            step="3"
            value={duration}
            onChange={handleDurationChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: '#FF5F00' }}
          />
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {durationOptions.map((months) => (
              <span key={months} className={`${duration === months ? 'text-[#FF5F00] font-medium' : ''}`}>
                {months}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">No data</span>
          <span className="text-xs text-gray-500">Full year analysis</span>
        </div>
      </div>
      
      {/* Selected recommendation display */}
      {selectedRecommendation && (
        <div className="mb-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-orange-100 text-[#FF5F00] px-3 py-1 rounded-full text-xs font-semibold mr-2">
              Recommendation
            </div>
            <h4 className="font-medium text-gray-800">
              {selectedRecommendation.title}
            </h4>
          </div>
        </div>
      )}
      
      {/* Selections summary - counts only parent KPIs */}
      {selectedParentKPIs.length > 0 && (
        <div className="mb-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-[#FF5F00]">
            {selectedParentKPIs.length} {selectedParentKPIs.length === 1 ? 'KPI' : 'KPIs'} selected
          </span>
        </div>
      )}
      
      <button 
        className="py-3 px-8 mx-auto block bg-[#FF5F00] text-white rounded-md font-medium transition-colors hover:bg-[#ED5A00] disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={calculateValue}
        disabled={selectedTransactionTypes.length === 0 || duration === 0}
      >
        Calculate Value
      </button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        The calculation uses historical transaction data for the selected duration
      </p>
    </div>
  );
};

export default PortfolioParams;
