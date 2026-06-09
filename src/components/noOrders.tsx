import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "./button";
import { TopLogo } from "./topLogo";

type NoOrdersProps = {
    isVisible: boolean
}
export default function NoOrders(props: NoOrdersProps) {
    if (props.isVisible === true) {
        return (

            <>
                <TopLogo></TopLogo>
                <View style={stylesheet.imageContainer}>
                    <Image style={stylesheet.centerImage} source={require("@/assets/images/noOrders.png")} />
                </View>

                <View style={stylesheet.container}>
                    <Button text="Novo Pedido" onPress={() => router.push("/order/makeOrder")}></Button>

                </View>
            </>
        )
    }
    else return;
}
const stylesheet = StyleSheet.create({
    imageContainer: {
        alignItems: "center"
    },
    container: {
        alignItems: "center"
    },
    centerImage: {
        width: 350,
        height: 300,
        resizeMode: "contain"

    },


})