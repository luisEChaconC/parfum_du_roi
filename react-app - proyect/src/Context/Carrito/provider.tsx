import { useState } from "react";
import { CarritoContext, Product } from "./carrito";

export const CarritoProvider = ({children}: {children: React.ReactNode}) => {
    const [carrito, setCarrito] = useState<Product[]>([]);
    const [amountOfProducts, setAmountOfProducts] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
  
    const addToCart = (product: Product) => {
      setCarrito((prev) => [...prev, product]);
      setAmountOfProducts((prev) => prev + 1);
      setTotalPrice((prev) => prev + product.price);
    };
  
    const removeFromCart = (product: Product) => {
      setCarrito((prev) => prev.filter((item) => item.name !== product.name));
      setAmountOfProducts((prev) => prev - 1);
      setTotalPrice((prev) => prev - product.price);
    };
  
    const clearCart = () => {
      setCarrito([]);
      setAmountOfProducts(0);
      setTotalPrice(0);
    };
  
    return (
      <CarritoContext.Provider value={{ carrito, amountOfProducts, totalPrice, addToCart, removeFromCart, clearCart }}>
        {children}
      </CarritoContext.Provider>
    );
  };