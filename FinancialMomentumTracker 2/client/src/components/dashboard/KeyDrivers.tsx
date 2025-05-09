import { keyDrivers } from "@/data/portfolioData";

const KeyDrivers = () => {
  return (
    <div className="dashboard-card p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Key Drivers</h3>
            <p className="text-sm text-gray-500">Opportunity Size Distribution</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <div className="flex items-center space-x-1 bg-gray-50 rounded-md px-2.5 py-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Updated: Oct 2023</span>
          </div>
        </div>
      </div>
      
      {/* Merchant Distribution */}
      <div className="mb-6">
        <div className="flex items-center mb-3 px-3 py-2 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">{keyDrivers.category}</h4>
            <p className="text-xs text-gray-500">Key factors influencing portfolio performance</p>
          </div>
        </div>
        
        <div className="mt-5 px-1">
          <div className="h-10 flex rounded-lg overflow-hidden mb-5 shadow-sm">
            {keyDrivers.distribution.map((item, index) => (
              <div
                key={index}
                className="h-full flex items-center justify-center text-white text-xs font-medium"
                style={{ 
                  backgroundColor: item.color,
                  width: `${item.value}%`
                }}
              >
                {item.value}%
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-xs text-gray-400 mb-5 px-1">
            <div>0%</div>
            <div>25%</div>
            <div>50%</div>
            <div>75%</div>
            <div>100%</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
            {keyDrivers.distribution.map((item, index) => (
              <div key={index} className="flex items-center p-2 rounded-md border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                <div 
                  className="w-8 h-8 rounded-md mr-2 flex items-center justify-center" 
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  ></div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-800">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 flex items-center justify-center mt-4 pt-4 border-t border-gray-100">
        <button className="flex items-center space-x-1 text-primary hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Download detailed analysis report</span>
        </button>
      </div>
    </div>
  );
};

export default KeyDrivers;
