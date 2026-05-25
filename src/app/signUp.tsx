import { Button } from "@/components/button";
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
  View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function SignUp() {
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


                <View style={stylesheet.buttonContainer}>
                  <Button onPress={handleLogin} text="Cadastre-se"></Button>
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
