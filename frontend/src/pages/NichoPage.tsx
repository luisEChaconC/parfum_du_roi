import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { loadPerfumesByCategory, PerfumeData } from "../utils/perfumeLoader";
import { ProductData } from "../utils/productLoader";

const NichoPage = () => {
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
        const data = await loadPerfumesByCategory("Niche");
        console.log("Perfumes recibidos (Niche):", data);
        setPerfumes(data);
      } catch (error) {
        console.error("Error cargando perfumes de Nicho:", error);
      } finally {
        setLoading(false);  
      }
    };
    fetchPerfumes();
  }, []);

  if (loading) return <div>Cargando productos...</div>;

  return (
    <ProductList
      title="NICHO"
      description="Descubre el pináculo de la perfumería al sumergirte en fragancias 
      excepcionales elaboradas por autores con la gama más alta de ingredientes naturales."
      products={perfumes.map(mapPerfumeToProductData)}
    />
  );
};

export default NichoPage;