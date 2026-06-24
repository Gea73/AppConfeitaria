import { Title } from "@/components/title";
import { TopLogo } from "@/components/topLogo";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AdminHome() {
  return (
    <>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Title text="Admin"></Title>
          <TopLogo></TopLogo>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const stylesheet = StyleSheet.create({});
