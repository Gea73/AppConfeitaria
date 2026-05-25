import { colors, spacing } from "@/styles/global";
import { Image, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (<>
        <SafeAreaProvider style={{ backgroundColor: "white" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={stylesheet.imageContainer}>
                    <Image style={stylesheet.centerImage} source={require("@/assets/images/noOrders.png")} />
                </View>

                <View style={stylesheet.container}>
                    <TouchableOpacity style={stylesheet.button}><Text style={stylesheet.text}>Novo Pedido</Text></TouchableOpacity>
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
        backgroundColor: colors.primary,
        borderRadius: 18

    }
})