import { orderService } from "@/services/orderService";
import { colors } from "@/styles/global";
import { OrderItem } from "@/types/orderItem";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./button";

type OrderCardProps = {
  uid: string;
  items: OrderItem[];
  total: number;
  status: string;
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

  async function handleConfirmed(uid: string) {
    await orderService.updateOrder(uid, null, "preparing");
    setConfirmed(true);
  }

  async function handleDone(uid: string) {
    await orderService.updateOrder(uid, null, "delivered");
    setDone(true);
  }

  return (
    <View style={stylesheet.container}>
      <Text>Pedido #{props.uid}</Text>
      <Text>
        Cliente #{props.customer ? props.customer : "Cliente não encontrado"}
      </Text>
      <Text>Status {props.status}</Text>
      <Text>{items}</Text>
      <Text>Total: R${props.total.toFixed(2).replace(".", ",")}</Text>
      <View style={stylesheet.buttonContainer}>
        {props.status === "Em Preparação" && (
          <Button
            text="Finalizar Pedido"
            onPress={() => handleDone(props.uid)}
          />
        )}

        {props.status === "Aguardando confirmação" && (
          <Button
            text="Confirmar Pedido"
            onPress={() => handleConfirmed(props.uid)}
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
