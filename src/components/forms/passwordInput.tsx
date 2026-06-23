import { colors, spacing } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type PasswordInputProps = {
    onChangeText: (text: string) => void,
    placeHolder: string

}

export function PasswordInput(props: PasswordInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    return (
        <View style={stylesheet.passwordContainer}>

            <TextInput onChangeText={props.onChangeText} secureTextEntry={!isPasswordVisible} placeholder={props.placeHolder} placeholderTextColor={colors.details} style={stylesheet.inputPassword} />

            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={stylesheet.eyeIcon}>
                <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={20} color={colors.details} /></TouchableOpacity>
        </View>
    )
}

const stylesheet = StyleSheet.create({
    passwordContainer: {
        marginTop: spacing.xs,
        flexDirection: "row",
        alignItems: "center",

    },
    inputPassword: {
        borderWidth: 1,
        width: "80%",
        padding: spacing.sm,
        borderColor: colors.details,
        borderRadius: 12,
    },
    eyeIcon: {
        position: "absolute",
        left: "70%"
    }

})