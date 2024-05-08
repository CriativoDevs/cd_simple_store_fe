import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { login } from "../../actions/userActions";
import axios from "axios";

function LoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (userInfo || token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/");
    }
  }, [userInfo, redirect, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, changeshow] = useState("fas fa-eye-slash");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setMessage("Login successful");
  };

  const showPassword = () => {
    var x = document.getElementById("password1");
    if (x.type === "password") {
      x.type = "text";
      changeshow(`fas fa-eye`);
    } else {
      x.type = "password";
      changeshow(`fas fa-eye-slash`);
    }
  };
  return (
    <>
      <Container className="my-4 pt-5">
        <Row>
          <Col md={4}></Col>
          <Col
            md={4}
            xs={9}
            style={{ marginBottom: "100px" }}
          >
            {loading ? (
              <Loader />
            ) : message ? (
              <Message variant="danger">{message}</Message>
            ) : (
              <Card>
                <Card.Header
                  as="h3"
                  className="text-center bg-black text-light"
                >
                  Login
                </Card.Header>
                <Card.Body>
                  {error && <Message variant="success">{error}</Message>}
                  <Form onSubmit={submitHandler}>
                    <Form.Group
                      className="mb-3"
                      controlId="email"
                    >
                      <Form.Label>
                        {" "}
                        <span>
                          <i className="fas fa-envelope"></i>
                        </span>{" "}
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        {" "}
                        <span>
                          <i className={show}></i>
                        </span>{" "}
                        Password
                      </Form.Label>

                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        required
                        id="password1"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </Form.Group>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <Form.Check
                          type="checkbox"
                          id="showPasswordCheckbox"
                          label="Show password"
                          onClick={showPassword}
                        />
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <Button
                        className="btn btn-md btn-success"
                        type="submit"
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                  <Row className="py-3">
                    <Col className="text-center">
                      New user? <Link to="/signup">Signup</Link>
                    </Col>
                    <Col className="text-center">
                      Reset password?{" "} <br/>
                      <Link to="/">Reset Password</Link>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
