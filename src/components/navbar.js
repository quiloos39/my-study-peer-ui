import React from "react";
import { Link } from "gatsby";

const isBrowser = typeof window !== "undefined";

const Navbar = () => {
  let menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Posts", path: "/posts" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
  ];
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ fontSize: "1.5em" }}>
          My study peer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            {menuItems.map((item) => (
              <li key={item.name} className="nav-item">
                <Link
                  className={`nav-link ${
                    isBrowser && window.location.pathname === item.path
                      ? "active"
                      : ""
                  }`}
                  to={item.path}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
