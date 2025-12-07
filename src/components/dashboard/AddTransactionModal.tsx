import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transaction, TransactionType, Category, categoryLabels } from '@/types/finance';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AddTransactionModalProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

const incomeCategories: Category[] = ['salary', 'freelance', 'investments', 'other'];
const expenseCategories: Category[] = ['food', 'transport', 'shopping', 'entertainment', 'utilities', 'health', 'other'];

export const AddTransactionModal = ({ onAdd }: AddTransactionModalProps) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const categories = type === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onAdd({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    });

    setAmount('');
    setDescription('');
    setCategory(type === 'income' ? 'salary' : 'food');
    setOpen(false);
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    setCategory(newType === 'income' ? 'salary' : 'food');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 glow-primary">
          <Plus className="h-5 w-5" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Type Toggle */}
          <div className="flex rounded-xl bg-secondary/50 p-1">
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-300",
                type === 'income' 
                  ? "bg-income text-income-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <TrendingUp className="h-4 w-4" />
              Income
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-300",
                type === 'expense' 
                  ? "bg-expense text-expense-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <TrendingDown className="h-4 w-4" />
              Expense
            </button>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 h-12 text-lg bg-secondary/30 border-border/50"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
              <SelectTrigger className="h-12 bg-secondary/30 border-border/50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="glass border-border/50">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {categoryLabels[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-12 bg-secondary/30 border-border/50"
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 bg-secondary/30 border-border/50"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12"
            variant={type === 'income' ? 'income' : 'expense'}
          >
            Add {type === 'income' ? 'Income' : 'Expense'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
