import { colors, spacing } from "@/styles/global"
import { StyleSheet, TextInput } from "react-native"
type EmailInputProps = {
    onChangeText: (text: string) => void,
    placeHolder: string

}


export function EmailInput(props: EmailInputProps) {
    return (
        <TextInput keyboardType="email-address" onChangeText={props.onChangeText} placeholder={props.placeHolder} placeholderTextColor={colors.details} style={stylesheet.emailInput} />

    )
}

const stylesheet = StyleSheet.create({
    emailInput: {
        borderWidth: 1,
        width: "80%",
        padding: spacing.sm,
        marginTop: spacing.xs,
        borderColor: colors.details,
        borderRadius: 12,

    },
})