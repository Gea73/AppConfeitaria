import NoOrders from "@/components/noOrders";
import OrderCard from "@/components/OrderCard";
import { auth } from "@/firebase/firebaseConfig";
import { Order } from "@/models/order";
import { User } from "@/models/user";
import { orderService } from "@/services/orderService";
import { userService } from "@/services/userService";
import { colors } from "@/styles/global";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUser(): Promise<void> {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const user = await userService.getUser(uid, null);
        setUser(user);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if (!user) {
      return
    }
    const unsubscribe = orderService.subscribeToOrders(user?.getId(), (orders) => {
      setOrders(orders);
      setLoading(false)
    })
    return ()=> unsubscribe()

  }, [user]);

   if (loading) {
     return (
       <View style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center"
       }}>
         <ActivityIndicator
           size={"large"}
           color={colors.main}
         ></ActivityIndicator>
       </View>
     );
   }

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          {orders.length === 0 ? (
            <NoOrders isVisible={true}></NoOrders>
          ) : (
            <FlatList
              data={orders}
              renderItem={({ item }) => (
                <OrderCard
               
                  uid={item.getId()}
                  items={item.getItems()}
                   status={item.getStatus()}
                  total={item
                    .getItems()
                    .reduce((sum, i) => sum + i.price * i.quantity, 0)}
                />
              )}
              keyExtractor={(item) => item.getId()}
            ></FlatList>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
