import { propensityData, portfolioUsage, industryData, merchantData, scalingData } from '@/data/appData';
import DonutChart from '@/components/charts/DonutChart';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import { exportToPowerPoint } from '@/utils/pptExport';
import { useState } from 'react';

const PropensityModels = () => {
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  
  // Function to handle exporting to PPT using the external utility
  const handleExportPPT = async () => {
    try {
      setExportLoading(true);
      
      // Using the utility function to generate PowerPoint
      const result = await exportToPowerPoint({
        propensityData,
        portfolioUsage,
        industryData,
        merchantData,
        scalingData,
        templatePath: 'attached_assets/idc-mobile-presentation-2016.pptx' // Using the template
      });
      
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error exporting to PowerPoint:", error);
      alert("There was an error exporting to PowerPoint. Please try again later.");
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Propensity Models and Usage Analysis</h3>
        <button 
          onClick={handleExportPPT}
          disabled={exportLoading}
          className={`flex items-center text-sm text-white font-medium py-2 px-3 rounded-md transition-colors ${
            exportLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#FF5F00] hover:bg-[#E55400]'
          }`}
        >
          {exportLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 mr-1.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export PPT
            </>
          )}
        </button>
      </div>
      
      {/* Card Present vs Not Present */}
      <div className="card p-6 mb-6 bg-white rounded-lg card-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
            <h3 className="font-semibold">Card Present vs Card Not Present</h3>
          </div>
          
          <button className="text-xs text-gray-500 flex items-center">
            <span>Compare Metrics</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">Transaction type distribution and value comparison</p>
        
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">TYPE</th>
                    <th className="text-right py-2 font-medium">TRANSACTIONS</th>
                    <th className="text-right py-2 font-medium">VALUE</th>
                    <th className="text-right py-2 font-medium">OPPORTUNITY</th>
                  </tr>
                </thead>
                <tbody>
                  {propensityData.map((item, index) => (
                    <tr key={index} className={index < propensityData.length - 1 ? "border-b" : ""}>
                      <td className={`py-3 ${item.type === 'Total' ? 'font-medium' : ''}`}>{item.type}</td>
                      <td className={`text-right py-3 ${item.type === 'Total' ? 'font-medium' : ''}`}>{item.transactions.toLocaleString()}</td>
                      <td className={`text-right py-3 ${item.type === 'Total' ? 'font-medium' : ''}`}>${item.value.toLocaleString()}</td>
                      <td className={`text-right py-3 text-primary ${item.type === 'Total' ? 'font-medium' : ''}`}>${item.opportunity.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 md:pl-6 flex flex-col items-center justify-center">
            <div className="chart-container relative w-48 h-48">
              <DonutChart data={[
                { name: 'Card Present', value: propensityData[0].percent || 0, color: '#EB001B' },
                { name: 'Card Not Present', value: propensityData[1].percent || 0, color: '#FF5F00' }
              ]} />
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-primary mr-1"></div>
                <span className="text-xs">Card Present: {propensityData[0].percent}%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-secondary mr-1"></div>
                <span className="text-xs">Card Not Present: {propensityData[1].percent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Portfolio Usage by Channel */}
      <div className="card p-6 mb-6 bg-white rounded-lg card-shadow">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20V10"></path>
            <path d="M18 20V4"></path>
            <path d="M6 20v-4"></path>
          </svg>
          <h3 className="font-semibold">Portfolio Usage by Channel</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">Based on transaction amount across channels</p>
        
        <div className="h-64 chart-container">
          <BarChart data={portfolioUsage.map(item => ({
            name: item.channel,
            value: item.percent,
            color: '#FF5F00'
          }))} />
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-2">ATM and POS represent the highest usage channels</p>
      </div>
      
      {/* Industry & Merchant Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Industry Distribution */}
        <div className="card p-6 bg-white rounded-lg card-shadow">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20h.01"></path>
              <path d="M7 20v-4"></path>
              <path d="M12 20v-8"></path>
              <path d="M17 20V8"></path>
              <path d="M22 4v16"></path>
            </svg>
            <h3 className="font-semibold">Industry Distribution</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">Transaction value by industry segment</p>
          
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">INDUSTRY</th>
                  <th className="text-right py-2 font-medium">VALUE</th>
                  <th className="text-right py-2 font-medium">OPPORTUNITY</th>
                </tr>
              </thead>
              <tbody>
                {industryData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.industry}</td>
                    <td className="text-right py-2">${item.value.toLocaleString()}</td>
                    <td className="text-right py-2 text-primary">${item.opportunity.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Horizontal Bar Chart */}
          <div className="space-y-2 mb-4">
            {industryData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{item.industry}</span>
                  <span>${item.value.toLocaleString()}</span>
                </div>
                <div 
                  className="h-4 bg-primary rounded-sm" 
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$100k</span>
            <span>$200k</span>
            <span>$300k</span>
          </div>
        </div>
        
        {/* Top Merchants */}
        <div className="card p-6 bg-white rounded-lg card-shadow">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <h3 className="font-semibold">Top Merchants</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">Transaction value by merchant</p>
          
          <div className="chart-container relative w-48 h-48 mx-auto mb-4">
            <DonutChart data={merchantData.map(item => ({
              name: item.merchant,
              value: item.percent || 0,
              color: item.color
            }))} />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {merchantData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-sm mr-1" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs">{item.merchant}</span>
              </div>
            ))}
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">MERCHANT</th>
                  <th className="text-right py-2 font-medium">VALUE</th>
                  <th className="text-right py-2 font-medium">OPPORTUNITY</th>
                </tr>
              </thead>
              <tbody>
                {merchantData.slice(0, 3).map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.merchant}</td>
                    <td className="text-right py-2">${item.value.toLocaleString()}</td>
                    <td className="text-right py-2 text-primary">${item.opportunity.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Addressability Scaling */}
      <div className="card p-6 mb-6 bg-white rounded-lg card-shadow">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="22"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <h3 className="font-semibold">Addressability Scaling</h3>
        </div>
        
        <div className="h-64 chart-container">
          <LineChart 
            data={scalingData.map(item => ({
              name: item.month,
              value: item.value
            }))} 
          />
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-2">+15% uplift in month 6</p>
      </div>
    </>
  );
};

export default PropensityModels;
