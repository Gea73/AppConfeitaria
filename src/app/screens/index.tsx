import { colors, spacing, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function Login() {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1 }}

            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
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

                <View style={stylesheet.labelContainer}>
                  <Text style={stylesheet.label}>Email</Text>
                </View>

                <TextInput placeholder="Digite seu email" placeholderTextColor={colors.details} style={stylesheet.input} />
                <View style={stylesheet.labelContainer}>
                  <Text style={stylesheet.label}>Senha</Text>
                </View>

                <View style={stylesheet.passwordContainer}>
                  <TextInput secureTextEntry={isPasswordVisible} placeholder="Digite sua senha" placeholderTextColor={colors.details} style={stylesheet.inputPassword} />
                  <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)} style={{ position: "absolute", left: "70%" }}>
                    <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={20} color={colors.details} /></TouchableOpacity>
                </View>

                <View style={stylesheet.forgotPasswordContainer}>
                  <Text style={stylesheet.forgotPasswordText}>Esqueceu sua senha?</Text>
                </View>

                <View style={stylesheet.buttonContainer}>
                  <TouchableOpacity style={stylesheet.button}>
                    <Text style={stylesheet.btnText}>Entrar</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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
    marginTop: spacing.xl

  },
  input: {
    borderWidth: 1,
    width: "80%",
    padding: spacing.sm,
    marginTop: spacing.xs,
    borderColor: colors.details,
    borderRadius: 12,
  },
  inputPassword: {
    borderWidth: 1,
    width: "80%",
    padding: spacing.sm,
    borderColor: colors.details,
    borderRadius: 12,
  },
  labelContainer: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginTop: spacing.xs
  },
  label: {
    textAlign: "left",
    color: colors.main,

    fontSize: typography.subtitle,
    fontFamily: "Shafarik",
  },
  button: {
    padding: spacing.md,
    paddingHorizontal: spacing.xl * 2.5,
    backgroundColor: colors.main,
    borderRadius: 24,
  },
  buttonContainer: {
    marginTop: spacing.md
  },
  btnText: {
    textAlign: "center",
    fontSize: typography.text,
    color: colors.text,
    fontWeight: "bold",
    fontFamily: "Shafarik",
  },
  forgotPasswordContainer: {
    marginTop: 3,
    alignSelf: "flex-start",
    marginLeft: "13%"
  },
  forgotPasswordText: {
    color: colors.main,
    textDecorationLine: "underline"
  },
  passwordContainer: {

    marginTop: spacing.xs,
    flexDirection: "row",
    alignItems: "center",

  }
});
