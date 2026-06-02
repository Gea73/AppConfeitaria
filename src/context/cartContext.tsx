import { useCart } from "@/hooks/Cart";
import { createContext, ReactNode, useContext } from "react";

const CartContext = createContext<ReturnType<typeof useCart> | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    return (
        <CartContext.Provider value={useCart()}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCartContext must be used within a CartProvider");
    return context;
}