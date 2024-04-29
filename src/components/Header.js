import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout, loadUserFromStorage } from "../actions/userActions";
import SearchForm from "./SearchForm";

function Header() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user information from local storage when the component mounts
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar
        className="navbar navbar-expand-lg"
        data-bs-theme="dark"
        style={{ backgroundColor: "#333" }}
      >
        <div className="container-fluid">
          <LinkContainer to="/">
            <Nav.Link className="navbar-brand">CD Simple Store</Nav.Link>
          </LinkContainer>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarColor02"
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <LinkContainer to="/">
                  <Nav.Link className="navbar-link active">
                    Home <i class="fa-solid fa-house-chimney"></i>
                  </Nav.Link>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer to="/cart">
                  <Nav.Link className="navbar-link">Cart</Nav.Link>
                </LinkContainer>
              </li>
              {userInfo ? (
                <>
                  <li>
                    <Nav.Link
                      className="nav-link"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Nav.Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <LinkContainer to="/login">
                      <Nav.Link className="nav-link">Login</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/signup">
                      <Nav.Link className="nav-link">Signup</Nav.Link>
                    </LinkContainer>
                  </li>
                </>
              )}
            </ul>
            <SearchForm />
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Header;
