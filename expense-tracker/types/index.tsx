export interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO date string
  receiptUri?: string; // Local file path to receipt image
  createdAt: string;
}

export interface CategoryTotal {
  category: string;
  total: number;
  count: number;
}

export interface MonthlyStats {
  month: string;
  total: number;
  expenses: Expense[];
}
