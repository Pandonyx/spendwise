import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getAllExpenses } from "../../lib/database";
import { Expense } from "../../types";
import { format, startOfMonth, endOfMonth } from "date-fns";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  // Wrap in useCallback to prevent infinite loops
  const loadExpenses = useCallback(() => {
    const allExpenses = getAllExpenses();
    setExpenses(allExpenses);

    const now = new Date();
    const monthStart = format(startOfMonth(now), "yyyy-MM-dd");
    const monthEnd = format(endOfMonth(now), "yyyy-MM-dd");

    const monthlyExpenses = allExpenses.filter(
      (e) => e.date >= monthStart && e.date <= monthEnd
    );

    const total = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);
    setMonthlyTotal(total);
  }, []);

  // Use useCallback for the focus effect
  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [loadExpenses])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back! 👋</Text>
        <Text style={styles.date}>{format(new Date(), "MMMM yyyy")}</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>This Month's Spending</Text>
        <Text style={styles.totalAmount}>${monthlyTotal.toFixed(2)}</Text>
        <Text style={styles.totalSubtext}>{expenses.length} transactions</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Expenses</Text>
        {expenses.slice(0, 5).map((expense) => (
          <View
            key={expense.id}
            style={styles.expenseItem}>
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseDescription}>
                {expense.description || "No description"}
              </Text>
              <Text style={styles.expenseDate}>
                {format(new Date(expense.date), "MMM dd, yyyy")}
              </Text>
            </View>
            <Text style={styles.expenseAmount}>
              ${expense.amount.toFixed(2)}
            </Text>
          </View>
        ))}

        {expenses.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No expenses yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the scan button to add your first expense
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    padding: 20,
    backgroundColor: "#3b82f6",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#dbeafe",
  },
  totalCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  totalSubtext: {
    fontSize: 14,
    color: "#94a3b8",
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 16,
  },
  expenseItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expenseInfo: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 4,
  },
  expenseDate: {
    fontSize: 14,
    color: "#64748b",
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3b82f6",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
});
