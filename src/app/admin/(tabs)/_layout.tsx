import { auth } from "@/firebase/firebaseConfig";
import { userService } from "@/services/userService";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabLayout() {
  useEffect(() => {
    async function verifyRole() {
      const uid = auth.currentUser?.uid
      if (!uid) {
        router.replace("/auth/signIn")
        return
      }
      const user = await userService.getUser(uid)
      if (user?.getRole() !== "admin") router.replace("/user/home");
    }

    verifyRole()
  }, [])


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 120,
          backgroundColor: colors.main,
          borderTopColor: colors.secondary,
        },
        tabBarActiveTintColor: colors.mid,
        tabBarInactiveTintColor: colors.secondary,
      }}
    >
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
