import { createContext, useContext, useState } from "react";

const cartitems = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<any[]>([]);

    return (
        <cartitems.Provider value={{ cartItems, setCartItems }}>
            {children}
        </cartitems.Provider>
    );
}

export const useCart = () => useContext(cartitems);