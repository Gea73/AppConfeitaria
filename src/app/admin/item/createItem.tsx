import { Button } from "@/components/buttons/button";
import ItemCardNoButton from "@/components/cards/ItemCardNoButton";
import ErrorBar from "@/components/errorBar";
import { FormLabel } from "@/components/forms/formLabel";
import { Input } from "@/components/forms/input";
import { NumberInput } from "@/components/forms/numberInput";
import SuccessBar from "@/components/successBar";
import { Title } from "@/components/title";
import { itemService } from "@/services/itemService";
import { spacing } from "@/styles/global";
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

export default function CreateItem() {
  const [errorBar, setErrorBar] = useState("");
  const [successBar, setSuccessBar] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };

  const showSuccessBar = (message: string) => {
    setSuccessBar(message);
    setTimeout(() => setSuccessBar(""), 3000);
  };

  async function HandleCreateItem() {
    try {
      const result = await itemService.createItem(
        name,
        description,
        Number(price),
        imageUrl,
      );
      showSuccessBar("Item criado");
      setTimeout(() => router.back(), 1000);
    } catch (e: any) {
      showErrorBar(String(e));
    }
  }
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
                <Input
                  onChangeText={setName}
                  placeHolder="Nome do Item"
                ></Input>
                <FormLabel text="Descrição"></FormLabel>
                <Input
                  onChangeText={setDescription}
                  placeHolder="Descrição do Item"
                ></Input>
                <FormLabel text="Preço"></FormLabel>
                <NumberInput
                  onChangeText={setPrice}
                  placeHolder="Preço do Item"
                ></NumberInput>
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

  itemPreviewContainer: {
    margin: "auto",
    maxWidth: "90%",
  },
});
