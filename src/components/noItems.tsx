import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "./buttons/button";
import { TopLogo } from "./topLogo";

type NoItemsProps = {
  isVisible: boolean;
};
export default function NoItems(props: NoItemsProps) {
  if (!props.isVisible) {
    return null;
  }
  return (
    <>
      <TopLogo></TopLogo>
      <View style={stylesheet.imageContainer}>
        <Image
          style={stylesheet.centerImage}
          source={require("@/assets/images/noOrders.png")}
        />
      </View>

      <View style={stylesheet.container}>
        <Button
          text="Criar Item"
          onPress={() => router.push("/admin/item/createItem")}
        ></Button>
      </View>
    </>
  );
}
const stylesheet = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  centerImage: {
    width: 350,
    height: 300,
    resizeMode: "contain",
  },
});
