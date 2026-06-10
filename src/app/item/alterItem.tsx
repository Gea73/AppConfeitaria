import { Button } from "@/components/button";
import ErrorBar from "@/components/errorBar";
import { FormLabel } from "@/components/formLabel";
import { Input } from "@/components/input";
import ItemCardNoButton from "@/components/ItemCardNoButton";
import { Title } from "@/components/title";
import { Item } from "@/models/item";
import { itemService } from "@/services/itemService";
import { colors, spacing } from "@/styles/global";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AlterItem() {
  const [item, setItem] = useState<Item>();
  const { itemId } = useLocalSearchParams();
  const [errorBar, setErrorBar] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const showErrorBar = (message: string) => {
    setErrorBar(message);
    setTimeout(() => setErrorBar(""), 3000);
  };

  useEffect(() => {
    async function getItem() {
      const item = await itemService.getItem(String(itemId));
      if (item) {
        setItem(item);
        setName(item.getName());
        setDescription(item.getDescription());
        setPrice(item.getPrice().toFixed(2));
        setImageUrl(item.getImageUrl());
      }
    }
    getItem();
  }, [itemId]);

  async function HandleAlterItem() {
    try {
      const result = await itemService.updateItem(
        String(itemId),
        name,
        description,
        Number(price),
        imageUrl,
      );
      console.log(result);
      router.back();
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
            <Title text="Editando Item"></Title>
            <View style={stylesheet.formContainer}>
              <FormLabel text="Nome"></FormLabel>
              <Input onChangeText={setName} placeHolder={name}></Input>
              <FormLabel text="Descrição"></FormLabel>
              <Input
                onChangeText={setDescription}
                placeHolder={description}
              ></Input>
              <FormLabel text="Preço"></FormLabel>
              <Input
                onChangeText={setPrice}
                placeHolder={price.replace(".", ",")}
              ></Input>
              <FormLabel text="Imagem"></FormLabel>
              <Input onChangeText={setImageUrl} placeHolder={imageUrl}></Input>

              <View style={stylesheet.buttonContainer}>
                <Button
                  onPress={() => HandleAlterItem()}
                  text="Alterar"
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
