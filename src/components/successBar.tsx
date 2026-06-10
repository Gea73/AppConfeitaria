import { colors, spacing } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

export default function SuccessBar({ message }: { message: string }) {
  if (!message) return null;
  return (
    <View style={stylesheet.successBarContainer}>
      <Text style={stylesheet.successText}>{message}</Text>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  successBarContainer: {
    backgroundColor: "green",
    padding: spacing.lg,
    borderRadius: 10,
    position: "absolute",
    zIndex: 1,
    top: "3%",
    width: "100%",
  },
  successText: {
    textAlign: "center",
    color: colors.text,
    fontWeight: "bold",
  },
});
