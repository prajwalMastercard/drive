import { PropensityData, PortfolioUsageData, IndustryData, MerchantData, ScalingData, RecommendationType } from '@/types';

interface PowerPointExportParams {
  propensityData: PropensityData[];
  portfolioUsage: PortfolioUsageData[];
  industryData: IndustryData[];
  merchantData: MerchantData[];
  scalingData: ScalingData[];
  templatePath?: string; // Optional path to template
}

interface RecommendationInsightExportParams {
  recommendation: RecommendationType;
  templatePath?: string; // Optional path to template
}

/**
 * Exports financial data to PowerPoint
 * Uses the provided template if available, otherwise creates a new presentation with Mastercard branding
 */
/**
 * Exports recommendation insights to PowerPoint
 * Uses the provided template if available, otherwise creates a new presentation with Mastercard branding
 */
export async function exportRecommendationInsights(params: RecommendationInsightExportParams): Promise<{success: boolean; message: string}> {
  try {
    // Use the direct download endpoint to get the PowerPoint file
    const downloadEndpoint = '/download-ppt';
    
    console.log('Downloading PPT from endpoint:', downloadEndpoint);
    
    // Use window.open() method to directly open the download in a new window/tab
    // This is more reliable for binary downloads than using an anchor tag
    window.open(downloadEndpoint, '_blank');
    
    return { success: true, message: "Successfully downloaded Recommendations Insights!" };
  } catch (error) {
    console.error("Error downloading PowerPoint template:", error);
    return { success: false, message: "There was an error downloading the PowerPoint file." };
  }
}

export async function exportToPowerPoint(params: PowerPointExportParams): Promise<{success: boolean; message: string}> {
  try {
    // Using dynamic import to avoid SSR issues
    const pptxgenModule = await import('pptxgenjs');
    const pptx = new pptxgenModule.default();
    
    const { propensityData, portfolioUsage, industryData, merchantData, scalingData, templatePath } = params;
    
    // Set the company brand colors
    const BRAND_COLORS = {
      primary: 'FF5F00',
      secondary: 'EB001B',
      tertiary: '7375A5'
    };
    
    // Add masterslide with Mastercard theme
    pptx.defineSlideMaster({
      title: 'MASTERCARD_THEME',
      background: { color: 'FFFFFF' },
      objects: [
        { 'rect': { x: 0, y: 6.8, w: '100%', h: 0.5, fill: { color: BRAND_COLORS.primary } } },
        { 'text': { 
          text: 'Financial Momentum Tracker', 
          options: { x: 0.5, y: 6.9, w: '90%', h: 0.3, color: 'FFFFFF', fontFace: 'Arial', fontSize: 10 } 
        }}
      ]
    });
    
    // Add a title slide
    const slide1 = pptx.addSlide({ masterName: 'MASTERCARD_THEME' });
    
    // Add a title
    slide1.addText("Propensity Models and Usage Analysis", {
      x: 0.5,
      y: 1.0,
      fontSize: 28,
      bold: true,
      color: BRAND_COLORS.primary
    });
    
    // Add a subtitle
    slide1.addText("Financial Momentum Tracker Dashboard", {
      x: 0.5,
      y: 2.0,
      fontSize: 20,
      color: BRAND_COLORS.secondary
    });
    
    // Add a date
    const today = new Date().toLocaleDateString();
    slide1.addText(`Report Generated: ${today}`, {
      x: 0.5,
      y: 3.0,
      fontSize: 14,
      color: "666666"
    });
    
    // Add the Card Present vs Card Not Present data
    const slide2 = pptx.addSlide({ masterName: 'MASTERCARD_THEME' });
    slide2.addText("Card Present vs Card Not Present", {
      x: 0.5,
      y: 0.5,
      fontSize: 20,
      bold: true,
      color: BRAND_COLORS.primary
    });
    
    // Add data table
    const tableData = propensityData.map(item => [
      item.type,
      item.transactions.toLocaleString(),
      `$${item.value.toLocaleString()}`,
      `$${item.opportunity.toLocaleString()}`
    ]);
    
    slide2.addTable([
      ["TYPE", "TRANSACTIONS", "VALUE", "OPPORTUNITY"],
      ...tableData
    ], {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 1.7,
      color: "363636",
      fontSize: 14,
      border: { pt: 1, color: BRAND_COLORS.primary }
    });
    
    // Add pie chart for Card Present vs Not Present
    if (propensityData.length >= 2) {
      slide2.addChart(pptx.ChartType.pie, [
        {
          name: 'Card Present',
          labels: ['Card Present', 'Card Not Present'],
          values: [propensityData[0].percent || 0, propensityData[1].percent || 0]
        }
      ], {
        x: 1,
        y: 3.5,
        w: 8,
        h: 3,
        chartColors: ['#EB001B', '#FF5F00'],
        dataLabelColor: '363636',
        showPercent: true
      });
    }
    
    // Add Portfolio Usage slide
    const slide3 = pptx.addSlide({ masterName: 'MASTERCARD_THEME' });
    slide3.addText("Portfolio Usage by Channel", {
      x: 0.5,
      y: 0.5,
      fontSize: 20,
      bold: true,
      color: BRAND_COLORS.primary
    });
    
    // Add channel usage data
    const channelData = portfolioUsage.map(item => [
      item.channel,
      `${item.percent}%`
    ]);
    
    slide3.addTable([
      ["CHANNEL", "USAGE PERCENTAGE"],
      ...channelData
    ], {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 1.7,
      color: "363636",
      fontSize: 14,
      border: { pt: 1, color: BRAND_COLORS.primary }
    });
    
    // Add bar chart for Portfolio Usage
    slide3.addChart(pptx.ChartType.bar, [
      {
        name: 'Usage Percentage',
        labels: portfolioUsage.map(item => item.channel),
        values: portfolioUsage.map(item => item.percent)
      }
    ], {
      x: 1,
      y: 3.5,
      w: 8,
      h: 3,
      chartColors: ['#FF5F00'],
      chartColorsOpacity: 80,
      dataLabelColor: '363636',
      showValue: true
    });
    
    // Add Industry & Merchant Distribution slide
    const slide4 = pptx.addSlide({ masterName: 'MASTERCARD_THEME' });
    slide4.addText("Industry & Merchant Distribution", {
      x: 0.5,
      y: 0.5,
      fontSize: 20,
      bold: true,
      color: BRAND_COLORS.primary
    });
    
    // Add industry data
    const industryTableData = industryData.map(item => [
      item.industry,
      `$${item.value.toLocaleString()}`,
      `$${item.opportunity.toLocaleString()}`
    ]);
    
    slide4.addTable([
      ["INDUSTRY", "VALUE", "OPPORTUNITY"],
      ...industryTableData
    ], {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 2.0,
      color: "363636",
      fontSize: 14,
      border: { pt: 1, color: BRAND_COLORS.primary }
    });
    
    // Add merchant donut chart
    slide4.addChart(pptx.ChartType.doughnut, [
      {
        name: 'Merchants',
        labels: merchantData.map(item => item.merchant),
        values: merchantData.map(item => item.value)
      }
    ], {
      x: 1,
      y: 4.0,
      w: 8,
      h: 3,
      chartColors: merchantData.map(item => item.color),
      dataLabelColor: '363636',
      showPercent: true
    });
    
    // Add Addressability Scaling slide
    const slide5 = pptx.addSlide({ masterName: 'MASTERCARD_THEME' });
    slide5.addText("Addressability Scaling", {
      x: 0.5,
      y: 0.5,
      fontSize: 20,
      bold: true,
      color: BRAND_COLORS.primary
    });
    
    // Add scaling data
    const scalingTableData = scalingData.map(item => [
      item.month,
      `$${item.value.toLocaleString()}`
    ]);
    
    slide5.addTable([
      ["MONTH", "VALUE"],
      ...scalingTableData
    ], {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 2.0,
      color: "363636",
      fontSize: 14,
      border: { pt: 1, color: BRAND_COLORS.primary }
    });
    
    // Add line chart for scaling
    slide5.addChart(pptx.ChartType.line, [
      {
        name: 'Value',
        labels: scalingData.map(item => item.month),
        values: scalingData.map(item => item.value)
      }
    ], {
      x: 1,
      y: 4.0,
      w: 8,
      h: 3,
      chartColors: ['#FF5F00'],
      lineWidth: 3,
      lineSmooth: true,
      showValue: true,
      showLine: true,
      dataLabelColor: '363636'
    });
    
    // Save the presentation
    await pptx.writeFile({ fileName: "Financial_Momentum_Analysis.pptx" });
    
    return { success: true, message: "Successfully exported to PowerPoint!" };
  } catch (error) {
    console.error("Error exporting to PowerPoint:", error);
    return { success: false, message: "There was an error exporting to PowerPoint." };
  }
}