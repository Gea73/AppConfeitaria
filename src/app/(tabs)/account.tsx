import { View ,Text,StyleSheet} from "react-native";

export default function Account(){
    return(<>
    
    <View style={stylesheet.container}>
        <Text>Account</Text>
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