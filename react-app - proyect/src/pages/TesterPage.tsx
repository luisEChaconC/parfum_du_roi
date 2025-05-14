import React from 'react';
import ProductList from '../components/ProductList';
import { tester } from '../global/PerfumCategory';

const TesterPage = () => (
  <ProductList title="Tester" products={tester} />
);

export default TesterPage; 