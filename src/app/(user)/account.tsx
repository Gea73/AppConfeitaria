import { colors, spacing, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function Account() {
    const username = "Nomezinho"
    return (<>

        <SafeAreaProvider style={{ backgroundColor: "white" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={stylesheet.header}>
                    <Text style={stylesheet.headerText}>Patisserie</Text>
                </View>

                <View style={stylesheet.usernameContainer}>
                    <Image source={require("@/assets/images/userImage.png")} />
                    <Text style={stylesheet.usernameText}>{username}</Text>
                </View>
                <View style={stylesheet.cardContainer}>
                    <Text numberOfLines={1} style={stylesheet.cardText}>Alterar dados</Text>
                    <Ionicons name="information-circle-outline" size={30} color={colors.main} style={stylesheet.cardIcon}></Ionicons>
                </View>
                <View style={stylesheet.cardContainer}>
                    <Text numberOfLines={1} style={stylesheet.cardText}>Endereços</Text>
                    <Ionicons name="location" size={30} color={colors.main} style={stylesheet.cardIcon}></Ionicons>
                </View>
                <View style={stylesheet.cardContainer}>
                    <Text numberOfLines={1} style={stylesheet.cardText}>Sair</Text>
                    <Ionicons name="exit-outline" size={30} color={colors.main} style={stylesheet.cardIcon}></Ionicons>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    </>)
}

const stylesheet = StyleSheet.create({
    header: {
        paddingVertical: 10,
        backgroundColor: colors.main

    },
    headerText: {
        color: colors.secondary,
        fontSize: typography.title,
        fontFamily: "Shafarik-Regular",
        textAlign: "center"
    },
    usernameContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.main,
        width: "100%",
        gap: "10%",
        paddingHorizontal: "10%"
    },
    usernameText: {
        color: colors.main,
        fontSize: typography.subtitle,
        fontWeight: "bold"
    },
    cardContainer: {
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: colors.main,
        width: "100%",
        paddingTop: spacing.lg,
        paddingBottom: spacing.lg,
        alignItems: "center",
        paddingLeft: "10%"

    },
    cardText: {
        color: colors.main,
        fontSize: typography.subtitle,
        textAlign: "left",
        fontWeight: "bold",
        flex: 8

    },
    cardIcon: {
        flex: 2,
        position:"absolute",
        left:"95%"
    }
})