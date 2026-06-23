import { colors, spacing, typography } from "@/styles/global";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
    onPress: () => void,
    text: string
}

export function Button(props: ButtonProps) {
    return (
        <TouchableOpacity onPress={props.onPress} style={stylesheet.button}>
            <Text style={stylesheet.btnText}>{props.text}</Text>
        </TouchableOpacity>
    )

}

const stylesheet = StyleSheet.create({
    button: {
        padding: spacing.md,
        paddingHorizontal: spacing.xl * 2.5,
        backgroundColor: colors.main,
        borderRadius: 24,
    },
    btnText: {
        textAlign: "center",
        fontSize: typography.text,
        color: colors.text,
        fontWeight: "bold",
        fontFamily: "Shafarik-Regular",
    },

})

