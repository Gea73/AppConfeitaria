import { Button } from "@/components/buttons/button";
import OrderCard from "@/components/cards/OrderCard";
import LoadingWheel from "@/components/loadingWheel";
import NoOrders from "@/components/noOrders";
import { TopLogo } from "@/components/topLogo";
import useGetUser from "@/hooks/getUser";
import { Order } from "@/models/order";
import { User } from "@/models/user";
import { orderService } from "@/services/orderService";
import { colors, spacing } from "@/styles/global";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [user, setUser] = useState<User | null>(useGetUser());
  const [lastOrder, setLastOrder] = useState<Order>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = orderService.subscribeToCustomerOrders(
      user?.getUid(),
      (orders) => {
        setLastOrder(orders[0]);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <LoadingWheel></LoadingWheel>;
  }

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <TopLogo></TopLogo>
          {!lastOrder ? (
            <NoOrders isVisible={true}></NoOrders>
          ) : (
            <OrderCard
              uid={lastOrder.getUid() || String(Date.now())}
              items={lastOrder.getItems()}
              status={lastOrder.getStatus()}
              statusLabel={lastOrder.getStatusLabel()}
              total={lastOrder
                .getItems()
                .reduce((sum, i) => sum + i.price * i.quantity, 0)}
            />
          )}

          <View style={stylesheet.container}>
            <Button
              text="Novo Pedido"
              onPress={() => router.push("/user/order/makeOrder")}
            ></Button>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const stylesheet = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  centerImage: {
    width: 350,
    height: 300,
    resizeMode: "contain",
  },
  text: {
    color: colors.text,
    fontFamily: "Shafarik-Regular",
  },
  button: {
    padding: spacing.md,
    paddingHorizontal: spacing.xl + spacing.xl,
    backgroundColor: colors.main,
    borderRadius: 18,
  },
});
