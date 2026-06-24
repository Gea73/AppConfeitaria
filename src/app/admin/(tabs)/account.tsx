import AccountCard from "@/components/cards/accountCard";
import { useCartContext } from "@/context/cartContext";
import { signOutUser } from "@/firebase/authentication";
import useGetUser from "@/hooks/getUser";
import { User } from "@/models/user";
import { colors, typography } from "@/styles/global";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const { ClearCart } = useCartContext();
  setUser(useGetUser())

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
          <AccountCard text="Alterar Dados" icon="information-circle-outline" onPress={() => { }}></AccountCard>
          <AccountCard text="Endereços" icon="location" onPress={() => { }}></AccountCard>
          <AccountCard text="Sair" icon="exit-outline" onPress={() => {
            ClearCart();
            signOutUser();
            router.replace("/auth/signIn");
          }}></AccountCard>

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
