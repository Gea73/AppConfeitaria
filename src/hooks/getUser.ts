import { auth } from "@/firebase/firebaseConfig";
import { User } from "@/models/user";
import { userService } from "@/services/userService";
import { useEffect } from "react";

export default function useGetUser(): User | null {
    let result = null;
    useEffect(() => {
        async function getUser() {
            const uid = auth.currentUser?.uid;
            if (uid) {
                const user = await userService.getUser(uid);
                result = user
            }

        }
        getUser();
    }, []);

    return result;
}