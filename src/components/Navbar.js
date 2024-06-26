import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  //! we replace useHistory hook by useNavigate
  const navigate = useNavigate();

  //! Logout - Need to remove token from localstorage and navigate to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast("🦄 Have a wonderful day!", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
        <Link to="/" className="navbar-brand nav-logo">
          CelestialScribe
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            {localStorage.getItem("token") ? (
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link nav-link-f
                ${location.pathname === "/" ? "active" : ""}`}
                  aria-current="page"
                >
                  Notes
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link nav-link-f
                ${location.pathname === "/about" ? "active" : ""}`}
              >
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {localStorage.getItem("token") ? (
              <>
                <button
                  className="btn btn-outline-light mx-1 log-btn"
                  type="submit"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-light mx-1 log-btn"
                  type="submit"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-outline-light mx-1 log-btn"
                  type="submit"
                >
                  SignUp
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
