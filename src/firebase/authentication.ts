import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, validatePassword } from "firebase/auth";
import { auth } from "./firebaseConfig";



export async function signUpUser(email: string, password: string) {

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

export async function validateUserPassword(password: string) {
    try {
        const status = await validatePassword(getAuth(), password)
        if (!status.isValid) {
            throw new Error("Senha deve conter 8 caracteres com letras,números e caracteres especiais")
        }
    } catch (error) {
        throw error
    }
}

export async function signOutUser() {
    try {
        await signOut(auth)
    } catch (error) {
        throw error
    }
}

export async function resetPassword(email: string) {
    try {
        await sendPasswordResetEmail(auth, email)
        return true
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