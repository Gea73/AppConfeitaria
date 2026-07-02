import OrderCardAdmin from "@/components/cards/OrderCardAdmin";
import LoadingWheel from "@/components/loadingWheel";
import NoOrders from "@/components/noOrders";
import { Order } from "@/models/order";
import { orderService } from "@/services/orderService";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getAllOrders() {
      try {
        const result = await orderService.getAllOrders();
        if (!result) {
          return;
        }
        setOrders(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    getAllOrders();
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
                <OrderCardAdmin
                  id={item.getId() || String(Date.now())}
                  items={item.getItems()}
                  status={item.getStatus()}
                  statusLabel={item.getStatusLabel()}
                  total={item
                    .getItems()
                    .reduce((sum, i) => sum + i.price * i.quantity, 0)}
                  customer={item.getCustomerId()}
                />
              )}
              keyExtractor={(item) => item.getId() ?? String(Date.now())}
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
