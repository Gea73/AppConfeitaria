import ErrorBar from "@/components/errorBar";
import FoodMenuItem from "@/components/FoodMenuItem";
import { colors, typography } from "@/styles/global";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function MakeOrder() {
    const [errorBar, setErrorBar] = useState('')
    const showErrorBar = (message: string) => {
        setErrorBar(message);
        setTimeout(() => setErrorBar(''), 3000);
    }

    const menu = [
        {
            id: "uid1",
            name: "Item 1",
            description: "Description",
            price: 1.50
        },
        {
            id: "uid2",
            name: "Item 2",
            description: "Description",
            price: 2.50
        },
        {
            id: "uid3",
            name: "Item 3",
            description: "Description Descript",
            price: 3
        }
    ]

   
    return (
        <>
           <View style={stylesheet.header}>
                        <Text style={stylesheet.headerText}>Patisserie</Text>
                    </View>
        
            <SafeAreaProvider style={{ backgroundColor: "white" }}>
                
                <SafeAreaView style={{ flex: 1 }}>
                    
                    <ErrorBar message={errorBar}></ErrorBar>
                 
                    <FlatList data={menu} renderItem={({ item }) => <FoodMenuItem name={item.name} description={item.description} price={item.price} quantity={0}/>} keyExtractor={item => item.id}>
                    </FlatList>


                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}
const stylesheet = StyleSheet.create({
    header: {
        paddingTop:"10%",
        paddingBottom: 10,
        backgroundColor: colors.main

    },
    headerText: {
        color: colors.secondary,
        fontSize: typography.title,
        fontFamily: "Shafarik-Regular",
        textAlign: "center"
    }
})