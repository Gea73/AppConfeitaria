import { Button } from "@/components/buttons/button";
import ItemCardNoButton from "@/components/cards/ItemCardNoButton";
import ErrorBar from "@/components/errorBar";
import { FormLabel } from "@/components/forms/formLabel";
import { Input } from "@/components/forms/input";
import { Title } from "@/components/title";
import { Item } from "@/models/item";
import { itemService } from "@/services/itemService";
import { colors, spacing, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      
      router.back();
    } catch (e: any) {
      showErrorBar(String(e));
    }
  }

  async function HandleDeleteItem() {
    try {
      Alert.alert("Deletar Item", "Deseja mesmo excluir?", [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          style: "destructive",
          onPress: async () => {
            
              await itemService.deleteItem(
                String(itemId),
              );
              router.back();
      
          },
        },
      ]);

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

            <TouchableOpacity
              style={stylesheet.cancelOrder}
              onPress={() => HandleDeleteItem()}
            >
              <Text style={stylesheet.cancelText}>Excluir</Text>
              <Ionicons name="trash" size={28} color={colors.main}></Ionicons>
            </TouchableOpacity>

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
    alignItems:"center"
    
  },

  cancelOrder: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:"3%",
    marginLeft: "70%",
  },
  cancelText: {
    color: colors.main,
    fontWeight: "bold",
    fontSize: typography.text,
  },
});
