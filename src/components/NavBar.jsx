import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import Search from "./search";

function NavBar({ setSearchQuery }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" end>
          Cine World
        </NavLink>
      </div>
      <div className="navbar-links">
        <Search onSearch={setSearchQuery} />
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/favorites" className="nav-link">
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
