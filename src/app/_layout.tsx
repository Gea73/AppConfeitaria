import LoadingWheel from "@/components/loadingWheel";
import { auth } from "@/firebase/firebaseConfig";
import { userService } from "@/services/userService";
import { router, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Layout() {
  const [loading, setLoading] = useState<boolean>(true);

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
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingWheel></LoadingWheel>;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
