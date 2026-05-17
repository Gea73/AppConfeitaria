import { colors, spacing, typography } from "@/styles/global";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function Login() {
    return (<>
        <SafeAreaProvider style={{ backgroundColor: "white" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={stylesheet.titleContainer}>
                    <Text style={stylesheet.title}>Confeitaria</Text>
                    <Image source={}/>
                </View>

                <View style={stylesheet.formContainer}>
                    <Text style={stylesheet.text}>Primeiro entre na sua conta</Text>
                    <Text style={stylesheet.text}>Nome ou Email</Text>
                    <TextInput style={stylesheet.input}></TextInput>
                    <Text style={stylesheet.text}>Senha</Text>
                    <TextInput style={stylesheet.input}></TextInput>
                    <TouchableOpacity style={stylesheet.button}>
                        <Text style={stylesheet.btnText}>Entrar</Text>
                    </TouchableOpacity>
                    <Text style={stylesheet.text}>Não tem uma conta? Cadastre-se</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>

    </>)
}

const stylesheet = StyleSheet.create({

    titleContainer: {
        marginTop: spacing.md,
        justifyContent: "center",
        alignItems: "center",

    }
    , title: {
        color: colors.primary,
        fontSize: typography.title,
        fontFamily: "Shafarik-Regular"
    }, formContainer: {
        justifyContent: "center",
        alignItems: "center",
    }
    , input: {
        borderWidth: 1,
        width: "80%",
        padding: spacing.sm,
        borderColor: colors.light
        , borderRadius: 20
    },
    button: {
        padding: spacing.md,
        width: "45%",
        paddingHorizontal: spacing.xl + spacing.xl,
        backgroundColor: colors.primary,
        borderRadius: 18

    },
    text: {
        fontSize: typography.subtitle,
         fontFamily: "Shafarik"
    },
    btnText: {
        textAlign: "center",
        fontSize: typography.text,
        color: colors.text,
        fontFamily: "Shafarik"
    },
})