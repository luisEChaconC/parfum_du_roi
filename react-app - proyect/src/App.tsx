//import Card, { CardBody } from "./components/Card";
//import List from "./components/List";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import BannerImage from "./components/BannerImage";



function App() {
  return (
    <div className="bg-dark text-light min-vh-100"> 
      <>
        <TopBar />
        <Header />
        <BannerImage />
        <Carousel/>
        <Carousel/>
        <Footer/>
      </>
    </div>
  );
  //<Carousel />
  //const list = ['Goku', "Tanjiro", "Eren"]
  // Ctrol + espacio para ver propiedas
  //return <Card>
  //  <List data={list}/>
  //</Card>
}

export default App;

