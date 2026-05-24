import { colors, spacing, typography } from "@/styles/global"
import { StyleSheet, Text, View } from "react-native"

type TitleProps = {
    text: string
}

export function Title(props: TitleProps) {
    return (
        <View style={stylesheet.titleContainer}>
            <Text style={stylesheet.title}>{props.text}</Text>
        </View>
    )
}


const stylesheet = StyleSheet.create({

    titleContainer: {
        marginTop: spacing.md,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: colors.main,
        fontSize: typography.title,
        fontFamily: "Shafarik-Regular",
    }
}) 