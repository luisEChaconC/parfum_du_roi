import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { loadProducts, PRODUCT_CATEGORIES, ProductData } from '../utils/productLoader';

const NichoPage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const nichoProducts = await loadProducts(PRODUCT_CATEGORIES.NICHO);
        setProducts(nichoProducts);
      } catch (error) {
        console.error('Error loading nicho products:', error);
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
      title="NICHO"
      description="Descubre el pinaculo de la perfumería al sumergirte en fragancias 
      excepcionales elaboradas por autores con la gama más alta de ingredientes naturales."
      products={products} 
    />
  );
};

export default NichoPage; 