import NoOrders from "@/components/noOrders";
import OrderCard from "@/components/OrderCard";
import { auth } from "@/firebase/firebaseConfig";
import { Order } from "@/models/order";
import { User } from "@/models/user";
import { orderService } from "@/services/orderService";
import { userService } from "@/services/userService";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [noOrders, setNoOrders] = useState<boolean>(false);

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
    async function getOrders() {
      const result = await orderService.getOrders(user?.getId() ?? null);
      const data = result ?? []
      setOrders(data);
      setNoOrders(data.length === 0);

    }

    if (user) {
      getOrders();
    }
  }, [user]);

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <NoOrders isVisible={noOrders}></NoOrders>
          <FlatList
            data={orders}
            renderItem={({ item }) => (
              <OrderCard
                uid={item.getId()}
                items={item.getItems()}
                total={item
                  .getItems()
                  .reduce((sum, i) => sum + i.price * i.quantity, 0)}
              />
            )}
            keyExtractor={(item) => item.getId()}
          ></FlatList>
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
