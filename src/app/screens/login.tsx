import { StyleSheet, Text, View } from "react-native";

export default function Login(){
    return(<>
    
    <View style={stylesheet.container}>
        <Text>Login</Text>
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