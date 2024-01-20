import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="navbar-link" href="https://www.google.com">
          Support Ticket System
        </a>
      </div>

      <ul className="navbar-nav">
        <a className="nav-item active" href="https://">
          <li>Tickets</li>
        </a>
        <a className="nav-item" href="https://">
          <li>Agents</li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
