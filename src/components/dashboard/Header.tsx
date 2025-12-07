import { Wallet } from 'lucide-react';
import { AddTransactionModal } from './AddTransactionModal';
import { Transaction } from '@/types/finance';

interface HeaderProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export const Header = ({ onAddTransaction }: HeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-primary/20 glow-primary">
          <Wallet className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Finance<span className="gradient-text">Tracker</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your finances with clarity
          </p>
        </div>
      </div>
      <AddTransactionModal onAdd={onAddTransaction} />
    </header>
  );
};
