import LoadingWheel from "@/components/loadingWheel";
import { authService } from "@/services/authService";
//import { userService } from "@/services/userService";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function Layout() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const user = await authService.getCurrentUser();

        if (user) {
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
    })();
  }, []);

  if (loading) {
    return <LoadingWheel></LoadingWheel>;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
