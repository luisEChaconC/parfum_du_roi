import React from 'react';
import ProductList from '../components/ProductList';
import { diseñador } from '../global/PerfumCategory';

const DisenadorPage = () => (
  <ProductList title="Diseñador" products={diseñador} />
);

export default DisenadorPage; 