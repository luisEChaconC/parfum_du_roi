import React from 'react';
import ProductList from '../components/ProductList';
import { newIncome } from '../global/PerfumCategory';

const NuevosPage = () => (
  <ProductList title="NUEVOS" 
  description="Sumérgete en la elegancia y exclusividad al descubrir las nuevas incorporaciones a la
    colección de Parfums du Roi, fragancias diseñadas para cautivar y enamorar los sentidos." 
  products={newIncome} />
);

export default NuevosPage; 