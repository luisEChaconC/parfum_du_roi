import { useContext } from "react"
import { CarritoContext } from "../../Context/Carrito/carrito"
export const Carrito = () => {
    const {totalPrice, amountOfProducts} = useContext(CarritoContext)
    return (
    <h1>este es el carrito, con precio ${totalPrice} y {amountOfProducts} productos</h1>
)
}