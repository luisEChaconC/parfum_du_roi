import React from 'react';
import ProductList from '../components/ProductList';
import { newIncome } from '../global/PerfumCategory';

const NuevosPage = () => (
  <ProductList title="Nuevos" products={newIncome} />
);

export default NuevosPage; 