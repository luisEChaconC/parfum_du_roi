import "./Footer.css";
function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Columna de Contacto */}
          <div className="col-md-6 mb-3">
            <h5>Contactos</h5>
            <p>©2025, Perfumes</p>
            <p>San Pedro, Costa Rica</p>
            <p>+506 8888 8888</p>
            <p>Email: perfumescr@gmail.com</p>
          </div>

          {/* Columna de Menú */}
          <div className="col-md-6 mb-3">
            <h5>Menú</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Perfumes</a></li>
              <li><a href="#" className="text-light text-decoration-none">Nicho</a></li>
              <li><a href="#" className="text-light text-decoration-none">Diseñador</a></li>
              <li><a href="#" className="text-light text-decoration-none">Arabes</a></li>
              <li><a href="#" className="text-light text-decoration-none">Decants</a></li>
              <li><a href="#" className="text-light text-decoration-none">Tester</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contactos</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
