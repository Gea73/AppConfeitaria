import { colors, spacing, typography } from "@/styles/global";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonGoogleProps = {
    onPress: () => void,
    isReady: boolean
}

export function ButtonGoogle(props: ButtonGoogleProps) {
    return (
        <TouchableOpacity disabled={!props.isReady} onPress={props.onPress} style={stylesheet.buttonSquareGoogle}>
            <Image style={stylesheet.googleLogo} source={require("@/assets/images/google-logo-48.png")} />
            <Text style={stylesheet.btnSquareText}>Google</Text>
        </TouchableOpacity>
    )
}

const stylesheet = StyleSheet.create({
    buttonSquareGoogle: {
        padding: spacing.sm,
        width: "40%",
        backgroundColor: colors.main,
        borderRadius: 14,

    },
    btnSquareText: {
        textAlign: "center",
        fontSize: typography.smallText,
        color: colors.text,
        fontWeight: "bold",
        fontFamily: "Shafarik",
    },


    googleLogo: {
        width: 30,
        height: 30,
        position: "absolute",
        right: "85%",
        top: "40%"

    }

})
