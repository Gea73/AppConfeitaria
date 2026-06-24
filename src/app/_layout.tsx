import { auth } from "@/firebase/firebaseConfig";
import { userService } from "@/services/userService";
import { router, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userSignIn) => {
      try {
        if (userSignIn) {
          const user = await userService.getUser(userSignIn.uid);
          router.replace(
            user?.getRole() === "admin" ? "/admin/home" : "/user/home",
          );
          return;
        }

        router.replace("/auth/signIn");
      } catch (error) {
        router.replace("/auth/signIn");
      }
    });
    return () => unsubscribe();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
