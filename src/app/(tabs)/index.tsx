import { View, Text, StyleSheet } from "react-native";

export default function Home() {
    return (<>

        <View style={stylesheet.container}>
            <Text>Hello</Text>
        </View>
    </>)
}

const stylesheet = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent:"center",
        alignItems:"center"
    }
})