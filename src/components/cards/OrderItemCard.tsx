import { colors, typography } from "@/styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function OrderItemCard(props: ItemProps) {
  return (
    <View style={stylesheet.container}>
      <View style={stylesheet.imageContainer}>
        <Image
          style={stylesheet.itemPhoto}
          source={require("@/assets/images/cake.png")}
        ></Image>
      </View>
      <View style={stylesheet.textContainer}>
        <Text style={stylesheet.nameText}>{props.name}</Text>
        <Text style={stylesheet.descriptionText}>{props.description}</Text>

        <View style={stylesheet.buttonsContainer}>
          <TouchableOpacity onPress={props.onIncrease}>
            <Ionicons
              name="add-outline"
              size={28}
              color={colors.details}
            ></Ionicons>
          </TouchableOpacity>
          <Text style={stylesheet.quantityText}>{props.quantity}</Text>
          <TouchableOpacity onPress={props.onDecrease}>
            <Ionicons
              name="remove-outline"
              size={28}
              color={colors.details}
            ></Ionicons>
          </TouchableOpacity>
          <Text style={stylesheet.priceText}>
            R$ {props.price.toFixed(2).replace(".", ",")}
          </Text>
        </View>
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    paddingVertical: "2%",
    borderWidth: 0.7,
    borderColor: colors.details,
    flexDirection: "row",
  },
  imageContainer: {
    alignItems: "center",
  },
  itemPhoto: {
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: "5%",
    flexDirection: "column",
  },
  nameText: {
    fontSize: typography.subtitle,
    fontWeight: "bold",
  },
  descriptionText: {
    marginTop: "5%",
  },
  priceText: {
    fontSize: typography.subtitle,
    fontWeight: "bold",
    marginLeft: "5%",
  },
  buttonsContainer: {
    marginTop: "10%",
    flexDirection: "row",
    gap: "3%",
  },
  quantityText: {
    fontSize: typography.text,
    borderWidth: 1,
    borderColor: colors.details,
    borderRadius: 5,
    textAlign: "center",
    textAlignVertical: "center",
    width: "15%",
  },
});
