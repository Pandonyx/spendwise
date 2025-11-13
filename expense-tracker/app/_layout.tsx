import { useEffect } from "react";
import { Stack } from "expo-router";
import { initDatabase } from "../lib/database";

export default function RootLayout() {
  useEffect(() => {
    // Initialize database on app start
    initDatabase();
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='expense/[id]'
        options={{ title: "Expense Details" }}
      />
    </Stack>
  );
}
