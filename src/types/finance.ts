export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'salary'
  | 'freelance'
  | 'investments'
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'utilities'
  | 'health'
  | 'other';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string;
}

export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
}

export interface CategoryBreakdown {
  category: Category;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export const categoryColors: Record<Category, string> = {
  salary: 'hsl(160, 84%, 39%)',
  freelance: 'hsl(180, 70%, 45%)',
  investments: 'hsl(200, 80%, 55%)',
  food: 'hsl(12, 76%, 61%)',
  transport: 'hsl(38, 92%, 50%)',
  shopping: 'hsl(280, 65%, 60%)',
  entertainment: 'hsl(320, 70%, 55%)',
  utilities: 'hsl(220, 60%, 55%)',
  health: 'hsl(350, 65%, 55%)',
  other: 'hsl(240, 30%, 50%)',
};

export const categoryLabels: Record<Category, string> = {
  salary: 'Salary',
  freelance: 'Freelance',
  investments: 'Investments',
  food: 'Food & Dining',
  transport: 'Transportation',
  shopping: 'Shopping',
  entertainment: 'Entertainment',
  utilities: 'Utilities',
  health: 'Health',
  other: 'Other',
};

export const categoryIcons: Record<Category, string> = {
  salary: '💼',
  freelance: '💻',
  investments: '📈',
  food: '🍔',
  transport: '🚗',
  shopping: '🛍️',
  entertainment: '🎬',
  utilities: '💡',
  health: '🏥',
  other: '📦',
};
