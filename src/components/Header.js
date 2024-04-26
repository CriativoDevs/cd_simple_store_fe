import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar
        className="navbar navbar-expand-lg bg-dark"
        data-bs-theme="dark"
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
            <form className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Pesquisar"
              />
              <button
                className="btn btn-secondary my-2 my-sm-0"
                type="submit"
              >
                Pesquisar
              </button>
            </form>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Header;
