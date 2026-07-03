import { orderService } from "@/services/orderService";
import { colors } from "@/styles/global";
import { OrderItem } from "@/types/orderItem";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../buttons/button";

type OrderCardProps = {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  statusLabel: string;
  customer: string;
};

function getItems(items: OrderItem[]) {
  let itemString = "";
  items.forEach((e) => {
    itemString += `${e.name} x${e.quantity} Preço R$${e.price}`;
  });

  return itemString;
}

export default function OrderCardAdmin(props: OrderCardProps) {
  const items = getItems(props.items);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  async function handleConfirmed(id: string) {
    await orderService.updateOrder(id, null, "preparing");
    setConfirmed(true);
    router.navigate("/admin/(tabs)/orders")
    
  }

  async function handleDone(id: string) {
    await orderService.updateOrder(id, null, "delivered");
    setDone(true);
      router.navigate("/admin/(tabs)/orders")
  }

  return (
    <View style={stylesheet.container}>
      <Text>Pedido #{props.id}</Text>
      <Text>
        Cliente #{props.customer ? props.customer : "Cliente não encontrado"}
      </Text>
      <Text>Status {props.statusLabel}</Text>
      <Text>{items}</Text>
      <Text>Total: R${props.total.toFixed(2).replace(".", ",")}</Text>
      <View style={stylesheet.buttonContainer}>
        {props.status === "preparing" && (
          <Button
            text="Finalizar Pedido"
            onPress={() => handleDone(props.id)}
          />
        )}

        {props.status === "pending" && (
          <Button
            text="Confirmar Pedido"
            onPress={() => handleConfirmed(props.id)}
          />
        )}
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
