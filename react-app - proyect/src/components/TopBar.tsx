import "./TopBar.css";
import logo from "../assets/logo.png";

function TopBar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo Perfumes" className="logo-img" />
        </a>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar perfumes..."
            aria-label="Buscar"
          />
          <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
      </div>
    </nav>
  );
}

export default TopBar;
