import { colors } from "@/styles/global";
import { ActivityIndicator, View } from "react-native";

export default function LoadingWheel() {


    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ActivityIndicator
                size={"large"}
                color={colors.main}
            ></ActivityIndicator>
        </View>
    );

}