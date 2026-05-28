import { colors, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemProps = {
    name: string,
    description: string,
    price: number
    quantity: number
}



export default function FoodMenuItem(props: ItemProps) {
    const [quantity, setQuantity] = useState(0)
    return (
        <View style={stylesheet.container}>
            <Image source={require("@/assets/images/cake.png")}></Image>
            <View style={stylesheet.textContainer}>
                <Text style={stylesheet.nameText}>{props.name}</Text>
                <Text>{props.description}</Text>
                <Text>{props.price}</Text>
                <View style={stylesheet.buttonsContainer}>
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                        <Ionicons name="add-outline" size={20} color={colors.details}></Ionicons>
                    </TouchableOpacity>
                    <Text>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(quantity > 0 ? quantity - 1 : quantity)}>
                        <Ionicons name="remove-outline" size={20} color={colors.details}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const stylesheet = StyleSheet.create({
    container: {
        paddingVertical: "4%",
        borderWidth: 0.7,
        borderColor: colors.details,
        flexDirection: "row"
    },
    textContainer: {
        paddingHorizontal: "5%",
        flexDirection: "column"
    },
    nameText: {
        fontSize: typography.subtitle,
        fontWeight: "bold"
    },
    buttonsContainer: {
        flexDirection: "row"
    }
})