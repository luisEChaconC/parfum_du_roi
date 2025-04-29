import React from "react";
import "./ProductCard.css";
import { CarritoContext } from "../Context/Carrito/carrito";
interface props {
  name: string;
  image: string;
  price: string;
}

const ProductCard: React.FC<props> = ({ name, image, price }) => {
  const { addToCart, removeFromCart, carrito } = React.useContext(CarritoContext);
  
  // Check if the product is already in the cart
  const isInCart = carrito.some(item => item.name === name);
  
  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart({ name, price: parseFloat(price), img: image });
    } else {
      addToCart({ name, price: parseFloat(price), img: image });
    }
  };
  
  return (
    <div className="card product-card">
      <div className="img-container">
        <img src={image} className="card-img-top" alt={name} />
        <div className="img-overlay">
          <img 
            src={isInCart ? "/img/carrito_lleno_transparente.png" : "/img/carrito_transparente.png"} 
            alt={isInCart ? "Quitar del Carrito" : "Agregar al Carrito"} 
            className="cart-icon" 
            onClick={handleCartClick} 
          />
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
