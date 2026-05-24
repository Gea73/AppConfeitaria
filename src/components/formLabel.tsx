import { colors, spacing, typography } from "@/styles/global"
import { StyleSheet, Text, View } from "react-native"

type FormLabelProps = {
    text: string
}

export function FormLabel(props: FormLabelProps) {
    return (
        <View style={stylesheet.labelContainer}>
            <Text style={stylesheet.label}>{props.text}</Text>
        </View>
    )
}

const stylesheet = StyleSheet.create({
    labelContainer: {
        alignSelf: "flex-start",
        marginLeft: "10%",
        marginTop: spacing.xs
    },
    label: {
        textAlign: "left",
        color: colors.main,

        fontSize: typography.subtitle,
        fontFamily: "Shafarik",
    }
})