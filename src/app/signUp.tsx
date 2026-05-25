import { ButtonGoogle } from "@/components/buttonGoogle";
import { ButtonSquare } from "@/components/buttonSquare";
import { EmailInput } from "@/components/emailInput";
import ErrorBar from "@/components/errorBar";
import { FormLabel } from "@/components/formLabel";
import { Input } from "@/components/input";
import { PasswordInput } from "@/components/passwordInput";
import { Title } from "@/components/title";
import { TopLogo } from "@/components/topLogo";
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
  const [name, setName] = useState("")
  const [errorBar, setErrorBar] = useState('')

  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(''), 3000);
  }

  const handleSignUp = async () => {
    try {

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
                <FormLabel text="Nome"></FormLabel>
                <Input onChangeText={setName} placeHolder="Digite seu nome"></Input>
                <FormLabel text="Email"></FormLabel>
                <EmailInput onChangeText={setEmail} placeHolder="Digite seu email"></EmailInput>
                <FormLabel text="Senha"></FormLabel>
                <PasswordInput onChangeText={setPassword} placeHolder="Digite sua senha"></PasswordInput>
                <FormLabel text="Confirme sua Senha"></FormLabel>
                <PasswordInput onChangeText={() => { }} placeHolder="Confirme sua senha"></PasswordInput>

                <View style={stylesheet.twoButtonsContainer} >
                  <ButtonSquare onPress={handleSignUp} text="Cadastre-se"></ButtonSquare>
                  <ButtonGoogle onPress={handleGoogleLogin} isReady={isReady}></ButtonGoogle>
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


});
