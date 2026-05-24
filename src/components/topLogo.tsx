import { Image, StyleSheet, View } from "react-native"
export function TopLogo() {
    return (<View style={stylesheet.logoContainer}>
        <Image
            style={stylesheet.logo}
            source={require("@/assets/images/logo.png")}
        />
    </View>)
}


const stylesheet = StyleSheet.create({
    logoContainer: {
        alignItems: "center",
    },
    logo: {
        width: 300,
        height: 200,
        resizeMode: "contain",
    }
})