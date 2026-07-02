import { Button } from "@/components/buttons/button";
import OrderItemCard from "@/components/cards/OrderItemCard";
import ErrorBar from "@/components/errorBar";
import LoadingWheel from "@/components/loadingWheel";
import { Order } from "@/models/order";
import { orderService } from "@/services/orderService";
import { colors, typography } from "@/styles/global";
import { OrderItem } from "@/types/orderItem";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
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
      <LoadingWheel></LoadingWheel>
    );
  }

  function IncreaseItem(id: string) {
    const item = modifiedItems.find((i) => i.id === id);

    if (item) {
      setModifiedItems(prev => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
    }
  }

  function RemoveItem(id: string) {
    const item = modifiedItems.find((i) => i.id === id);
    if (item) {
      const newItem = { ...item, quantity: item.quantity - 1 };
      setModifiedItems(
        modifiedItems
          .map((i) => (i.id === id ? newItem : i))
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
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                quantity={item.quantity}
                onIncrease={() => IncreaseItem(item.id)}
                onDecrease={() => RemoveItem(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
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
