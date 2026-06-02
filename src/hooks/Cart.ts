import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
type OrderItem = {
    uid: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
};

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
        const itemExist = cart.find((i) => i.uid === item.uid)
        if (itemExist) {
            setCart(cart.map((i) => i.uid === item.uid ? { ...i, quantity: i.quantity + 1 } : i))
            return;
        }
        setCart([...cart, { ...item, quantity: 1 }]);

    }
    function RemoveItem(item: OrderItem | undefined) {
        if (!item) {
            return;
        }
        setCart(cart.map((i) => i.uid === item.uid ? { ...i, quantity: i.quantity - 1 } : i)
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