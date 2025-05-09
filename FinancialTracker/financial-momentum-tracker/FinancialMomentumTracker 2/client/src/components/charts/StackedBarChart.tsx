import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StackedBarData } from '@/types';

type StackedBarChartProps = {
  data: StackedBarData;
  dataKey: string;
};

const StackedBarChart = ({ data, dataKey }: StackedBarChartProps) => {
  // Convert the data to the format required by Recharts
  const chartData = [
    {
      name: data.name,
      active: data.active,
      lapsed: data.lapsed,
      total: data.total
    }
  ];

  const formatCurrency = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <ResponsiveContainer width="100%" height={60}>
      <BarChart
        layout="vertical"
        data={chartData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        barSize={24}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" hide />
        <YAxis dataKey="name" type="category" hide />
        <Tooltip
          formatter={(value, name) => {
            if (name === 'active') return [`${value}%`, 'Active'];
            if (name === 'lapsed') return [`${value}%`, 'Lapsed'];
            return [formatCurrency(value as number), 'Total'];
          }}
          contentStyle={{ 
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
        <Bar dataKey="active" stackId="a" fill="#EB001B" radius={[4, 0, 0, 4]} />
        <Bar dataKey="lapsed" stackId="a" fill="#FF5F00" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
