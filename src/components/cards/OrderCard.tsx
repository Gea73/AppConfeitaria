import { colors } from "@/styles/global";
import { OrderItem } from "@/types/orderItem";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../buttons/button";

type OrderCardProps = {
  uid: string;
  items: OrderItem[];
  total: number;
  status: string;
};

function getItems(items: OrderItem[]) {
  let itemString = "";
  items.forEach((e) => {
    itemString += `${e.name} x${e.quantity} Preço R$${e.price}`;
  });

  return itemString;
}

export default function OrderCard(props: OrderCardProps) {
  const items = getItems(props.items);

  return (
    <View style={stylesheet.container}>
      <Text>Seu pedido está {props.status}</Text>
      <Text>{items}</Text>
      <Text>Total: R${props.total.toFixed(2).replace(".", ",")}</Text>
      <View style={stylesheet.buttonContainer}>
        <Button
          text="Ver Pedido"
          onPress={() =>
            router.push({
              pathname: "/user/order/orderDetails",
              params: { orderId: props.uid },
            })
          }
        ></Button>
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    paddingVertical: "2%",
    borderWidth: 0.7,
    borderColor: colors.details,
  },
  buttonContainer: {
    alignItems: "center",
  },
});
