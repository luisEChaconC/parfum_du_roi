import "./Header.css";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <ul className="nav-list">
          <li className="nav-item"><a className="nav-link" href="#">Nuevos</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Nicho</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Diseñador</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Árabes</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Tester</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Decants</a></li>
        </ul>
      </div>

      <div className="header-center">
        <a href="#" className="logo-container">
          <img src={logo} alt="Logo Perfumes" className="logo-img" />
        </a>
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
