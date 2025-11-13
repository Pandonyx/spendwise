export const EXPENSE_CATEGORIES = [
  { id: "groceries", label: "Groceries", icon: "🛒", color: "#10b981" },
  { id: "transport", label: "Transport", icon: "🚗", color: "#3b82f6" },
  { id: "dining", label: "Dining", icon: "🍽️", color: "#f59e0b" },
  { id: "entertainment", label: "Entertainment", icon: "🎬", color: "#ec4899" },
  { id: "shopping", label: "Shopping", icon: "🛍️", color: "#8b5cf6" },
  { id: "healthcare", label: "Healthcare", icon: "🏥", color: "#ef4444" },
  { id: "utilities", label: "Utilities", icon: "💡", color: "#06b6d4" },
  { id: "other", label: "Other", icon: "📌", color: "#6b7280" },
] as const;

export type CategoryId = (typeof EXPENSE_CATEGORIES)[number]["id"];
