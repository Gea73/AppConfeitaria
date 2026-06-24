import OrderCard from "@/components/cards/OrderCard";
import LoadingWheel from "@/components/loadingWheel";
import NoOrders from "@/components/noOrders";
import useGetUser from "@/hooks/getUser";
import { Order } from "@/models/order";
import { User } from "@/models/user";
import { orderService } from "@/services/orderService";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const [user, setUser] = useState<User | null>(useGetUser());
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = orderService.subscribeToCustomerOrders(
      user?.getUid(),
      (orders) => {
        setOrders(orders);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [orders]);

  if (loading) {
    return <LoadingWheel></LoadingWheel>;
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
                  uid={item.getUid() || String(Date.now())}
                  items={item.getItems()}
                  status={item.getStatus()}
                  statusLabel={item.getStatusLabel()}
                  total={item
                    .getItems()
                    .reduce((sum, i) => sum + i.price * i.quantity, 0)}
                />
              )}
              keyExtractor={(item) => item.getUid() ?? String(Date.now())}
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
