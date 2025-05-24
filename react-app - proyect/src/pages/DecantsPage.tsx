import ProductList from '../components/ProductList';
import { decants } from '../global/PerfumCategory';

const DecantsPage = () => (
  <ProductList title="DECANTS"
  description="Los decants te permiten disfrutar fragancias de la más alta gama 
  sin necesidad de comprometerte con el frasco completo."
  products={decants} />
);

export default DecantsPage; 