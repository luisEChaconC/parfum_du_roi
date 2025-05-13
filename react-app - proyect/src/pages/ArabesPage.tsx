import React from 'react';
import ProductList from '../components/ProductList';
import { arabes } from '../global/PerfumCategory';

const ArabesPage = () => (
  <ProductList title="Árabes" products={arabes} />
);

export default ArabesPage; 