import ProductList from '../components/ProductList';
import { nicho } from '../global/PerfumCategory';

const NichoPage = () => (
  <ProductList title="NICHO"
  description="Descubre el pinaculo de la perfumería al sumergirte en fragancias 
  excepcionales elaboradas por autores con la gama más alta de ingredientes naturales."
  products={nicho} />
);

export default NichoPage; 