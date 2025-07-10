import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadPerfumeById, PerfumeData } from "../utils/perfumeLoader";
import "./PerfumeDetail.css";
import { CarritoContext } from "../Context/Carrito/carrito";



const PerfumeDetail = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState<PerfumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfume = async () => {
      try {
        const data = await loadPerfumeById(id!);
        setPerfume(data);
      } catch (error) {
        console.error("Error al cargar el perfume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfume();
  }, [id]);

  const { addToCart, removeFromCart, carrito } = React.useContext(CarritoContext);

  const productId = perfume
    ? perfume.id || `${perfume.name.toLowerCase().replace(/\s+/g, "-")}-${perfume.brand.toLowerCase().replace(/\s+/g, "-")}`
    : "";

  const isInCart = carrito.some(item => item.product.id === productId);

  const handleCartClick = () => {
    const product = {
      id: productId,
      name: perfume!.name,
      price: typeof perfume!.price === "string" ? parseFloat(perfume!.price) : perfume!.price,
      img: perfume!.imagePaths[0],
    };

    if (isInCart) {
      removeFromCart(productId);
    } else {
      addToCart(product);
    }
  };


  if (loading) return <div>Cargando perfume...</div>;
  if (!perfume) return <div>Perfume no encontrado</div>;

  return (
    <div className="perfume-detail-container">
      <img src={perfume.imagePaths[0]} alt={perfume.name} className="perfume-image" />

      <div className="perfume-info">
        <h1>{perfume.name}</h1>
        <p className="brand">{perfume.brand}</p>
        <p className="price">${perfume.price}</p>

        <p className="description">{perfume.description}</p>

        <button className="add-to-cart-btn" onClick={handleCartClick}>
          {isInCart ? "QUITAR DEL CARRITO" : "AGREGAR AL CARRITO"}
        </button>

        <div className="details">
          <p><strong>Género:</strong> {perfume.targetGender}</p>
          <p><strong>Concentración:</strong> {perfume.concentration}</p>
          <p><strong>Categoría:</strong> {perfume.category}</p>
          <p><strong>Notas:</strong></p>
          <ul>
            <li><strong>Salida:</strong> {perfume.topNotes.join(", ")}</li>
            <li><strong>Corazón:</strong> {perfume.middleNotes.join(", ")}</li>
            <li><strong>Fondo:</strong> {perfume.baseNotes.join(", ")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerfumeDetail;