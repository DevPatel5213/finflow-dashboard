import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CategoryBreakdown, categoryLabels } from '@/types/finance';

interface SpendingChartProps {
  data: CategoryBreakdown[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass rounded-xl p-3 shadow-xl">
        <p className="font-medium">{categoryLabels[data.category]}</p>
        <p className="text-lg font-bold">₹{data.amount.toLocaleString('en-IN')}</p>
        <p className="text-sm text-muted-foreground">{data.percentage.toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

export const SpendingChart = ({ data }: SpendingChartProps) => {
  const totalSpending = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
      <h3 className="text-lg font-semibold mb-4">Spending Breakdown</h3>
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="amount"
                animationBegin={0}
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-bold">₹{totalSpending.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          {data.slice(0, 6).map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground truncate">
                {categoryLabels[item.category]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
