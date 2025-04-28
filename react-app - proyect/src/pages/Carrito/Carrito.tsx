import { useContext } from "react"
import { CarritoContext } from "../../Context/Carrito/carrito"
import { Button } from "@mui/material"
export const Carrito = () => {
    const {totalPrice, amountOfProducts, clearCart} = useContext(CarritoContext)
    return (<>
    <h1>este es el carrito, con precio ${totalPrice} y {amountOfProducts} productos</h1>
    <Button onClick={clearCart}> Limpiar carrito</Button></>
)
}