import { accountBreakdown } from '@/data/portfolioData';

const AccountsBreakdown = () => {
  // Digital Spend Analysis data with Card Present and Card Not Present values
  const digitalSpendData = {
    cardNotPresent: {
      totalValue: "$14,607.3M",
      sections: [
        {
          title: "Card Not Present / Benchmark",
          leftValue: "$857",
          rightValue: "$1,143",
          leftColor: "#F7D44C", // Yellow (Issuer)
          rightColor: "#F5A052", // Orange (Benchmark)
          bottomValue: "$6,332.8M",
        },
        {
          title: "CNP Active Rate",
          subtitle: "(of Total Active)",
          leftValue: "66.2%",
          rightValue: "77.2%",
          leftColor: "#F7D44C", // Yellow (Issuer)
          rightColor: "#F5A052", // Orange (Benchmark)
          bottomValue: "$3,142.6M",
        }
      ]
    },
    cardPresent: {
      totalValue: "$12,892.5M",
      sections: [
        {
          title: "Card Present / Benchmark",
          leftValue: "$732",
          rightValue: "$986",
          leftColor: "#F7D44C", // Yellow (Issuer)
          rightColor: "#F5A052", // Orange (Benchmark)
          bottomValue: "$5,457.2M",
        },
        {
          title: "CP Active Rate",
          subtitle: "(of Total Active)",
          leftValue: "58.4%",
          rightValue: "71.6%",
          leftColor: "#F7D44C", // Yellow (Issuer)
          rightColor: "#F5A052", // Orange (Benchmark)
          bottomValue: "$2,876.4M",
        }
      ]
    }
  };

  return (
    <div className="dashboard-card p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">What drives this opportunity</h3>
            <p className="text-sm text-gray-500">Issuer vs Benchmark</p>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <div className="flex items-center space-x-1.5 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md">
            <div className="w-2.5 h-2.5 bg-[#F7D44C] rounded-sm"></div>
            <span>Issuer</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md">
            <div className="w-2.5 h-2.5 bg-[#F5A052] rounded-sm"></div>
            <span>Benchmark</span>
          </div>
        </div>
      </div>
      
      {/* Card Not Present Section */}
      <div className="mb-8">
        {/* Header with total digital spend - match the exact look from the reference image */}
        <div className="bg-[#FFF5E0] rounded-md p-3 mb-6 flex justify-between items-center">
          <h3 className="text-gray-800 text-xl font-bold">Card Not Present</h3>
          <span className="text-gray-800 text-xl font-bold">{digitalSpendData.cardNotPresent.totalValue}</span>
        </div>
        
        {/* Split view with two charts side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {digitalSpendData.cardNotPresent.sections.map((section: any, index: number) => (
            <div key={index} className="flex flex-col relative">
              {index === 0 ? null : (
                <div className="absolute left-0 top-0 bottom-0 w-px h-full bg-gray-200 -ml-2 md:block hidden"></div>
              )}
              <div className="text-center mb-3">
                <h4 className="text-gray-800 font-medium">{section.title}</h4>
                {section.subtitle && (
                  <p className="text-sm text-gray-500">{section.subtitle}</p>
                )}
              </div>
              
              {/* Bar charts */}
              <div className="flex justify-center items-end h-36 mb-4 space-x-12">
                <div className="flex flex-col items-center">
                  <span className="mb-2 font-semibold">{section.leftValue}</span>
                  <div 
                    className="w-16 rounded-t-md" 
                    style={{ 
                      backgroundColor: section.leftColor,
                      height: `${index === 0 ? "80px" : "100px"}`
                    }}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="mb-2 font-semibold">{section.rightValue}</span>
                  <div 
                    className="w-16 rounded-t-md" 
                    style={{ 
                      backgroundColor: section.rightColor,
                      height: `${index === 0 ? "110px" : "130px"}`
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Bottom value */}
              <div className="bg-gray-100 rounded-lg text-center py-3 px-4 mt-auto">
                <span className="text-gray-800 font-bold text-xl">{section.bottomValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Card Present Section */}
      <div className="mb-8">
        {/* Header with total digital spend */}
        <div className="bg-[#FFF5E0] rounded-md p-3 mb-6 flex justify-between items-center">
          <h3 className="text-gray-800 text-xl font-bold">Card Present</h3>
          <span className="text-gray-800 text-xl font-bold">{digitalSpendData.cardPresent.totalValue}</span>
        </div>
        
        {/* Split view with two charts side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {digitalSpendData.cardPresent.sections.map((section: any, index: number) => (
            <div key={index} className="flex flex-col relative">
              {index === 0 ? null : (
                <div className="absolute left-0 top-0 bottom-0 w-px h-full bg-gray-200 -ml-2 md:block hidden"></div>
              )}
              <div className="text-center mb-3">
                <h4 className="text-gray-800 font-medium">{section.title}</h4>
                {section.subtitle && (
                  <p className="text-sm text-gray-500">{section.subtitle}</p>
                )}
              </div>
              
              {/* Bar charts */}
              <div className="flex justify-center items-end h-36 mb-4 space-x-12">
                <div className="flex flex-col items-center">
                  <span className="mb-2 font-semibold">{section.leftValue}</span>
                  <div 
                    className="w-16 rounded-t-md" 
                    style={{ 
                      backgroundColor: section.leftColor,
                      height: `${index === 0 ? "80px" : "100px"}`
                    }}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="mb-2 font-semibold">{section.rightValue}</span>
                  <div 
                    className="w-16 rounded-t-md" 
                    style={{ 
                      backgroundColor: section.rightColor,
                      height: `${index === 0 ? "110px" : "130px"}`
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Bottom value */}
              <div className="bg-gray-100 rounded-lg text-center py-3 px-4 mt-auto">
                <span className="text-gray-800 font-bold text-xl">{section.bottomValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Original data breakdown - can be shown/hidden based on user preference */}
      <div className="hidden">
        {/* Card Present */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <div className="font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              {accountBreakdown.cardPresent.name}
            </div>
            <div className="text-gray-500 font-medium">
              <span className="text-primary">${(accountBreakdown.cardPresent.total / 1000000).toFixed(1)}M</span> Total
            </div>
          </div>
          <div className="flex h-8 rounded-md overflow-hidden mb-1.5 shadow-sm">
            <div 
              className="bg-gradient-to-r from-primary/90 to-primary flex items-center justify-center text-xs text-white font-medium" 
              style={{ width: `${accountBreakdown.cardPresent.active}%` }}
            >
              {accountBreakdown.cardPresent.active}%
            </div>
            <div 
              className="bg-gradient-to-r from-secondary/90 to-secondary flex items-center justify-center text-xs text-white font-medium" 
              style={{ width: `${accountBreakdown.cardPresent.lapsed}%` }}
            >
              {accountBreakdown.cardPresent.lapsed}%
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <div>{accountBreakdown.cardPresent.active}% Active Accounts</div>
            <div>{accountBreakdown.cardPresent.lapsed}% Lapsed Accounts</div>
          </div>
        </div>
        
        {/* Card Not Present */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <div className="font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              {accountBreakdown.cardNotPresent.name}
            </div>
            <div className="text-gray-500 font-medium">
              <span className="text-primary">${(accountBreakdown.cardNotPresent.total / 1000000).toFixed(1)}M</span> Total
            </div>
          </div>
          <div className="flex h-8 rounded-md overflow-hidden mb-1.5 shadow-sm">
            <div 
              className="bg-gradient-to-r from-primary/90 to-primary flex items-center justify-center text-xs text-white font-medium" 
              style={{ width: `${accountBreakdown.cardNotPresent.active}%` }}
            >
              {accountBreakdown.cardNotPresent.active}%
            </div>
            <div 
              className="bg-gradient-to-r from-secondary/90 to-secondary flex items-center justify-center text-xs text-white font-medium" 
              style={{ width: `${accountBreakdown.cardNotPresent.lapsed}%` }}
            >
              {accountBreakdown.cardNotPresent.lapsed}%
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <div>{accountBreakdown.cardNotPresent.active}% Active Accounts</div>
            <div>{accountBreakdown.cardNotPresent.lapsed}% Lapsed Accounts</div>
          </div>
        </div>
      </div>
      
      {/* Buttons removed as requested */}
    </div>
  );
};

export default AccountsBreakdown;
