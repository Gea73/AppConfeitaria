import { Button } from "@/components/button";
import ErrorBar from "@/components/errorBar";
import OrderItemCard from "@/components/OrderItemCard";
import { useCartContext } from "@/context/cartContext";
import { colors, typography } from "@/styles/global";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function MakeOrder() {
  const [errorBar, setErrorBar] = useState("");
  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };

  const { cart, AddItem, RemoveItem, ClearCart, GetTotal } = useCartContext();

  const menu = [
    {
      uid: "uid1",
      name: "Item 1",
      description: "Description",
      price: 1.5,
    },
    {
      uid: "uid2",
      name: "Item 2",
      description: "Description",
      price: 2.5,
    },
    {
      uid: "uid3",
      name: "Item 3",
      description: "Description Descript",
      price: 3,
    },
    {
      uid: "uid4",
      name: "Item 3",
      description: "Description Descript",
      price: 3,
    },
    {
      uid: "uid5",
      name: "Item 3",
      description: "Description Descript",
      price: 3,
    },
    {
      uid: "uid6",
      name: "Item 3",
      description: "Description Descript",
      price: 3,
    },
    {
      uid: "uid7",
      name: "Item 3",
      description: "Description Descript",
      price: 3,
    },
  ];

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
                uid={item.uid}
                name={item.name}
                description={item.description}
                price={item.price}
                quantity={cart.find((i) => i.uid === item.uid)?.quantity || 0}
                onIncrease={() => AddItem({ ...item, quantity: 1 })}
                onDecrease={() =>
                  RemoveItem(cart.find((i) => i.uid === item.uid))
                }
              />
            )}
            keyExtractor={(item) => item.uid}
          ></FlatList>
          <View style={stylesheet.buttonContainer}>
            <Button
              text="Finalizar Pedido"
              onPress={() => router.push("/order/checkout")}
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
