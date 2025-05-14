import { useState } from "react";
import { PerfumCategory } from "../../global/PerfumCategory";
import { Routes } from "../../global/Routes/Routes";
import "./Header.css";
import { rightOptions } from "./userOptions";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { SearchComponent } from "./Search/Search";
import { FiSearch, FiUsers, FiUser, FiShoppingCart } from 'react-icons/fi';

function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  return (
    <header className="whole-header">
      <div className="header">
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
            {
              rightOptions.map((option, index) => {
                let Icon;
                switch (option) {
                  case 'Busqueda':
                    Icon = FiSearch;
                    break;
                  case 'Contactos':
                    Icon = FiUsers;
                    break;
                  case 'Perfil':
                    Icon = FiUser;
                    break;
                  case 'Carrito':
                    Icon = FiShoppingCart;
                    break;
                  default:
                    Icon = null;
                }
                return option !== "Busqueda" ? (
                  <li key={index} className="nav-item">
                    <Link className="nav-link" to={Routes[option]}>{Icon && <Icon className="header-icon" />}</Link>
                  </li>
                ) : (
                  <li key={index} className="nav-item">
                    <button className="nav-link" onClick={() => setIsSearchActive(!isSearchActive)}>{Icon && <Icon className="header-icon" />}</button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      {isSearchActive && (
        <SearchComponent
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
        />
      )}
    </header>
  );
}

export default Header;