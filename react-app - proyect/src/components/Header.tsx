import { PerfumCategory } from "../global/PerfumCategory";
import { Routes } from "../global/Routes";
import "./Header.css";
import logo from "/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <ul className="nav-list">
          {PerfumCategory.map((category, index) => (
            <li key={index} className="nav-item">
              <Link className="nav-link" to={Routes[category]}>{category}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="header-center">
        <Link to="/" className="logo-container">
          <img src={logo} alt="Logo Perfumes" className="logo-img" />
        </Link>
      </div>

      <div className="header-right">
        <ul className="nav-list">
          <li className="nav-item"><a className="nav-link" href="#">Perfil</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Búsqueda</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Carrito</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Contactos</a></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
