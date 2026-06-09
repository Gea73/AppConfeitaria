import { colors } from "@/styles/global";
import { OrderItem } from "@/types/ordemItem";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";


type OrderCardProps = {
    uid: string;
    items: OrderItem[];
    total: number;

};

function getItems(items: OrderItem[]) {
    let itemString = ""
    items.forEach(e => {
        itemString += `Item ${e.name} X ${e.quantity} Preço ${e.price}`
    });

    return itemString
}

export default function OrderCard(props: OrderCardProps) {
    const [items, setItems] = useState(getItems(props.items))

    return (
        <View style={stylesheet.container}>
            <Text>
                {items}
            </Text>

        </View>
    )
}


const stylesheet = StyleSheet.create({
    container: {
        paddingVertical: "2%",
        borderWidth: 0.7,
        borderColor: colors.details,
        flexDirection: "row",
    },
})
