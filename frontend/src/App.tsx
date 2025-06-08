import { BrowserRouter as Router } from "react-router-dom"; 
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import "./App.css";
import { AppRoutes } from "./global/Routes/AppRoutes"; 
import { CarritoProvider } from "./Context/Carrito/provider";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="text-light min-vh-100">
      <div className="app">
        <CarritoProvider>
          <Router> 
            <ScrollToTop />
            <Header />
            <AppRoutes />
            <Footer />
          </Router>
        </CarritoProvider>
        
      </div>
    </div>
  );
}

export default App;
