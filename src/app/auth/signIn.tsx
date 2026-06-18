import { Button } from "@/components/button";
import { ButtonGoogle } from "@/components/buttonGoogle";
import { ButtonSquare } from "@/components/buttonSquare";
import { EmailInput } from "@/components/emailInput";
import ErrorBar from "@/components/errorBar";
import { FormLabel } from "@/components/formLabel";
import { PasswordInput } from "@/components/passwordInput";
import { Title } from "@/components/title";
import { TopLogo } from "@/components/topLogo";
import { signInUser } from "@/firebase/authentication";
import { firebaseErrorMessage } from "@/firebase/firebaseErrors";
import { useGoogleSignIn } from "@/firebase/googleAuthentication";
import { userService } from "@/services/userService";
import { colors, spacing } from "@/styles/global";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { signInWithGoogle, isReady } = useGoogleSignIn();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorBar, setErrorBar] = useState("");

  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };

  const handleLogin = async () => {
    try {
      const result = await signInUser(email, password);

      if (result) {
        const admin = await userService.getUser(result.uid);
        if (admin?.getRole() === "admin") {
          router.replace("/admin/home");
          return;
        }
        router.replace("/user/home");
      }
    } catch (e: any) {
      showErrorBar(firebaseErrorMessage(e.code));
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result?.user;
      if (!user || !user.displayName || !user.email) {
        throw new Error("Login com Google não retornou dados");
      }

      const userExists = await userService.getUser(user.uid);
      if (!userExists) {
        await userService.createUser(user?.uid, user?.displayName, user?.email);
      }

      if (user) {
        const admin = await userService.getUser(user.uid);
        if (admin?.getRole() === "admin") {
          router.replace("/admin/home");
          return;
        }
        router.replace("/user/home");
      }
    } catch (e: any) {
      showErrorBar(firebaseErrorMessage(e.code));
    }
  };
  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ErrorBar message={errorBar}></ErrorBar>
          <KeyboardAvoidingView
            keyboardVerticalOffset={15}
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView>
              <TopLogo></TopLogo>

              <Title text="Patisserie"></Title>
              <View style={stylesheet.formContainer}>
                <FormLabel text="Email"></FormLabel>
                <EmailInput
                  onChangeText={setEmail}
                  placeHolder="Digite seu email"
                ></EmailInput>
                <FormLabel text="Senha"></FormLabel>
                <PasswordInput
                  onChangeText={setPassword}
                  placeHolder="Digite sua senha"
                ></PasswordInput>

                <View style={stylesheet.forgotPasswordContainer}>
                  <Link href={"/auth/forgotPassword"}>
                    <Text style={stylesheet.forgotPasswordText}>
                      Esqueceu sua senha?
                    </Text>
                  </Link>
                </View>

                <View style={stylesheet.buttonContainer}>
                  <Button onPress={handleLogin} text="Entrar"></Button>
                </View>

                <View style={stylesheet.signUpContainer}>
                  <Text style={stylesheet.signUpText}>Não tem uma conta?</Text>
                </View>
              </View>

              <View style={stylesheet.twoButtonsContainer}>
                <ButtonSquare
                  onPress={() => router.push("/auth/signUp")}
                  text="Cadastre-se"
                ></ButtonSquare>
                <ButtonGoogle
                  onPress={handleGoogleLogin}
                  isReady={isReady}
                ></ButtonGoogle>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const stylesheet = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    marginTop: spacing.lg,
  },

  buttonContainer: {
    marginTop: spacing.md,
  },

  twoButtonsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.main,
    marginTop: spacing.xs,
    paddingTop: spacing.md,
    flexDirection: "row",
    justifyContent: "center",
    gap: "10%",
  },

  forgotPasswordContainer: {
    marginTop: 3,
    alignSelf: "flex-start",
    marginLeft: "13%",
  },
  forgotPasswordText: {
    color: colors.main,
    textDecorationLine: "underline",
  },

  signUpContainer: {
    marginTop: spacing.md,
  },
  signUpText: {
    color: colors.main,
  },
});
