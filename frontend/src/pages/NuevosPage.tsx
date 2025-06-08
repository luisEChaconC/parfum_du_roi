import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { loadProducts, PRODUCT_CATEGORIES, ProductData } from '../utils/productLoader';

const NuevosPage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const nuevosProducts = await loadProducts(PRODUCT_CATEGORIES.NUEVOS);
        setProducts(nuevosProducts);
      } catch (error) {
        console.error('Error loading nuevos products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <ProductList 
      title="NUEVOS" 
      description="Sumérgete en la elegancia y exclusividad al descubrir las nuevas incorporaciones a la
        colección de Parfums du Roi, fragancias diseñadas para cautivar y enamorar los sentidos." 
      products={products} 
    />
  );
};

export default NuevosPage; 