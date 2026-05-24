import { colors, spacing } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

export default function ErrorBar({ message }: { message: string }) {
    if (!message) return null;
    return (
        <View style={stylesheet.errorBarContainer}>
            <Text style={stylesheet.errorText}>{message}</Text>
        </View>
    )
}

const stylesheet = StyleSheet.create({
    errorBarContainer: {
        backgroundColor: "red",
        padding: spacing.lg,
        borderRadius: 10,
        position:"absolute",
        zIndex:1,
        top:"3%",
        width:"100%"

    },
    errorText: {
        textAlign:"center",
        color: colors.text,
        fontWeight: "bold"
    }
})