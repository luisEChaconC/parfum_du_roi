import React from "react";
import  { useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";



interface props {
  title: string; 
  description?: string; 
  products: { marca:string; name: string; image: string; price:string } []; 
}

const ProductList: React.FC<props> = ({title, description, products}) => {

  const [sortBy, setSortBy] = useState<string>("");

  //TODO(agregar logica)
  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  return (
    <div className="container-fluid pt-5">
      <div className="title-description-wrapper">
        <h1 id="title-new-product">{title}</h1>
        {description && (  
          <p className="product-list-description">{description}</p>
        )}
        <div className="d-flex justify-content-end">
          <div className="button_sort d-flex align-items-center">
            <span className="text-button">ORDENAR POR:</span>
            <div className="dropdown">
              <button
                className="btn custom-sort-button dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {sortBy === "asc"
                  ? "Precio de menor a mayor"
                  : sortBy === "desc"
                  ? "Precio de mayor a menor"
                  : "SELECCIONAR"}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortChange("asc")}
                  >
                    Precio de menor a mayor
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortChange("desc")}
                  >
                    Precio de mayor a menor
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4">
        {products.map((product, index) => (
          <div className="col-6 col-md-6 col-lg-3 mb-4" key={index}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
