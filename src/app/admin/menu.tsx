import { Button } from "@/components/button";
import ItemCard from "@/components/ItemCard";
import NoItems from "@/components/noItems";
import { Item } from "@/models/item";
import { itemService } from "@/services/itemService";
import { colors, typography } from "@/styles/global";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Menu() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = itemService.subscribeToItems((items) => {
      setItems(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  function HandleEditItem(itemId: string) {
    router.push({ pathname: "/item/alterItem", params: { itemId: itemId } });
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size={"large"}
          color={colors.main}
        ></ActivityIndicator>
      </View>
    );
  }

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={stylesheet.header}>
            <Text style={stylesheet.headerText}>Cardápio</Text>
          </View>

          {items.length === 0 ? (
            <NoItems isVisible={true}></NoItems>
          ) : (
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <ItemCard
                  uid={item.getId()}
                  price={item.getPrice()}
                  name={item.getName()}
                  description={item.getDescription()}
                  imageUrl={item.getImageUrl()}
                  onEdit={() => HandleEditItem(item.getId())}
                />
              )}
              keyExtractor={(item) => item.getId()}
            ></FlatList>
          )}
          <View style={stylesheet.buttonContainer}>
            <Button
              text="Criar Item"
              onPress={() => {
                router.push("/item/createItem");
              }}
            ></Button>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
const stylesheet = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  header: {
    paddingVertical: 10,
    backgroundColor: colors.main,
  },
  headerText: {
    color: colors.secondary,
    fontSize: typography.title,
    fontFamily: "Shafarik-Regular",
    textAlign: "center",
  },
});
