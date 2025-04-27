import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";



interface props {
  title: string; // Aquí recibimos el título como prop
  products: { name: string; image: string; price:string } []; // Se recibe la lista de productos
}

const ProductList: React.FC<props> = ({title, products}) => {
  return (
    <div className="container my-5">
      <div className="row">
        <h1 id="title-new-product">{title}</h1>
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
