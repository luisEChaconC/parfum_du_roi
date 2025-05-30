import  { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { loadProducts, PRODUCT_CATEGORIES, ProductData } from '../utils/productLoader';

const DecantsPage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const decantsProducts = await loadProducts(PRODUCT_CATEGORIES.DECANTS);
        setProducts(decantsProducts);
      } catch (error) {
        console.error('Error loading decants products:', error);
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
      title="DECANTS"
      description="Los decants te permiten disfrutar fragancias de la más alta gama 
      sin necesidad de comprometerte con el frasco completo."
      products={products}
    />
  );
};

export default DecantsPage; 