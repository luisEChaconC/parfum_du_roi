import ProductList from '../components/ProductList';
import { diseñador } from '../global/PerfumCategory';

const DisenadorPage = () => (
  <ProductList title="Diseñador"
  description="Sumérgete en la amplia selección de perfumes de diseñador, 
  concebidos para deleitar los gustos más exigentes."
  products={diseñador} />
);

export default DisenadorPage; 