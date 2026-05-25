import { View ,Text,StyleSheet} from "react-native";

export default function Orders(){
    return(<>
    
    <View style={stylesheet.container}>
        <Text>Orders</Text>
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