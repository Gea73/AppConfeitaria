import { Button } from "@/components/button";
import NoOrders from "@/components/noOrders";
import OrderCard from "@/components/OrderCard";
import { TopLogo } from "@/components/topLogo";
import { auth } from "@/firebase/firebaseConfig";
import { Order } from "@/models/order";
import { User } from "@/models/user";
import { orderService } from "@/services/orderService";
import { userService } from "@/services/userService";
import { colors, spacing } from "@/styles/global";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [lastOrder, setLastOrder] = useState<Order>();
    const [loading, setLoading] = useState<boolean>(true);



    useEffect(() => {
        async function getUser(): Promise<void> {
            const uid = auth.currentUser?.uid;
            if (uid) {
                const user = await userService.getUser(uid, null);
                setUser(user);
            }
        }
        getUser();
    }, []);

    useEffect(() => {
        if (!user) {
            return
        }
        const unsubscribe = orderService.subscribeToOrders(user?.getUid(), (lastOrder) => {
            setLastOrder(lastOrder.at(-1));
            setLoading(false)
        })
        return () => unsubscribe()

    }, [user]);

    if (loading) {
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


    return (<>
        <SafeAreaProvider style={{ backgroundColor: "white" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <TopLogo></TopLogo>
                {!lastOrder ? (
                    <NoOrders isVisible={true}></NoOrders>
                ) : (

                    <OrderCard

                        uid={lastOrder.getUid() || String(Date.now())}
                        items={lastOrder.getItems()}
                        status={lastOrder.getStatus()}
                        total={lastOrder
                            .getItems()
                            .reduce((sum, i) => sum + i.price * i.quantity, 0)}
                    />
                )}



                <View style={stylesheet.container}>
                    <Button text="Novo Pedido" onPress={() => router.push("/order/makeOrder")}></Button>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    </>)
}

const stylesheet = StyleSheet.create({

    imageContainer: {
        alignItems: "center"
    },
    container: {
        alignItems: "center"
    },
    centerImage: {
        width: 350,
        height: 300,
        resizeMode: "contain"

    },
    text: {
        color: colors.text,
        fontFamily: "Shafarik-Regular"
    },
    button: {
        padding: spacing.md,
        paddingHorizontal: spacing.xl + spacing.xl,
        backgroundColor: colors.main,
        borderRadius: 18

    }
})