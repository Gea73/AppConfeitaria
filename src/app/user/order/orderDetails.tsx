import { Button } from "@/components/buttons/button";
import OrderItemCardNoButton from "@/components/cards/OrderItemCardNoButton";
import ErrorBar from "@/components/errorBar";
import { Title } from "@/components/title";
import { Order } from "@/models/order";
import { orderService } from "@/services/orderService";
import { colors, typography } from "@/styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function OrderDetails() {
  const [errorBar, setErrorBar] = useState("");
  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };
  const [order, setOrder] = useState<Order>();
  const { orderId } = useLocalSearchParams();

  useEffect(() => {
    async function getOrder() {
      const order = await orderService.getOrder(String(orderId));
      if (order) {
        setOrder(order);
      }
    }
    getOrder();
  }, [orderId]);

  async function HandleCancelOrder() {
    try {
      Alert.alert("Cancelar Pedido", "Desejo mesmo cancelar o pedido?", [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          style: "destructive",
          onPress: async () => {
            await orderService.deleteOrder(String(orderId));
            router.back();
          },
        },
      ]);
    } catch (e: any) {
      showErrorBar(String(e));
    }
  }

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ErrorBar message={errorBar}></ErrorBar>
          <Title text="Resumo do Pedido"></Title>

          <TouchableOpacity
            style={stylesheet.cancelOrder}
            onPress={() => HandleCancelOrder()}
          >
            <Text style={stylesheet.cancelText}>Cancelar</Text>
            <Ionicons name="trash" size={28} color={colors.main}></Ionicons>
          </TouchableOpacity>

          <View style={stylesheet.itemsContainer}>
            <FlatList
              data={order?.getItems()}
              renderItem={({ item }) => (
                <OrderItemCardNoButton
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  quantity={item.quantity}
                />
              )}
              keyExtractor={(item) => item.id}
            ></FlatList>
          </View>
          <View style={stylesheet.smallButtonContainer}>
            <Button
              text="Editar Pedido"
              onPress={() =>
                router.push({
                  pathname: "/user/order/editOrder",
                  params: { orderId: orderId },
                })
              }
            ></Button>
          </View>
          <View style={stylesheet.orderContainer}>
            <Text style={stylesheet.orderText}>Valor Total</Text>
            <Text style={stylesheet.orderText}>
              R$
              {order
                ?.getItems()
                .reduce((sum, i) => sum + i.quantity * i.price, 0)
                .toFixed(2)
                .replace(".", ",")}
            </Text>
            <Text style={stylesheet.orderText}>Endereço de Entrega</Text>
            <Text style={stylesheet.orderText}>A adicionar</Text>
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
    margin: "3%",
  },
  cancelText: {
    color: colors.main,
    fontWeight: "bold",
    fontSize: typography.text,
  },
  itemsContainer: {
    flex: 5,
  },
  orderContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.details,
    flex: 2,
    marginTop: "5%",
    padding: "5%",
  },
  orderText: {
    fontSize: typography.subtitle,
    fontWeight: "bold",
  },
  smallButtonContainer: {
    margin: "auto",
    width: "60%",
  },
  buttonContainer: {
    margin: "auto",
    width: "70%",
  },
});
