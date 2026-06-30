
/*
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential, UserCredential } from "firebase/auth";



WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CONFIG = {
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_IOS_CLIENT_ID, scopes: ["profile", "email"]
}




export function useGoogleSignIn() {
    const [request, response, promptAsync] = Google.useAuthRequest(GOOGLE_CONFIG)

    const signInWithGoogle = async (): Promise<UserCredential | null> => {
        console.log(request?.redirectUri)
        const result = await promptAsync()

        if (result.type !== "success") {
            return null
        }

        const { id_token } = result.params
        const credential = GoogleAuthProvider.credential(id_token)
        return signInWithCredential(auth, credential)
    }
    return {
        signInWithGoogle,
        isReady: !!request
    }
}
    */