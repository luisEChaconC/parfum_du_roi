import React from "react";
import "./ProductCard.css";

interface props {
  name: string;
  image: string;
  price: string;
}

const ProductCard: React.FC<props> = ({ name, image, price }) => {
  return (
    <div className="card product-card">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{price}</p>
        <button id="btn" className="btn btn-primary">Comprar</button>
      </div>
    </div>
  );
};

export default ProductCard;
