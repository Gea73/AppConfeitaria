import ItemCard from "@/components/ItemCard";
import NoItems from "@/components/noItems";
import { Item } from "@/models/item";
import { itemService } from "@/services/itemService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Menu() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function getItems() {
      const result = await itemService.getItems();
      const data = result ?? [];
      setItems(data);
    }

    getItems();
  }, []);

  function HandleEditItem(itemId: string) {
    router.push({ pathname: "/item/alterItem", params: { itemId: itemId } });
  }

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
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
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
