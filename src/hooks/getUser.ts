

import { User } from "@/models/user";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { useEffect, useState } from "react";

export default function useGetUser(): User | null {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        async function getUser() {
            const user = await authService.getCurrentUser()
            if (!user || !user.id) {
                return null
            }

            setUser(await userService.getUser(user.id))

        }
        getUser();
    }, []);
    return user

}
