import { colors, spacing, typography } from "@/styles/global";
import { OrderItem } from "@/types/ordemItem";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


type CartOverlayProps = {
    cart: OrderItem[],
    getTotal: () => number
}

export function CartOverlay(props: CartOverlayProps) {
    if (props.cart.length <= 0) {
        return;
    }
    return (
        <>
            <View style={stylesheet.container}>
                <Text style={stylesheet.text}>
                    Total:R$ {props.getTotal().toFixed(2).replace(".", ",")}
                </Text>
                <Text style={stylesheet.text}>
                    Itens:{props.cart.length}
                </Text>

                <TouchableOpacity onPress={() => router.push("/order/checkout")} style={stylesheet.button}>
                    <Text style={stylesheet.buttonText} >Ver Carrinho</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const stylesheet = StyleSheet.create({
    container: {
        backgroundColor: colors.details
        , flexDirection: "row",
        gap: "10%",
        alignItems: "center"
    },
    text: {
        fontSize: typography.text,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: colors.main,
        borderRadius: 7,
        padding: spacing.xs,


    },
    buttonText: {
        fontWeight: "bold",
        color: colors.text,

    }

})