
import BannerImage from '../components/BannerImage';
import ProductList from '../components/ProductList';
import { newIncome } from '../global/PerfumCategory';

const HomePage = () => (
  <><BannerImage /><ProductList title="POPULARES" products={newIncome} /></>
);

export default HomePage;