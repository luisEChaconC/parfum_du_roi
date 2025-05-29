
import BannerImage from '../components/BannerImage';
import ProductList from '../components/ProductList';
import { newIncome } from '../global/PerfumCategory';

const HomePage = () => (
  <><BannerImage /><ProductList title="POPULARES" 
  description="Descubre las fragancias más vendidas de Parfum Di Roi y sumérgete
   en un mundo de aromas exquisitos, seleccionados para 
    acompañarte en cada momento especial."
  products={newIncome} /></>
);

export default HomePage;