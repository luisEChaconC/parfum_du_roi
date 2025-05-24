import { useState } from "react";
import { PerfumCategory } from "../../global/PerfumCategory";
import { Routes } from "../../global/Routes/Routes";
import "./Header.css";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { SearchComponent } from "./Search/Search";
import { FiSearch, FiUser, FiShoppingCart, FiMenu } from 'react-icons/fi';

function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="whole-header">
      <div className="header">
        <div className="header-left">
          <ul className={`nav-list ${isMobileMenuOpen ? 'mobile-hidden' : ''}`}>
            {PerfumCategory.map((category, index) => (
              <li key={index} className="nav-item">
                <Link className="nav-link" to={Routes[category]}>{category}</Link>
              </li>
            ))}
          </ul>
          <div className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <FiMenu className="header-icon" />
            </button>

          </div>
        </div>

        <div className="header-center">
          <Link to="/" className="logo-container">
            <img src={logo} alt="Logo Perfumes" className="logo-img" />
          </Link>
        </div>


        <div className="header-right">
          <ul className="nav-list">
            <li className="nav-item">
              <button className="nav-link" onClick={() => setIsSearchActive(!isSearchActive)}><FiSearch className="header-icon" /></button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={Routes["Perfil"]}><FiUser className="header-icon" /></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={Routes["Carrito"]}><FiShoppingCart className="header-icon" /></Link>
            </li>
          </ul>
        </div>
      </div>
      {isSearchActive && (
        <SearchComponent
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
        />
      )}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {PerfumCategory.map((category, index) => (
            <Link
              key={index}
              className="nav-link"
              to={Routes[category]}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {category}
            </Link>
          ))}
        </div>
      )}

    </header>
  );
}

export default Header;