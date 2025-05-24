import ProductList from '../components/ProductList';
import { tester } from '../global/PerfumCategory';

const TesterPage = () => (
  <ProductList 
    title="TESTER"
    description="Los testers son fragancias exclusivas que permiten apreciar 
    la esencia original de perfumes de alta gama a un precio accesible."
    products={tester} />
);

export default TesterPage; 