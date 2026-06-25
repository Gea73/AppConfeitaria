import { OrderItem } from "@/types/orderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


export function useCart() {
    const [cart, setCart] = useState<OrderItem[]>([])
    const [isFirstLoading, setIsFirstLoading] = useState(true)

    useEffect(() => {
        AsyncStorage.getItem("cart").then((data) => { setCart(data ? JSON.parse(data) : []) }).finally(() => setIsFirstLoading(false))
    }, [])

    useEffect(() => {
        if (!isFirstLoading) {
            AsyncStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart, isFirstLoading])

    function AddItem(item: OrderItem) {
        setCart(prev => {
            const itemExist = prev.find((i) => i.uid === item.uid)
            if (itemExist) {
                return prev.map((i) => i.uid === item.uid ? { ...i, quantity: i.quantity + 1 } : i)
            }

            return [...prev, { ...item, quantity: 1 }];
        })


    }
    function RemoveItem(item: OrderItem | undefined) {
        if (!item) {
            return;
        }
        setCart(prev => prev.map((i) => i.uid === item.uid ? { ...i, quantity: i.quantity - 1 } : i)
            .filter((i) => i.quantity > 0))

    }
    function ClearCart() {
        setCart([])

    }

    function GetTotal() {
        return cart.reduce((sum, i) => sum + i.quantity * i.price, 0)
    }

    return ({ cart, AddItem, RemoveItem, ClearCart, GetTotal })
}