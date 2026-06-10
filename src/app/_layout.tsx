import { CartProvider } from "@/context/cartContext";
import { auth } from "@/firebase/firebaseConfig";
import { userService } from "@/services/userService";
import { router, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (dbUser) => {
      try {
        if (dbUser) {
          const user = await userService.getUser(dbUser.uid, null);
          router.replace(
            user?.getRole() === "admin" ? "/admin/home" : "/user/home",
          );
        } else {
          router.replace("/auth/signIn");
        }
      } catch (error) {
        router.replace("/auth/signIn");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}
