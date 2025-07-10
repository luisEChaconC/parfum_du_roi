import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { loadPerfumesByCategory, PerfumeData } from "../utils/perfumeLoader";
import { ProductData } from "../utils/productLoader";

const DisenadorPage = () => {
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
        const data = await loadPerfumesByCategory("Designer");
        console.log("Perfumes recibidos:", data);
        setPerfumes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);  
      }
    };
    fetchPerfumes();
  }, []);


  if (loading) return <div>Cargando productos...</div>;

  return (
    <ProductList
      title="DISEÑADOR"
      description="Explora la elegancia de las marcas de lujo más prestigiosas del mundo..."
      products={perfumes.map(mapPerfumeToProductData)}
    />
  );
};

export default DisenadorPage;
