import { ButtonSquare } from "@/components/buttons/buttonSquare";
import ErrorBar from "@/components/errorBar";
import { EmailInput } from "@/components/forms/emailInput";
import { FormLabel } from "@/components/forms/formLabel";
import { Input } from "@/components/forms/input";
import { PasswordInput } from "@/components/forms/passwordInput";
import SuccessBar from "@/components/successBar";
import { Title } from "@/components/title";
import { TopLogo } from "@/components/topLogo";
import { userService } from "@/services/userService";
import { colors, spacing } from "@/styles/global";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorBar, setErrorBar] = useState("");
  const [successBar, setSuccessBar] = useState("");

  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };
  const showSuccessBar = (message: string) => {
    setSuccessBar(message);
    setTimeout(() => setSuccessBar(""), 3000);
  };

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        showErrorBar("Senhas não coincidem");
        return;
      }

      if (!email) {
        showErrorBar("Email Invalido");
        return;
      }
      await userService.createUser(name, email, password);

      showSuccessBar("Usuário criado com sucesso");
      setTimeout(() => {
        router.replace("/auth/signIn");
      }, 1000);
    } catch (error: any) {
      showErrorBar(error.message);
    }
  };

  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ErrorBar message={errorBar}></ErrorBar>
          <SuccessBar message={successBar}></SuccessBar>
          <KeyboardAvoidingView
            keyboardVerticalOffset={15}
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView>
              <TopLogo></TopLogo>

              <Title text="Patisserie"></Title>
              <View style={stylesheet.formContainer}>
                <FormLabel text="Nome"></FormLabel>
                <Input
                  onChangeText={setName}
                  placeHolder="Digite seu nome"
                ></Input>
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
                <FormLabel text="Confirme sua Senha"></FormLabel>
                <PasswordInput
                  onChangeText={setConfirmPassword}
                  placeHolder="Confirme sua senha"
                ></PasswordInput>
              </View>
              <View style={stylesheet.twoButtonsContainer}>
                <ButtonSquare
                  onPress={handleSignUp}
                  text="Cadastre-se"
                ></ButtonSquare>
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

  twoButtonsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.main,
    marginTop: spacing.xs,
    paddingTop: spacing.md,
    flexDirection: "row",
    justifyContent: "center",
    gap: "10%",
  },
});
