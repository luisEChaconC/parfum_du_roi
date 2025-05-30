import React, { useState, useEffect } from 'react';
import BannerImage from '../components/BannerImage';
import ProductList from '../components/ProductList';
import { loadProducts, PRODUCT_CATEGORIES, ProductData } from '../utils/productLoader';

const HomePage = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const popularProducts = await loadProducts(PRODUCT_CATEGORIES.NUEVOS);
        setProducts(popularProducts);
      } catch (error) {
        console.error('Error loading popular products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <>
        <BannerImage />
        <div>Cargando productos...</div>
      </>
    );
  }

  return (
    <>
      <BannerImage />
      <ProductList 
        title="POPULARES" 
        description="Descubre las fragancias más vendidas de Parfum Di Roi y sumérgete
         en un mundo de aromas exquisitos, seleccionados para 
          acompañarte en cada momento especial."
        products={products} 
      />
    </>
  );
};

export default HomePage;