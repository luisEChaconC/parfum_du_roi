import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const products = [
  { name: "Creed Aventus", image: "/img/Nicho/creed/aventus.png", price: "$350" },
  { name: "Creed Silver Mountain Water", image: "/img/Nicho/creed/silver_montain_water.png", price: "$300" },
  { name: "Creed Himalaya", image: "/img/Nicho/creed/himalaya.png", price: "$320" },
  { name: "Creed Virgin Island Water", image: "/img/Nicho/creed/virgin_island_water.png", price: "$280" },
  { name: "Creed Millesime Imperial", image: "/img/Nicho/creed/millesime_imperial.png", price: "$330" },
  { name: "Creed Royal Oud", image: "/img/Nicho/creed/royal_oud.png", price: "$310" },
  { name: "Creed Green Irish Tweet", image: "/img/Nicho/creed/green_irish_tweet.png", price: "$340" },
  { name: "Louis Vuitton Imagination", image: "/img/Nicho/louis_vuitton/imagination.avif", price: "$370" },
  // Agregar mas perfumes ...
];

const ProductList: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <h1 id="title-new-product">Nuevo Ingreso</h1>
        {products.map((product, index) => (
          <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
