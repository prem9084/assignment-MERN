import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContect";
const NavBar = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Succesfully");
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="/create-post"
                      className="nav-link active"
                      aria-current="page"
                    >
                      CREATE POST
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/all-post" className="nav-link">
                      ALL POST
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link fw-bold">
                      Hii : {auth?.user?.name}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
