import { Button } from "@/components/button";
import { TopLogo } from "@/components/topLogo";
import { colors, spacing } from "@/styles/global";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AdminHome() {
    return (<>
        <SafeAreaProvider style={{ backgroundColor: "white" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text>Admin</Text>
                <TopLogo></TopLogo>
                <View style={stylesheet.imageContainer}>
                    <Image style={stylesheet.centerImage} source={require("@/assets/images/noOrders.png")} />
                </View>

                <View style={stylesheet.container}>
                    <Button text="Novo Pedido" onPress={() => router.push("/order/makeOrder")}></Button>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    </>)
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
    text: {
        color: colors.text,
        fontFamily: "Shafarik-Regular"
    },
    button: {
        padding: spacing.md,
        paddingHorizontal: spacing.xl + spacing.xl,
        backgroundColor: colors.main,
        borderRadius: 18

    }
})