import { Button } from "@/components/button";
import ErrorBar from "@/components/errorBar";
import OrderItemCard from "@/components/OrderItemCard";
import { Order } from "@/models/order";
import { orderService } from "@/services/orderService";
import { colors, typography } from "@/styles/global";
import { OrderItem } from "@/types/orderItem";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function EditOrder() {
  const [errorBar, setErrorBar] = useState("");
  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };
  const [order, setOrder] = useState<Order>();
  const [modifiedItems, setModifiedItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { orderId } = useLocalSearchParams();


  useEffect(() => {



    async function getOrder() {
      try {
        const order = await orderService.getOrder(String(orderId));
        if (order) {
          setOrder(order);

        }

      } catch (e: any) {
        showErrorBar(String(e))
      }
      finally {
        setLoading(false);
      }

    }
    getOrder();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      setModifiedItems(order.getItems())
    }
  }, [order])

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

  function IncreaseItem(uid: string) {
    const item = modifiedItems.find((i) => i.uid === uid);

    if (item) {
      setModifiedItems(prev => prev.map((i) => (i.uid === uid ? { ...i, quantity: i.quantity + 1 } : i)));
    }
  }

  function RemoveItem(uid: string) {
    const item = modifiedItems.find((i) => i.uid === uid);
    if (item) {
      const newItem = { ...item, quantity: item.quantity - 1 };
      setModifiedItems(
        modifiedItems
          .map((i) => (i.uid === uid ? newItem : i))
          .filter((i) => i.quantity > 0),
      );
    }
  }

  async function HandleEditOrder() {
    try {
      await orderService.updateOrder(String(orderId), modifiedItems, null)
      router.back();
    } catch (e: any) {
      showErrorBar(String(e));
    }
  }
  return (
    <>
      <View style={stylesheet.header}>
        <Text style={stylesheet.headerText}>Patisserie</Text>
      </View>

      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ErrorBar message={errorBar}></ErrorBar>

          <FlatList
            data={modifiedItems}
            renderItem={({ item }) => (
              <OrderItemCard
                uid={item.uid}
                name={item.name}
                description={item.description}
                price={item.price}
                quantity={item.quantity}
                onIncrease={() => IncreaseItem(item.uid)}
                onDecrease={() => RemoveItem(item.uid)}
              />
            )}
            keyExtractor={(item) => item.uid}
          ></FlatList>
          <View style={stylesheet.buttonContainer}>
            <Button
              text="Editar Pedido"
              onPress={() => HandleEditOrder()}
            ></Button>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
const stylesheet = StyleSheet.create({
  header: {
    paddingTop: "10%",
    paddingBottom: 10,
    backgroundColor: colors.main,
  },
  headerText: {
    color: colors.secondary,
    fontSize: typography.title,
    fontFamily: "Shafarik-Regular",
    textAlign: "center",
  },
  buttonContainer: {
    marginHorizontal: "5%",
  },
});
