import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import isBrowser from "../../helpers/is_browser";
import getLocalProfile from "../../helpers/GetLocalProfile";

const Navbar = ({ props }) => {
  let path = "";
  let localProfile = null;
  if (isBrowser) {
    path = window.location.pathname;
    localProfile = getLocalProfile();
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#0a2845" }}
      {...props}
    >
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <span className="navbar-brand"> My study peer </span>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-3">
              <Link
                className={"nav-link" + (path === "/" ? " active" : "")}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item ms-3">
              <Link
                className={"nav-link" + (path === "/about" ? " active" : "")}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item ms-3">
              <Link
                className={"nav-link" + (path === "/posts" ? " active" : "")}
                to="/posts"
              >
                Posts
              </Link>
            </li>
            <li className="nav-item ms-3">
              <Link
                className={"nav-link" + (path === "/contact" ? " active" : "")}
                to="/contact"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item dropdown ms-3 my-auto">
              <a
                className="btn btn-sm btn-primary dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Account
              </a>
              <ul className="dropdown-menu">
                {localProfile === null ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </li>
                  </>


                ) : (
                  <>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={"/profile?id=" + localProfile.id}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/"
                        onClick={() => {
                          if (isBrowser) {
                            window.localStorage.clear();
                          }
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  props: PropTypes.node,
};

export default Navbar;
