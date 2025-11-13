import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        headerStyle: {
          backgroundColor: "#3b82f6",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name='home'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='expenses'
        options={{
          title: "Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name='list'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='scan'
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name='camera'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='analytics'
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name='stats-chart'
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
