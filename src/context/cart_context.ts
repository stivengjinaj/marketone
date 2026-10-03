import {createContext} from "react";
import type {OrderItem, Product} from "../types";

interface CartContextValue {
    items: OrderItem[]
    addProduct: (product: Product) => void
    removeProduct: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clear: () => void
    total: number
    itemCount: number
}

export const CartContext = createContext<CartContextValue | undefined>(undefined)
