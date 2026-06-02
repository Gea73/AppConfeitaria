import { colors, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemProps = {
  uid: string;
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
      <Image style={stylesheet.itemPhoto} source={require("@/assets/images/cake.png")}></Image>
      </View>
      <View style={stylesheet.textContainer}>
        <Text style={stylesheet.nameText}>{props.name}</Text>
        <Text>{props.description}</Text>
        <Text>{props.price}</Text>
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
  imageContainer:{
    alignItems:"center",
  },
  itemPhoto:{
    flex:1
  },
  textContainer: {
    paddingHorizontal: "5%",
    flexDirection: "column",
  },
  nameText: {
    fontSize: typography.subtitle,
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: "25%",
    flexDirection: "row",
    gap: "5%",
  },
  quantityText: {
    fontSize: typography.text,
    borderWidth: 1,
    borderColor: colors.details,
    borderRadius: 5,
    textAlign: "center",
    textAlignVertical:"center",
    width:"19%"
  },
});
