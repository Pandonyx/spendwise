import * as SQLite from "expo-sqlite";
import { Expense } from "../types";

const db = SQLite.openDatabaseSync("expenses.db");

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      receiptUri TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const addExpense = (expense: Omit<Expense, "id" | "createdAt">) => {
  const result = db.runSync(
    `INSERT INTO expenses (amount, category, description, date, receiptUri) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      expense.amount,
      expense.category,
      expense.description,
      expense.date,
      expense.receiptUri || null,
    ]
  );
  return result.lastInsertRowId;
};

export const getAllExpenses = (): Expense[] => {
  const result = db.getAllSync<Expense>(
    "SELECT * FROM expenses ORDER BY date DESC"
  );
  return result;
};

export const getExpenseById = (id: number): Expense | null => {
  const result = db.getFirstSync<Expense>(
    "SELECT * FROM expenses WHERE id = ?",
    [id]
  );
  return result;
};

export const deleteExpense = (id: number) => {
  db.runSync("DELETE FROM expenses WHERE id = ?", [id]);
};

export const updateExpense = (id: number, expense: Partial<Expense>) => {
  const fields = [];
  const values = [];

  if (expense.amount !== undefined) {
    fields.push("amount = ?");
    values.push(expense.amount);
  }
  if (expense.category !== undefined) {
    fields.push("category = ?");
    values.push(expense.category);
  }
  if (expense.description !== undefined) {
    fields.push("description = ?");
    values.push(expense.description);
  }
  if (expense.date !== undefined) {
    fields.push("date = ?");
    values.push(expense.date);
  }

  values.push(id);

  db.runSync(`UPDATE expenses SET ${fields.join(", ")} WHERE id = ?`, values);
};

export const getExpensesByDateRange = (
  startDate: string,
  endDate: string
): Expense[] => {
  const result = db.getAllSync<Expense>(
    "SELECT * FROM expenses WHERE date BETWEEN ? AND ? ORDER BY date DESC",
    [startDate, endDate]
  );
  return result;
};
