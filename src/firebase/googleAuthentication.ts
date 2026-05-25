
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential, UserCredential } from "firebase/auth";
import { auth } from "./firebaseConfig";


WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CONFIG = {
    webClientId: '175660946385-dscvgf6ajdmqtu0i0igdf772jco29jot.apps.googleusercontent.com',
  androidClientId: '175660946385-9h3bebt5o3n8u5996nsketkvt8mgl19h.apps.googleusercontent.com',
  iosClientId: '175660946385-sbf19hmphkn54cvo7mkino1eqki8hsgn.apps.googleusercontent.com', scopes:["profile","email"]
}




export function useGoogleSignIn(){
const[request,response,promptAsync]= Google.useAuthRequest(GOOGLE_CONFIG)

const signInWithGoogle = async(): Promise<UserCredential | null> => {
    console.log(request?.redirectUri)
    const result = await promptAsync()

    if(result.type !== "success"){
        return null
    }

    const {id_token} = result.params
    const credential = GoogleAuthProvider.credential(id_token)
    return signInWithCredential(auth,credential)
}
return {
    signInWithGoogle,
    isReady:!!request
}
}