import { useState, useMemo, useCallback } from 'react';
import { Transaction, FinancialSummary, CategoryBreakdown, MonthlyData, categoryColors } from '@/types/finance';
import { format, subMonths, parseISO, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialTransactions: Transaction[] = [
  { id: generateId(), type: 'income', amount: 5200, category: 'salary', description: 'Monthly Salary', date: '2024-12-01' },
  { id: generateId(), type: 'income', amount: 850, category: 'freelance', description: 'Web Design Project', date: '2024-12-05' },
  { id: generateId(), type: 'expense', amount: 120, category: 'food', description: 'Weekly Groceries', date: '2024-12-03' },
  { id: generateId(), type: 'expense', amount: 65, category: 'transport', description: 'Fuel', date: '2024-12-04' },
  { id: generateId(), type: 'expense', amount: 299, category: 'shopping', description: 'New Headphones', date: '2024-12-06' },
  { id: generateId(), type: 'expense', amount: 45, category: 'entertainment', description: 'Netflix & Spotify', date: '2024-12-01' },
  { id: generateId(), type: 'expense', amount: 150, category: 'utilities', description: 'Electricity Bill', date: '2024-12-02' },
  { id: generateId(), type: 'income', amount: 200, category: 'investments', description: 'Dividend Payment', date: '2024-11-28' },
  { id: generateId(), type: 'expense', amount: 85, category: 'health', description: 'Gym Membership', date: '2024-12-01' },
  { id: generateId(), type: 'expense', amount: 230, category: 'food', description: 'Restaurant Dinners', date: '2024-11-25' },
  { id: generateId(), type: 'income', amount: 4800, category: 'salary', description: 'Monthly Salary', date: '2024-11-01' },
  { id: generateId(), type: 'expense', amount: 180, category: 'shopping', description: 'Clothing', date: '2024-11-15' },
  { id: generateId(), type: 'income', amount: 5000, category: 'salary', description: 'Monthly Salary', date: '2024-10-01' },
  { id: generateId(), type: 'expense', amount: 400, category: 'utilities', description: 'Bills', date: '2024-10-05' },
  { id: generateId(), type: 'income', amount: 4900, category: 'salary', description: 'Monthly Salary', date: '2024-09-01' },
  { id: generateId(), type: 'expense', amount: 600, category: 'entertainment', description: 'Concert Tickets', date: '2024-09-20' },
];

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: generateId() };
    setTransactions(prev => [newTransaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const summary: FinancialSummary = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    return { totalBalance, totalIncome, totalExpenses, savingsRate };
  }, [transactions]);

  const categoryBreakdown: CategoryBreakdown[] = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    
    const breakdown = expenses.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = 0;
      }
      acc[t.category] += t.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(breakdown)
      .map(([category, amount]) => ({
        category: category as any,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
        color: categoryColors[category as keyof typeof categoryColors],
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const monthlyData: MonthlyData[] = useMemo(() => {
    const months: MonthlyData[] = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      
      const monthTransactions = transactions.filter(t => {
        const transactionDate = parseISO(t.date);
        return isWithinInterval(transactionDate, { start: monthStart, end: monthEnd });
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({
        month: format(monthDate, 'MMM'),
        income,
        expenses,
      });
    }

    return months;
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8);
  }, [transactions]);

  return {
    transactions,
    summary,
    categoryBreakdown,
    monthlyData,
    recentTransactions,
    addTransaction,
    deleteTransaction,
  };
};
