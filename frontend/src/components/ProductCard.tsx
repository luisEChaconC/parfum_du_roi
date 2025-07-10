import React from "react";
import "./ProductCard.css";
import { CarritoContext } from "../Context/Carrito/carrito";
import { Link } from "react-router-dom";

interface props {
  id?: string;
  name: string;
  image: string;
  price: number | string;
  marca: string;
}

const ProductCard: React.FC<props> = ({ id, name, image, price, marca }) => {
  const { addToCart, removeFromCart, carrito } = React.useContext(CarritoContext);

  const productId = id || `${name.toLowerCase().replace(/\s+/g, '-')}-${marca.toLowerCase().replace(/\s+/g, '-')}`;
  
  const isInCart = carrito.some(item => item.product.id === productId);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // evita que el click en el botón navegue al link
    const product = {
      id: productId,
      name,
      price: typeof price === 'string' ? parseFloat(price) : price,
      img: image
    };

    if (isInCart) {
      removeFromCart(productId);
    } else {
      addToCart(product);
    }
  };

 return (
  <Link to={`/perfume/${id}`} className="product-card-link">
    <div className="card product-card">
      <div className="img-container">
        <img src={image} className="card-img-top" alt={name} />
      </div>
      <div className="card-body">
        <h6 className="product-brand">{marca}</h6>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">DESDE LOS ${price}</p>

        <button id="btn" onClick={handleCartClick}>
          {isInCart ? "QUITAR DEL CARRITO" : "AGREGAR AL CARRITO"}
        </button>
      </div>
    </div>
  </Link>
);
};

export default ProductCard;