import React from 'react';
import BannerImage from '../components/BannerImage';
import ProductList from '../components/ProductList';
import { nuevosIngresos } from '../global/PerfumCategory';

const HomePage = () => (
  <><BannerImage /><ProductList title="Nuevos Ingresos" products={nuevosIngresos} /></>
);

export default HomePage;