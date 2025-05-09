import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/types';

type BarChartProps = {
  data: ChartData[];
};

const BarChart = ({ data }: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tickFormatter={(value) => `${value}%`} 
          domain={[0, 100]}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, 'Percentage']}
          labelFormatter={(label) => `Channel: ${label}`}
          contentStyle={{ 
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
        <Bar 
          dataKey="value" 
          fill="#FF5F00" 
          radius={[4, 4, 0, 0]}
          barSize={30}
          name="Percentage"
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
