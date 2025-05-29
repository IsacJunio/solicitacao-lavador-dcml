import { useState } from "react";
import { Link, useLocation } from "react-router-dom"
import "./Header.css"
import { FaHome, FaUser,  FaBars, FaTimes } from "react-icons/fa"

// ...restante do código...
function Header({ onSolicitar }){
  const location = useLocation();
   const [menuOpen, setMenuOpen] = useState(false);

  const titulos = {
  "/": "Solicitação do Lavador",
  "/menu": "Menu"
};
const titulo = titulos[location.pathname] || "";

  return (
      <header className="header">
      <div className="header__logo">DCML</div>
      <div className="header__titulo">{titulo}</div>
      <button
        className="header__hamburger"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Abrir menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
        {location.pathname === "/" && (
          <>
            <Link to="/login" className="header__link" onClick={() => setMenuOpen(false)}>
              <FaUser /> Login
            </Link>
            <button className="header__button-home" onClick={() => {setMenuOpen(false);
              if (onSolicitar) onSolicitar();
            }}>
              Solicitar
            </button>
          </>
        )}
        {location.pathname === "/menu" && (
          <Link to="/" className="header__link header__link-home" onClick={() => setMenuOpen(false)}>
            <FaHome /> Inícios
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header