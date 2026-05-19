import { colors, spacing, typography } from "@/styles/global";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={stylesheet.logoContainer}>
            <Image
              style={stylesheet.logo}
              source={require("@/assets/images/logo.png")}
            />
          </View>
          <View style={stylesheet.titleContainer}>
            <Text style={stylesheet.title}>Patisserie</Text>
          </View>

          <View style={stylesheet.formContainer}>
            <Text style={stylesheet.label}>Email</Text>
            <TextInput style={stylesheet.input}></TextInput>
            <Text style={stylesheet.label}>Senha</Text>
            <TextInput style={stylesheet.input}></TextInput>
            <Text>Esqueceu sua senha?</Text>
            <TouchableOpacity style={stylesheet.button}>
              <Text style={stylesheet.btnText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const stylesheet = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  titleContainer: {
    marginTop: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.main,
    fontSize: typography.title,
    fontFamily: "Shafarik-Regular",
  },
  formContainer: {
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    width: "80%",
    padding: spacing.sm,
    borderColor: colors.light,
    borderRadius: 20,
  },
  button: {
    padding: spacing.md,
    width: "45%",
    paddingHorizontal: spacing.xl + spacing.xl,
    backgroundColor: colors.main,
    borderRadius: 20,
  },
  label: {
    textAlign: "left",

    color: colors.main,
    fontWeight: "700",
    fontSize: typography.subtitle,
    fontFamily: "Shafarik",
  },
  btnText: {
    textAlign: "center",
    fontSize: typography.text,
    color: colors.text,
    fontWeight: "bold",
    fontFamily: "Shafarik",
  },
});
