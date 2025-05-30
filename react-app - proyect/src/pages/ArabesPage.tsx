import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { loadProducts, PRODUCT_CATEGORIES, ProductData } from '../utils/productLoader';

const ArabesPage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const arabesProducts = await loadProducts(PRODUCT_CATEGORIES.ARABES);
        setProducts(arabesProducts);
      } catch (error) {
        console.error('Error loading arabes products:', error);
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
      title="ARABES"
      description="Embárcate en un viaje sensorial hacia el Oriente con nuestras exquisitas 
      fragancias árabes. Cada esencia captura la rica tradición perfumística de Medio Oriente."
      products={products} 
    />
  );
};

export default ArabesPage; 