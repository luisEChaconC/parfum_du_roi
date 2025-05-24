import ProductList from '../components/ProductList';
import { arabes } from '../global/PerfumCategory';

const ArabesPage = () => (
  <ProductList title="ÁRABES"
  description="Los perfumes árabes son una expresión sublime de tradición y lujo oriental, 
  caracterizados por sus ricos acordes de especias, maderas preciosas, ámbar y flores exóticas."
  products={arabes} />
);

export default ArabesPage; 