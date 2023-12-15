import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location, "this is my Active location");
    /*
    !Output:    
    {
    "pathname": "/about",
    "search": "",
    "hash": "",
    "state": null,
    "key": "st6tx9ta"
}
    */
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link 
                ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link 
                ${location.pathname === "/about" ? "active" : ""}`}
              >
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <Link to="/login" className="btn btn-danger mx-1" type="submit">
              Login
            </Link>
            <Link to="/signup" className="btn btn-danger mx-1" type="submit">
              Sign-Up
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
