import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importamos Router, Routes y Route
import Header from "./components/Header";
import Footer from "./components/Footer";
import BannerImage from "./components/BannerImage";
import ProductList from "./components/ProductList";
import "./App.css";

const newIncome = [
  { name: "Creed Aventus", image: "/img/Nicho/creed/aventus.png", price: "$350" },
  { name: "Creed Silver Mountain Water", image: "/img/Nicho/creed/silver_montain_water.png", price: "$300" },
  { name: "Creed Himalaya", image: "/img/Nicho/creed/himalaya.png", price: "$320" },
  { name: "Creed Virgin Island Water", image: "/img/Nicho/creed/virgin_island_water.png", price: "$280" },
  { name: "Creed Millesime Imperial", image: "/img/Nicho/creed/millesime_imperial.png", price: "$330" },
  { name: "Creed Royal Oud", image: "/img/Nicho/creed/royal_oud.png", price: "$310" },
  { name: "Creed Green Irish Tweet", image: "/img/Nicho/creed/green_irish_tweet.png", price: "$340" },
  { name: "Louis Vuitton Imagination", image: "/img/Nicho/louis_vuitton/imagination.avif", price: "$370" },
];

function App() {
  return (
    <div className="text-light min-vh-100">
      <div className="app">
        <Router> 
          <Header />
          <Routes> 
          <Route path="/" element={<><BannerImage /><ProductList title="Nuevo Ingreso" products={newIncome} /></>} />
            <Route path="/nicho" element={<ProductList title="Nicho" products={newIncome}/>} /> {/* Se carga ProductList cuando se hace clic en "Nicho" */}
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
