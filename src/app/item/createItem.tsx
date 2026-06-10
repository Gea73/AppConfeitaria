import { Button } from "@/components/button";
import ErrorBar from "@/components/errorBar";
import { FormLabel } from "@/components/formLabel";
import { Input } from "@/components/input";
import ItemCardNoButton from "@/components/ItemCardNoButton";
import { Title } from "@/components/title";
import { itemService } from "@/services/itemService";
import { colors, spacing } from "@/styles/global";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CreateItem() {
  const [errorBar, setErrorBar] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };

  async function HandleCreateItem() {
    try {
      const result = await itemService.createItem(
        name,
        description,
        Number(price),
        imageUrl,
      );
      console.log(result);
    } catch (e: any) {
      showErrorBar(String(e));
    }
  }
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
            <View style={stylesheet.itemPreviewContainer}>
              <ItemCardNoButton
                uid=""
                name={name}
                description={description}
                price={Number(price)}
                imageUrl={imageUrl}
              ></ItemCardNoButton>
            </View>
            <Title text="Criando Item"></Title>
            <View style={stylesheet.formContainer}>
              <FormLabel text="Nome"></FormLabel>
              <Input onChangeText={setName} placeHolder="Nome do Item"></Input>
              <FormLabel text="Descrição"></FormLabel>
              <Input
                onChangeText={setDescription}
                placeHolder="Descrição do Item"
              ></Input>
              <FormLabel text="Preço"></FormLabel>
              <Input
                onChangeText={setPrice}
                placeHolder="Preço do Item"
              ></Input>
              <FormLabel text="Imagem"></FormLabel>
              <Input
                onChangeText={setImageUrl}
                placeHolder="Coloque sua imagem"
              ></Input>

              <View style={stylesheet.buttonContainer}>
                <Button
                  onPress={() => HandleCreateItem()}
                  text="Criar"
                ></Button>
              </View>
            </View>
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
  itemPreviewContainer: {
    margin: "auto",
    maxWidth: "90%",
  },
});
