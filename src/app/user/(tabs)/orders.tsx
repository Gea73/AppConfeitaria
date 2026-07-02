import OrderCard from "@/components/cards/OrderCard";
import ErrorBar from "@/components/errorBar";
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

  const [errorBar, setErrorBar] = useState("");
  const [successBar, setSuccessBar] = useState("");
  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };
  const showSuccessBar = (message: string) => {
    setSuccessBar(message);
    setTimeout(() => setSuccessBar(""), 3000);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    async function getCustomerOrders(id: string) {
      try {
        const result = await orderService.getOrders(id);
        if (!result) {
          return;
        }
        setOrders(result);
      } catch (error) {
        showErrorBar(String(error));
      } finally {
        setLoading(false);
      }
    }

    getCustomerOrders(user.getId());
  }, [orders]);

  if (loading) {
    return <LoadingWheel></LoadingWheel>;
  }

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ErrorBar message={errorBar}></ErrorBar>
          {orders.length === 0 ? (
            <NoOrders isVisible={true}></NoOrders>
          ) : (
            <FlatList
              data={orders}
              renderItem={({ item }) => (
                <OrderCard
                  id={item.getId() || String(Date.now())}
                  items={item.getItems()}
                  status={item.getStatus()}
                  statusLabel={item.getStatusLabel()}
                  total={item
                    .getItems()
                    .reduce((sum, i) => sum + i.price * i.quantity, 0)}
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
