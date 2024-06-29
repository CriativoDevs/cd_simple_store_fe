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
            <Nav className="me-auto">
              <LinkContainer
                to="/"
                exact
              >
                <Nav.Link onClick={() => setExpanded(false)}>
                  Home <i className="fa-solid fa-house-chimney"></i>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <LinkContainer to="/cart">
                    <Nav.Link onClick={() => setExpanded(false)}>
                      Cart <i className="fa-solid fa-cart-shopping"></i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <Nav.Link onClick={() => setExpanded(false)}>
                      Profile <i className="fa-solid fa-user"></i>
                    </Nav.Link>
                  </LinkContainer>
                  <Nav.Link
                    onClick={() => {
                      handleLogout();
                      setExpanded(false);
                    }}
                  >
                    Logout <i className="fa-solid fa-right-from-bracket"></i>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link onClick={() => setExpanded(false)}>
                      Login <i className="fa-solid fa-right-to-bracket"></i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <Nav.Link onClick={() => setExpanded(false)}>
                      Signup <i className="fa-solid fa-user-plus"></i>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
            <SearchForm />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
