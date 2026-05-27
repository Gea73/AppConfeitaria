import { Button } from "@/components/button";
import { EmailInput } from "@/components/emailInput";
import ErrorBar from "@/components/errorBar";
import { FormLabel } from "@/components/formLabel";
import { Title } from "@/components/title";
import { TopLogo } from "@/components/topLogo";
import { resetPassword } from "@/firebase/authentication";
import { firebaseErrorMessage } from "@/firebase/firebaseErrors";
import { colors, spacing } from "@/styles/global";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [errorBar, setErrorBar] = useState('')
    const handleResetPassword = async () => {
        try {
            if(!email){
                showErrorBar("Email invalido")
                return
            }
            await resetPassword(email)

        } catch (e: any) {
            showErrorBar(firebaseErrorMessage(e.code));
        }

    }

    const showErrorBar = (message: string) => {
        setErrorBar(message);
        setTimeout(() => setErrorBar(''), 3000);
    }


    return (
        <>
            <SafeAreaProvider style={{ backgroundColor: "white" }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ErrorBar message={errorBar}></ErrorBar>
                    <KeyboardAvoidingView keyboardVerticalOffset={15} style={{ flex: 1 }}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <ScrollView>

                            <TopLogo></TopLogo>
                            <Title text="Patisserie"></Title>
                            <View style={stylesheet.formContainer}>

                                <FormLabel text="Email"></FormLabel>
                                <EmailInput onChangeText={setEmail} placeHolder="Digite o email para recuperação"></EmailInput>


                                <View style={stylesheet.buttonContainer}>
                                    <Button onPress={handleResetPassword} text="Redefinir Senha"></Button>
                                </View>

                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}

const stylesheet = StyleSheet.create({

    formContainer: {
        alignItems: "center",
        marginTop: spacing.lg

    },

    buttonContainer: {
        marginTop: spacing.md
    },

    twoButtonsContainer: {
        borderTopWidth: 1,
        borderTopColor: colors.main,
        marginTop: spacing.xs,
        paddingTop: spacing.md,
        flexDirection: "row",
        justifyContent: "center",
        gap: "10%"
    },

    forgotPasswordContainer: {
        marginTop: 3,
        alignSelf: "flex-start",
        marginLeft: "13%"
    },
    forgotPasswordText: {
        color: colors.main,
        textDecorationLine: "underline"
    },

    signUpContainer: {
        marginTop: spacing.md
    },
    signUpText: {
        color: colors.main,
    },



});
