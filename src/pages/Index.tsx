import { useFinanceData } from '@/hooks/useFinanceData';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const Index = () => {
  const {
    summary,
    categoryBreakdown,
    monthlyData,
    recentTransactions,
    addTransaction,
    deleteTransaction,
  } = useFinanceData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-expense/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <Header onAddTransaction={addTransaction} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Balance"
            value={formatCurrency(summary.totalBalance)}
            icon={<Wallet className="h-6 w-6" />}
            trend={{ value: 12.5, isPositive: true }}
            delay={0}
          />
          <StatCard
            title="Total Income"
            value={formatCurrency(summary.totalIncome)}
            icon={<TrendingUp className="h-6 w-6" />}
            variant="income"
            delay={50}
          />
          <StatCard
            title="Total Expenses"
            value={formatCurrency(summary.totalExpenses)}
            icon={<TrendingDown className="h-6 w-6" />}
            variant="expense"
            delay={100}
          />
          <StatCard
            title="Savings Rate"
            value={`${summary.savingsRate.toFixed(1)}%`}
            subtitle="of income saved"
            icon={<PiggyBank className="h-6 w-6" />}
            variant="savings"
            delay={150}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SpendingChart data={categoryBreakdown} />
          <TrendChart data={monthlyData} />
        </div>

        {/* Transactions */}
        <TransactionList 
          transactions={recentTransactions} 
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
};

export default Index;
