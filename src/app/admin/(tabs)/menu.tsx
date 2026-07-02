import { Button } from "@/components/buttons/button";
import ItemCard from "@/components/cards/ItemCard";
import LoadingWheel from "@/components/loadingWheel";
import NoItems from "@/components/noItems";
import { Item } from "@/models/item";
import { itemService } from "@/services/itemService";
import { colors, typography } from "@/styles/global";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Menu() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getItems() {
      try {
        const result = await itemService.getItems();
        if (!result) {
          return;
        }
        setItems(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    getItems();
  }, []);

  function HandleEditItem(itemId: string) {
    router.push({
      pathname: "/admin/item/alterItem",
      params: { itemId: itemId },
    });
  }

  if (loading) {
    return <LoadingWheel></LoadingWheel>;
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
                  id={item.getId() || String(Date.now())}
                  price={item.getPrice()}
                  name={item.getName()}
                  description={item.getDescription()}
                  imageUrl={item.getImageUrl()}
                  onEdit={() =>
                    HandleEditItem(item.getId() || String(Date.now()))
                  }
                />
              )}
              keyExtractor={(item) => item.getId() ?? String(Date.now())}
            ></FlatList>
          )}
          <View style={stylesheet.buttonContainer}>
            <Button
              text="Criar Item"
              onPress={() => {
                router.push("/admin/item/createItem");
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
