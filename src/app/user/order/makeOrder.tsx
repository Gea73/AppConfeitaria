import { Button } from "@/components/buttons/button";
import OrderItemCard from "@/components/cards/OrderItemCard";
import ErrorBar from "@/components/errorBar";
import LoadingWheel from "@/components/loadingWheel";
import { useCartContext } from "@/context/cartContext";
import { Item } from "@/models/item";
import { itemService } from "@/services/itemService";
import { colors, typography } from "@/styles/global";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function MakeOrder() {
  const [errorBar, setErrorBar] = useState("");
  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };
  const [menu, setMenu] = useState<Item[]>([]);
  const { cart, AddItem, RemoveItem, ClearCart, GetTotal } = useCartContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getItems() {
      try {
        const result = await itemService.getItems();
        if (!result) {
          return;
        }
        setMenu(result);
      } catch (error) {
        showErrorBar(String(error));
      } finally {
        setLoading(false);
      }
    }
  }, []);
  if (loading) {
    return <LoadingWheel></LoadingWheel>;
  }

  function handleMakeOrder() {
    try {
      if (cart.length === 0) {
        throw new Error("Seu pedido está vazio");
      }
      router.push("/user/order/checkout");
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
            data={menu}
            renderItem={({ item }) => (
              <OrderItemCard
                id={item.getId() || String(Date.now())}
                name={item.getName()}
                description={item.getDescription()}
                price={item.getPrice()}
                quantity={
                  cart.find((i) => i.id === item.getId())?.quantity || 0
                }
                onIncrease={() =>
                  AddItem({
                    id: item.getId() || String(Date.now()),
                    name: item.getName(),
                    price: item.getPrice(),
                    description: item.getDescription(),
                    quantity: 1,
                  })
                }
                onDecrease={() =>
                  RemoveItem(cart.find((i) => i.id === item.getId()))
                }
              />
            )}
            keyExtractor={(item) => item.getId() ?? String(Date.now())}
          ></FlatList>
          <View style={stylesheet.buttonContainer}>
            <Button
              text="Finalizar Pedido"
              onPress={() => handleMakeOrder()}
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
