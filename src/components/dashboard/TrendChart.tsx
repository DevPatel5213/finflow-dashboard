import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '@/types/finance';

interface TrendChartProps {
  data: MonthlyData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 shadow-xl">
        <p className="font-medium mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-income">Income:</span>{' '}
            <span className="font-semibold">₹{payload[0]?.value?.toLocaleString('en-IN')}</span>
          </p>
          <p className="text-sm">
            <span className="text-expense">Expenses:</span>{' '}
            <span className="font-semibold">₹{payload[1]?.value?.toLocaleString('en-IN')}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const TrendChart = ({ data }: TrendChartProps) => {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Monthly Overview</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-income" />
            <span className="text-sm text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-expense" />
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(12, 76%, 61%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(12, 76%, 61%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(220, 15%, 18%)' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(220, 15%, 18%)' }}
              tickLine={false}
              tickFormatter={(value) => `₹${value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth={2}
              fill="url(#incomeGradient)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="hsl(12, 76%, 61%)"
              strokeWidth={2}
              fill="url(#expenseGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
