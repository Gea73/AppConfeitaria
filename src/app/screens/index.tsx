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
import { colors, spacing } from "@/styles/global";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function Login() {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const { signInWithGoogle, isReady } = useGoogleSignIn()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("");
  const [errorBar, setErrorBar] = useState('')

  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(''), 3000);
  }

  const handleLogin = async () => {
    try {
      await signInUser(email, password)
    } catch (e: any) {

      showErrorBar(firebaseErrorMessage(e.code));
    }
  }
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle()
      console.log(user?.user)
    } catch (e: any) {
      showErrorBar(firebaseErrorMessage(e.code));
    }
  }
  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ErrorBar message={errorBar}></ErrorBar>
          <KeyboardAvoidingView keyboardVerticalOffset={15} style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>

              <TopLogo></TopLogo>
              <Title text="Patisserie"></Title>
              <View style={stylesheet.formContainer}>

                <FormLabel text="Email"></FormLabel>
                <EmailInput onChangeText={setEmail} placeHolder="Digite seu email"></EmailInput>
                <FormLabel text="Senha"></FormLabel>
                <PasswordInput onChangeText={setPassword} placeHolder="Digite sua senha"></PasswordInput>

                <View style={stylesheet.forgotPasswordContainer}>
                  <Text style={stylesheet.forgotPasswordText}>Esqueceu sua senha?</Text>
                </View>

                <View style={stylesheet.buttonContainer}>
                  <Button onPress={handleLogin} text="Entrar"></Button>
                </View>

                <View style={stylesheet.signUpContainer}>
                  <Text style={stylesheet.signUpText}>Não tem uma conta?</Text>
                </View>
              </View>

              <View style={stylesheet.twoButtonsContainer} >
                <ButtonSquare onPress={() => { }} text="Cadastre-se"></ButtonSquare>
                <ButtonGoogle onPress={handleGoogleLogin} isReady={isReady}></ButtonGoogle>
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
    marginTop: spacing.lg

  },

  buttonContainer: {
    marginTop: spacing.md
  },

  twoButtonsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.main,
    marginTop: spacing.xs,
    paddingTop: spacing.md,
    flexDirection: "row",
    justifyContent: "center",
    gap: "10%"
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

  signUpContainer: {
    marginTop: spacing.md
  },
  signUpText: {
    color: colors.main,
  },



});
