import { Button } from "@/components/button";
import ErrorBar from "@/components/errorBar";
import FoodMenuItem from "@/components/FoodMenuItem";
import { colors, typography } from "@/styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  type OrderItem = {
    uid: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  };

  const getOrderCart = async (): Promise<OrderItem[]> => {
    try {
      const orderCart = await AsyncStorage.getItem("cart");
      return orderCart ? JSON.parse(orderCart) : [];
    } catch (e: any) {
      showErrorBar(e);
      return [];
    }
  };

  const setOrderCart = async (orderCart: OrderItem[]) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(orderCart));
    } catch (e: any) {
      showErrorBar(e);
    }
  };

  async function AddToCart(newItem: OrderItem | undefined) {
    try {
      if (!newItem) {
        return;
      }
      const cart = await getOrderCart();
      const existingItem = cart.find((item) => item.uid === newItem.uid);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ ...newItem, quantity: 1 });
        await setOrderCart(cart);
        setCurrentCart(cart);
      }
    } catch (e: any) {
      showErrorBar(e);
    }
  }
  async function RemoveFromCart(newItem: OrderItem | undefined) {
    try {
      if (!newItem) {
        return;
      }
      const cart = await getOrderCart();
      const updatedCart = cart
        .map((item) =>
          item.uid === newItem.uid
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
      await setOrderCart(updatedCart);
      setCurrentCart(cart);
    } catch (e: any) {
      showErrorBar(e);
    }
  }

  const [currentCart, setCurrentCart] = useState<OrderItem[]>([]);

  useEffect(() => {
    async function loadCart() {
      const items = await getOrderCart();
      setCurrentCart(items);
      console.log(currentCart);
      console.log(getOrderCart());
    }

    loadCart();
  }, []);

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
              <FoodMenuItem
                uid={item.uid}
                name={item.name}
                description={item.description}
                price={item.price}
                quantity={
                  currentCart.find((i) => i.uid === item.uid)?.quantity || 0
                }
                onIncrease={async () =>
                  await AddToCart(currentCart.find((i) => i.uid === item.uid))
                }
                onDecrease={async () =>
                  await RemoveFromCart(
                    currentCart.find((i) => i.uid === item.uid),
                  )
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
