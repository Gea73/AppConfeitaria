import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, validatePassword } from "firebase/auth";
import { auth } from "./firebaseConfig";



async function createUser(email: string, password: string) {

    try {


        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        return user
    } catch (error) {
        throw error
    }


}
export async function signInUser(email: string, password: string) {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        return user
    } catch (error) {
        throw error
    }
}

async function validateUserPassword(password: string) {
    try {


        const status = await validatePassword(getAuth(), password)
        if (!status.isValid) {

        }
    } catch (error) {
        throw error
    }
}

async function signOutUser() {

    try {


        await signOutUser()
    } catch (error) {
        throw error
    }
}

/*
const provider = new GoogleAuthProvider()

async function signInGoogle() {
    try {


        const result = await signInWithPopup(auth, provider)

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken
        const user = result.user;

        return user;
    } catch (error) {
        throw error
    }
}
    */