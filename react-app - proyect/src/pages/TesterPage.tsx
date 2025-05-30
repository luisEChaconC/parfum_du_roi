import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { loadProducts, PRODUCT_CATEGORIES, ProductData } from '../utils/productLoader';

const TesterPage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const testerProducts = await loadProducts(PRODUCT_CATEGORIES.TESTER);
        setProducts(testerProducts);
      } catch (error) {
        console.error('Error loading tester products:', error);
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
      title="TESTER"
      description="Los testers son fragancias exclusivas que permiten apreciar 
      la esencia original de perfumes de alta gama a un precio accesible."
      products={products}
    />
  );
};

export default TesterPage; 