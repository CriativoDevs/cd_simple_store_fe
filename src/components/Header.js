import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout, loadUserFromStorage } from "../actions/userActions";
import SearchForm from "../components/forms/SearchForm";
import { useNavigate } from "react-router";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Load user information from local storage when the component mounts
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Navbar
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#333" }}
        expanded={expanded}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>CD Simple Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex w-100 justify-content-center">
              <SearchForm />
            </div>
            <div className="w-100 d-flex justify-content-center">
              <Nav>
                <LinkContainer
                  to="/"
                  exact
                >
                  <Nav.Link
                    onClick={() => setExpanded(false)}
                    className="nav-item"
                  >
                    Home <i className="fa-solid fa-house-chimney nav-icon"></i>
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <>
                    <LinkContainer to="/cart">
                      <Nav.Link
                        onClick={() => setExpanded(false)}
                        className="nav-item"
                      >
                        Cart{" "}
                        <i className="fa-solid fa-cart-shopping nav-icon"></i>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                      <Nav.Link
                        onClick={() => setExpanded(false)}
                        className="nav-item"
                      >
                        Profile <i className="fa-solid fa-user nav-icon"></i>
                      </Nav.Link>
                    </LinkContainer>
                    <Nav.Link
                      onClick={() => {
                        handleLogout();
                        setExpanded(false);
                      }}
                      className="nav-item"
                    >
                      Logout{" "}
                      <i className="fa-solid fa-right-from-bracket nav-icon"></i>
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <LinkContainer to="/login">
                      <Nav.Link
                        onClick={() => setExpanded(false)}
                        className="nav-item"
                      >
                        Login{" "}
                        <i className="fa-solid fa-right-to-bracket nav-icon"></i>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                      <Nav.Link
                        onClick={() => setExpanded(false)}
                        className="nav-item"
                      >
                        Signup{" "}
                        <i className="fa-solid fa-user-plus nav-icon"></i>
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
