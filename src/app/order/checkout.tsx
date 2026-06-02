import { Button } from "@/components/button";
import ErrorBar from "@/components/errorBar";
import OrderItemCard from "@/components/OrderItemCard";
import { Title } from "@/components/title";
import { useCartContext } from "@/context/cartContext";
import { colors, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Checkout() {
  const [errorBar, setErrorBar] = useState("");
  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };
  const { cart, AddItem, RemoveItem, ClearCart, GetTotal } = useCartContext()

  function HandleCancelOrder() {
    ClearCart()
    router.back()
  }
  return (
    <>


      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ErrorBar message={errorBar}></ErrorBar>
          <Title text="Resumo do Pedido"></Title>

          <TouchableOpacity style={stylesheet.cancelOrder} onPress={() => HandleCancelOrder()}>
            <Text style={stylesheet.cancelText}>Cancelar</Text>
            <Ionicons name="trash" size={28} color={colors.main}></Ionicons>
          </TouchableOpacity>

          <View style={stylesheet.itemsContainer}>
            <FlatList data={cart} renderItem={({ item }) => (
              <OrderItemCard uid={item.uid}
                name={item.name}
                description={item.description}
                price={item.price}
                quantity={cart.find((i) => i.uid === item.uid)?.quantity || 0}
                onIncrease={() => AddItem({ ...item, quantity: 1 })}
                onDecrease={() =>
                  RemoveItem(cart.find((i) => i.uid === item.uid))
                } />
            )} keyExtractor={(item) => item.uid}>

            </FlatList>
          </View>
          <View style={stylesheet.smallButtonContainer}>
            <Button text="Editar Pedido" onPress={() => { }}></Button>
          </View>
          <View style={stylesheet.orderContainer}>
            <Text style={stylesheet.orderText}>Valor Total</Text>
            <Text style={stylesheet.orderText}>R$ {GetTotal()}</Text>
            <Text style={stylesheet.orderText}>Endereço de Entrega</Text>
            <Text style={stylesheet.orderText}>Rua Gurarape 185 ,Vila Vintem
            </Text>
          </View>
          <View style={stylesheet.buttonContainer}>
            <Button text="Fazer Pedido " onPress={() => { }}></Button>
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
  cancelOrder: {
    flexDirection: "row",
    alignItems: "center",
    margin: "3%"

  },
  cancelText: {
    color: colors.main,
    fontWeight: "bold",
    fontSize: typography.text
  },
  itemsContainer: {
    flex: 5,

  },
  orderContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.details,
    flex: 2,
    marginTop: "5%",
    padding: "5%"

  },
  orderText: {
    fontSize: typography.subtitle,
    fontWeight: "bold"
  },
  smallButtonContainer: {
    margin: "auto",
    width: "60%"
  },
  buttonContainer: {
    margin: "auto",
    width: "70%"
  }

});
