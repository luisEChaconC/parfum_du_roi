import { useState } from "react";
import { CarritoContext, Product, CartItem } from "./carrito";

export const CarritoProvider = ({children}: {children: React.ReactNode}) => {
    const [carrito, setCarrito] = useState<CartItem[]>([]);
    const [amountOfProducts, setAmountOfProducts] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    // Helper function to recalculate totals
    const recalculateTotals = (cartItems: CartItem[]) => {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalCost = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        
        setAmountOfProducts(totalItems);
        setTotalPrice(totalCost);
    };
  
    const addToCart = (product: Product, quantity: number = 1) => {
        setCarrito((prev) => {
            const existingItemIndex = prev.findIndex(item => item.product.id === product.id);
            
            let newCart;
            if (existingItemIndex >= 0) {
                // Product exists, increase quantity
                newCart = prev.map((item, index) => 
                    index === existingItemIndex 
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // New product, add to cart
                newCart = [...prev, { product, quantity }];
            }
            
            recalculateTotals(newCart);
            return newCart;
        });
    };
  
    const removeFromCart = (productId: string) => {
        setCarrito((prev) => {
            const newCart = prev.filter((item) => item.product.id !== productId);
            recalculateTotals(newCart);
            return newCart;
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCarrito((prev) => {
            const newCart = prev.map((item) => 
                item.product.id === productId 
                    ? { ...item, quantity }
                    : item
            );
            recalculateTotals(newCart);
            return newCart;
        });
    };
  
    const clearCart = () => {
        setCarrito([]);
        setAmountOfProducts(0);
        setTotalPrice(0);
    };
  
    return (
        <CarritoContext.Provider value={{ 
            carrito, 
            amountOfProducts, 
            totalPrice, 
            addToCart, 
            removeFromCart, 
            updateQuantity,
            clearCart 
        }}>
            {children}
        </CarritoContext.Provider>
    );
};