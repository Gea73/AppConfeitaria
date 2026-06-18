import { useCartContext } from "@/context/cartContext";
import { signOutUser } from "@/firebase/authentication";
import { auth } from "@/firebase/firebaseConfig";
import { User } from "@/models/user";
import { userService } from "@/services/userService";
import { colors, spacing, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const { ClearCart } = useCartContext();
  useEffect(() => {
    async function getUser(): Promise<void> {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const user = await userService.getUser(uid);
        setUser(user);
      }
    }
    getUser();
  }, []);

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
          <TouchableOpacity>
            <View style={stylesheet.cardContainer}>
              <Text numberOfLines={1} style={stylesheet.cardText}>
                Alterar dados
              </Text>
              <Ionicons
                name="information-circle-outline"
                size={30}
                color={colors.main}
                style={stylesheet.cardIcon}
              ></Ionicons>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={stylesheet.cardContainer}>
              <Text numberOfLines={1} style={stylesheet.cardText}>
                Endereços
              </Text>
              <Ionicons
                name="location"
                size={30}
                color={colors.main}
                style={stylesheet.cardIcon}
              ></Ionicons>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              ClearCart();
              signOutUser();
              router.replace("/auth/signIn");
            }}
          >
            <View style={stylesheet.cardContainer}>
              <Text numberOfLines={1} style={stylesheet.cardText}>
                Sair
              </Text>
              <Ionicons
                name="exit-outline"
                size={30}
                color={colors.main}
                style={stylesheet.cardIcon}
              ></Ionicons>
            </View>
          </TouchableOpacity>
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
