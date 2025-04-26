import React from "react";

function TopBar() {
  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Parfum du Roi</a>
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
