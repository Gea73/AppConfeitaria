import { CartOverlay } from "@/components/cartOverlay";
import { useCartContext } from "@/context/cartContext";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";


export default function TabLayout() {
  const { cart, GetTotal } = useCartContext()
  return (


    <Tabs
      tabBar={(props) => (
        <>
          <CartOverlay cart={cart} getTotal={GetTotal} />
          <BottomTabBar {...props} />
        </>
      )}
        
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

    </Tabs>


  );
}
