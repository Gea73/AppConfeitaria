/*
import { auth } from "@/firebase/firebaseConfig";
import { User } from "@/models/user";
import { userService } from "@/services/userService";
import { useEffect, useState } from "react";

export default function useGetUser(): User | null {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        async function getUser() {
            const uid = auth.currentUser?.uid;
            if (!uid) {
                return null
            }

            setUser(await userService.getUser(uid))

        }
        getUser();
    }, []);
    return user

}
    */