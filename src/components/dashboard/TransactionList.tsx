import { Transaction, categoryLabels, categoryIcons } from '@/types/finance';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
}

export const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 group"
            style={{ animationDelay: `${300 + index * 50}ms` }}
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="text-xl sm:text-2xl flex-shrink-0">
                {categoryIcons[transaction.category]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-xs sm:text-sm truncate">{transaction.description}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {categoryLabels[transaction.category]} • {format(parseISO(transaction.date), 'MMM d')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className={cn(
                "font-semibold tabular-nums text-sm sm:text-base",
                transaction.type === 'income' ? 'text-income' : 'text-expense'
              )}>
                {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
              </span>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-expense"
                  onClick={() => onDelete(transaction.id)}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
