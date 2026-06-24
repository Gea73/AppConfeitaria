import { CartProvider } from "@/context/cartContext";
import { Stack } from "expo-router";

export default function Layouy() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}
