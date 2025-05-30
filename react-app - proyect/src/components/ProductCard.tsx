import React from "react";
import "./ProductCard.css";
import { CarritoContext } from "../Context/Carrito/carrito";

interface props {
  name: string;
  image: string;
  price: string;
  marca: string;
}

const ProductCard: React.FC<props> = ({ name, image, price, marca }) => {
  const { addToCart, removeFromCart, carrito } = React.useContext(CarritoContext);

  const productId = `${name.toLowerCase().replace(/\s+/g, '-')}-${marca.toLowerCase().replace(/\s+/g, '-')}`;
  
  const isInCart = carrito.some(item => item.product.id === productId);

  const handleCartClick = () => {
    const product = {
      id: productId,
      name,
      price: parseFloat(price),
      img: image
    };

    if (isInCart) {
      removeFromCart(productId);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="card product-card">
      <div className="img-container">
        <img src={image} className="card-img-top" alt={name} />
        {/* Quitamos el ícono superpuesto */}
      </div>
      <div className="card-body">
        <h6 className="product-brand">{marca}</h6>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">DESDE LOS ${price}</p>

        {/* Botón para agregar/quitar del carrito */}
        <button 
          id="btn" 
          onClick={handleCartClick} 
        >
          {isInCart ? "QUITAR DEL CARRITO" : "AGREGAR AL CARRITO"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
