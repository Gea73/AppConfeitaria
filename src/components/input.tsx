import { colors, spacing } from "@/styles/global"
import { StyleSheet, TextInput } from "react-native"
type InputProps = {
    onChangeText: (text: string) => void,
    placeHolder: string

}


export function Input(props: InputProps) {
    return (
        <TextInput onChangeText={props.onChangeText} placeholder={props.placeHolder} placeholderTextColor={colors.details} style={stylesheet.input} />

    )
}

const stylesheet = StyleSheet.create({
    input: {
        borderWidth: 1,
        width: "80%",
        padding: spacing.sm,
        marginTop: spacing.xs,
        borderColor: colors.details,
        borderRadius: 12,

    },
})