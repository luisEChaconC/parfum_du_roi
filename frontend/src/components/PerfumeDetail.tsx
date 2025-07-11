import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadPerfumeById, PerfumeData } from "../utils/perfumeLoader";
import "./PerfumeDetail.css";

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

  if (loading) return <div>Cargando perfume...</div>;
  if (!perfume) return <div>Perfume no encontrado</div>;

  return (
    <div className="perfume-detail-container">
      <img src={perfume.imagePaths[0]} alt={perfume.name} className="perfume-image" />

      <div className="perfume-info">
        <h1>{perfume.name}</h1>
        <p className="brand">{perfume.brand}</p>
        <p className="description">{perfume.description}</p>

        <div className="details">
          <p><strong>Precio:</strong> ${perfume.price}</p>
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