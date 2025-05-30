import { createContext } from "react";

export interface Product {
    id: string;
    name: string;
    price: number;
    img: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CarritoContextType {
  carrito: CartItem[];
  amountOfProducts: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  amountOfProducts: 0,
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});