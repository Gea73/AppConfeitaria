import { colors, spacing, typography } from "@/styles/global";
import { StyleSheet, Text, TouchableOpacity, } from "react-native";

type ButtonSquareProps = {
    onPress: () => void,
    text: string
}

export function ButtonSquare(props: ButtonSquareProps) {
    return (
        <TouchableOpacity onPress={props.onPress} style={stylesheet.buttonSquare}>
            <Text style={stylesheet.btnSquareText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const stylesheet = StyleSheet.create({
    buttonSquare: {
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

})