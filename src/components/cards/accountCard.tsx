import { colors, spacing, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AccountCardProps = {
    text: string
    icon: "information-circle-outline" | "location" | "exit-outline"
    onPress: () => void
}

export default function AccountCard(props: AccountCardProps) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={stylesheet.cardContainer}>
                <Text numberOfLines={1} style={stylesheet.cardText}>
                    {props.text}
                </Text>
                <Ionicons
                    name={props.icon}
                    size={30}
                    color={colors.main}
                    style={stylesheet.cardIcon}
                ></Ionicons>
            </View>
        </TouchableOpacity>
    )
}

const stylesheet = StyleSheet.create({

    cardContainer: {
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: colors.main,
        width: "100%",
        paddingTop: spacing.lg,
        paddingBottom: spacing.lg,
        alignItems: "center",
        paddingLeft: "10%",
    },
    cardText: {
        color: colors.main,
        fontSize: typography.subtitle,
        textAlign: "left",
        fontWeight: "bold",
        flex: 8,
    },
    cardIcon: {
        flex: 2,
        position: "absolute",
        left: "95%",
    },
});
