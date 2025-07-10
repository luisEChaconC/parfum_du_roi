import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { loadPerfumesByCategory, PerfumeData } from "../utils/perfumeLoader";
import { ProductData } from "../utils/productLoader";

const ArabesPage = () => {
  const [perfumes, setPerfumes] = useState<PerfumeData[]>([]);
  const [loading, setLoading] = useState(true);

  const mapPerfumeToProductData = (perfume: PerfumeData): ProductData => ({
    id: perfume.id,
    marca: perfume.brand,
    name: perfume.name,
    image: perfume.imagePaths.length > 0 ? perfume.imagePaths[0] : "",
    price: perfume.price,
  });

  useEffect(() => {
    const fetchPerfumes = async () => {
      setLoading(true);
      try {
        const data = await loadPerfumesByCategory("Arabics");
        console.log("Perfumes recibidos (Arabics):", data);
        setPerfumes(data);
      } catch (error) {
        console.error("Error cargando perfumes árabes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfumes();
  }, []);

  if (loading) return <div>Cargando productos...</div>;

  return (
    <ProductList
      title="ÁRABES"
      description="Embárcate en un viaje sensorial hacia el Oriente con nuestras exquisitas 
      fragancias árabes. Cada esencia captura la rica tradición perfumística de Medio Oriente."
      products={perfumes.map(mapPerfumeToProductData)}
    />
  );
};

export default ArabesPage;