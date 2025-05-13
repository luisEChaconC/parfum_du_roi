import React from 'react';
import ProductList from '../components/ProductList';
import { decants } from '../global/PerfumCategory';

const DecantsPage = () => (
  <ProductList title="Decants" products={decants} />
);

export default DecantsPage; 