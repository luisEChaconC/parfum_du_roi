import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { loadProducts, PRODUCT_CATEGORIES, ProductData } from '../utils/productLoader';

const DisenadorPage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const diseñadorProducts = await loadProducts(PRODUCT_CATEGORIES.DISEÑADOR);
        setProducts(diseñadorProducts);
      } catch (error) {
        console.error('Error loading diseñador products:', error);
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
      title="DISEÑADOR"
      description="Explora la elegancia de las marcas de lujo más prestigiosas del mundo. 
      Cada fragancia cuenta una historia de sofisticación y estilo atemporal."
      products={products} 
    />
  );
};

export default DisenadorPage; 