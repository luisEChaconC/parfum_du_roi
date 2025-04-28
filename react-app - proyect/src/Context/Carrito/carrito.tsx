import { createContext } from "react";

export interface Product {
    name: string;
    price: number;
    img: string;
}

interface CarritoContextType {
  carrito: Product[];
  amountOfProducts: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
}

export const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  amountOfProducts: 0,
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});