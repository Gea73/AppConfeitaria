import AccountCard from "@/components/cards/accountCard";
import { useCartContext } from "@/context/cartContext";
import useGetUser from "@/hooks/getUser";
import { authService } from "@/services/authService";
import { colors, typography } from "@/styles/global";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function Account() {
  const { ClearCart } = useCartContext();
  const user = useGetUser()

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={stylesheet.header}>
            <Text style={stylesheet.headerText}>Patisserie</Text>
          </View>

          <View style={stylesheet.usernameContainer}>
            <Image source={require("@/assets/images/userImage.png")} />
            <Text style={stylesheet.usernameText}>{user?.getName()}</Text>
          </View>

          <AccountCard
            onPress={() => {}}
            text="Alterar Dados"
            icon="information-circle-outline"
          ></AccountCard>
          <AccountCard
            onPress={() => {}}
            text="Endereços"
            icon="location"
          ></AccountCard>
          <AccountCard
            onPress={async () => {
              ClearCart();
              await authService.signOut();
              router.replace("/auth/signIn");
            }}
            text="Sair"
            icon="exit-outline"
          ></AccountCard>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const stylesheet = StyleSheet.create({
  header: {
    paddingVertical: 10,
    backgroundColor: colors.main,
  },
  headerText: {
    color: colors.secondary,
    fontSize: typography.title,
    fontFamily: "Shafarik-Regular",
    textAlign: "center",
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.main,
    width: "100%",
    gap: "10%",
    paddingHorizontal: "10%",
  },
  usernameText: {
    color: colors.main,
    fontSize: typography.subtitle,
    fontWeight: "bold",
  },
});
