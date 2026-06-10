import ItemCard from "@/components/ItemCard";
import NoItems from "@/components/noItems";
import { Item } from "@/models/item";
import { itemService } from "@/services/itemService";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Menu() {

  const [items, setItems] = useState<Item[]>([]);
  const [noItems, setNoItems] = useState<boolean>(false);



  useEffect(() => {
    async function getItems() {
      const result = await itemService.getItems();
      const data = result ?? []
      setItems(data);
      setNoItems(data.length === 0);

    }

    getItems();

  }, []);

  function HandleEditItem() {

  }

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <NoItems isVisible={noItems}></NoItems>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <ItemCard
                uid={item.getId()}
                price={item.getPrice()}
                name={item.getName()}
                description={item.getDescription()}
                imageUrl={item.getImageUrl()}
                onEdit={() => HandleEditItem()}
              />
            )}
            keyExtractor={(item) => item.getId()}
          ></FlatList>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );

}
