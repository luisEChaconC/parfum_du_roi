import React from 'react';
import ProductList from '../components/ProductList';
import { nicho } from '../global/PerfumCategory';

const NichoPage = () => (
  <ProductList title="Nicho" products={nicho} />
);

export default NichoPage; 