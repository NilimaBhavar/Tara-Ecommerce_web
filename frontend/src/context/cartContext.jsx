import {
    useState,
    useEffect,
} from "react";
import { CartContext } from "./cartContextValue";

function CartProvider({ children }) {
    const [cartItems, setCartItems] =
        useState(() => {
            try {
                const savedCart = localStorage.getItem("cartItems");
                return savedCart ? JSON.parse(savedCart) : [];
            } catch {
                localStorage.removeItem("cartItems");
                return [];
            }
        });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        if (!Number.isInteger(quantity) || quantity < 1) return;

        setCartItems((items) => {
            const exist = items.find((item) => item.id === product.id);
            return exist
                ? items.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            )
                : [...items, { ...product, quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart: () => setCartItems([]),
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;