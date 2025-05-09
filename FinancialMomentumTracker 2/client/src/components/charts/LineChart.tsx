import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChartData } from '@/types';

type LineChartProps = {
  data: LineChartData[];
};

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`;
};

const LineChart = ({ data }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{ top: 20, right: 30, left: 40, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={formatCurrency}
          domain={[0, 'dataMax + 5000']}
        />
        <Tooltip
          formatter={(value) => [formatCurrency(value as number), 'Value']}
          contentStyle={{ 
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#EB001B"
          strokeWidth={2}
          dot={{ r: 5, fill: '#EB001B', strokeWidth: 0 }}
          activeDot={{ r: 7, fill: '#EB001B', strokeWidth: 0 }}
          animationDuration={1000}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
