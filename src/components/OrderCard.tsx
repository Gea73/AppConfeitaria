import { colors } from "@/styles/global";
import { OrderItem } from "@/types/orderItem";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./button";

type OrderCardProps = {
  uid: string;
  items: OrderItem[];
  total: number;
};

function getItems(items: OrderItem[]) {
  let itemString = "";
  items.forEach((e) => {
    itemString += `${e.name} x${e.quantity} Preço R$${e.price}`;
  });

  return itemString
}

export default function OrderCard(props: OrderCardProps) {
  const [items, setItems] = useState(getItems(props.items));

  return (
    <View style={stylesheet.container}>
      <Text>{items}</Text>
      <Text>Total: R${props.total.toFixed(2).replace(".", ",")}</Text>
      <Button text="Ver Pedido" onPress={() => router.push({ pathname: "/order/orderDetails", params: { orderId: props.uid } })}></Button>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    paddingVertical: "2%",
    borderWidth: 0.7,
    borderColor: colors.details,
    flexDirection: "row",
  },
});
