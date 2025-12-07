import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'income' | 'expense' | 'savings';
  delay?: number;
}

const variantStyles = {
  default: 'border-border/30',
  income: 'border-income/30 hover:border-income/50',
  expense: 'border-expense/30 hover:border-expense/50',
  savings: 'border-savings/30 hover:border-savings/50',
};

const iconStyles = {
  default: 'bg-secondary text-foreground',
  income: 'bg-income/20 text-income',
  expense: 'bg-expense/20 text-expense',
  savings: 'bg-savings/20 text-savings',
};

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  variant = 'default',
  delay = 0 
}: StatCardProps) => {
  return (
    <div 
      className={cn(
        "glass rounded-2xl p-6 animate-slide-up transition-all duration-300 hover:scale-[1.02]",
        variantStyles[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl",
          iconStyles[variant]
        )}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            trend.isPositive ? "bg-income/20 text-income" : "bg-expense/20 text-expense"
          )}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
      )}
    </div>
  );
};
