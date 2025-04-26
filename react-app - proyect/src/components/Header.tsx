import "./Header.css";


function Header() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
  
            <li className="nav-item">
              <a className="nav-link" href="#">Nuevo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Nicho</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Diseñador</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Árabes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Decants</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Tester</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contactos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
