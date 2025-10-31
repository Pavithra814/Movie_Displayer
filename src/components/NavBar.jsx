import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import Search from "./search";
import Image from "../assets/favicon.png";

function NavBar({ setSearchQuery }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink id='nav_brand' to="/" end> 
        <img
          id='nav_icon'
          src = {Image}
        />
        <p>
          World</p>
        </NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/favorites" className="nav-link">
          Favorites
        </NavLink>
        <Search onSearch={setSearchQuery} />
        {/* <NavLink to="/profile" className = "nav-link">
          Profile
        </NavLink> */}
      </div>
    </nav>
  );
}

export default NavBar;
