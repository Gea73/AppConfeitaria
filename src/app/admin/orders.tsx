import OrderCard from "@/components/OrderCard";
import { Order } from "@/models/order";
import { orderService } from "@/services/orderService";
import { colors } from "@/styles/global";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = orderService.subscribeToAllOrders((orders) => {
      setOrders(orders);
      setLoading(false)
    })
    return ()=> unsubscribe()
  }, []);

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
