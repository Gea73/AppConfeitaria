import OrderCardAdmin from "@/components/cards/OrderCardAdmin";
import LoadingWheel from "@/components/loadingWheel";
import { Order } from "@/models/order";
import { orderService } from "@/services/orderService";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = orderService.subscribeToAllOrders((orders) => {
      setOrders(orders);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <LoadingWheel></LoadingWheel>
    );
  }

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={orders}
            renderItem={({ item }) => (
              <OrderCardAdmin
                uid={item.getUid() || String(Date.now())}
                items={item.getItems()}
                status={item.getStatus()}
                total={item
                  .getItems()
                  .reduce((sum, i) => sum + i.price * i.quantity, 0)}
                customer={item.getCustomerUid()}
              />
            )}
            keyExtractor={(item) => item.getUid() ?? String(Date.now())}
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
