import { Button } from "@/components/buttons/button";
import ErrorBar from "@/components/errorBar";
import { EmailInput } from "@/components/forms/emailInput";
import { FormLabel } from "@/components/forms/formLabel";
import SuccessBar from "@/components/successBar";
import { Title } from "@/components/title";
import { TopLogo } from "@/components/topLogo";
import { spacing } from "@/styles/global";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorBar, setErrorBar] = useState("");
  const [successBar, setSuccessBar] = useState("");
  const handleResetPassword = async () => {
    try {
      if (!email) {
        showErrorBar("Email invalido");
        return;
      }
      // await resetPassword(email);
      showSuccessBar("Email enviado com sucesso");
    } catch (error: any) {
      showErrorBar(error.message);
    }
  };

  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };
  const showSuccessBar = (message: string) => {
    setSuccessBar(message);
    setTimeout(() => setSuccessBar(""), 3000);
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
                <FormLabel text="Email"></FormLabel>
                <EmailInput
                  onChangeText={setEmail}
                  placeHolder="Digite o email para recuperação"
                ></EmailInput>

                <View style={stylesheet.buttonContainer}>
                  <Button
                    onPress={handleResetPassword}
                    text="Redefinir Senha"
                  ></Button>
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
    marginTop: spacing.lg,
  },

  buttonContainer: {
    marginTop: spacing.md,
  },
});
