import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { validEmail, validPassword } from "../../components/screens/Regex";
import { signup } from "../../actions/userActions";

function SignupScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userSignup = useSelector((state) => state.userSignup);
  const { userInfo, loading, error } = userSignup;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, changeshow] = useState("fas fa-eye-slash");

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.details);
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      navigate("/signup");
    } else if (!validEmail.test(email)) {
      navigate("/signup");
    } else if (!validPassword.test(password)) {
      navigate("/signup");
    } else {
      dispatch(signup(firstName, lastName, email, password));
      navigate("/login");
    }
  };

  const showPassword = () => {
    var x = document.getElementById("password1");
    var z = document.getElementById("confirm_password2");
    if (x.type === "password" && z.type === "password") {
      x.type = "text";
      z.type = "text";
      changeshow(`fas fa-eye`);
    } else {
      x.type = "password";
      z.type = "password";
      changeshow(`fas fa-eye-slash`);
    }
  };

  return (
    <>
      <Container className="my-4">
        <Row>
          <Col md={4}></Col>
          <Col
            md={4}
            xs={9}
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
                  Signup
                </Card.Header>
                <Card.Body>
                  {error && <Message variant="danger">{error}</Message>}
                  <Form onSubmit={submitHandler}>
                    <Form.Group
                      className="mb-3"
                      controlId="first_name"
                    >
                      <Form.Label>
                        {" "}
                        <span>
                          <i className="fas fa-user"></i>
                        </span>{" "}
                        First Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="last_name"
                    >
                      <Form.Label>
                        {" "}
                        <span>
                          <i className="fas fa-user"></i>
                        </span>{" "}
                        Last Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </Form.Group>
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
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
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
                      <small>
                        Password must be atleast [1-9][a-z][A-z][_@#*&!...] and
                        5 characters
                      </small>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        {" "}
                        <span>
                          <i className={show}></i>
                        </span>{" "}
                        Confirm Password
                      </Form.Label>

                      <Form.Control
                        type="password"
                        id="confirm_password2"
                        placeholder="Confirm your password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                      />
                      <small>Password must be the same as above</small>
                    </Form.Group>
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
                    <div className="d-grid gap-2">
                      <Button
                        className="btn btn-md btn-success"
                        type="submit"
                      >
                        Signup
                      </Button>
                    </div>
                  </Form>
                  <Row className="py-3">
                    <Col>
                      Already have an account?{" "}
                      <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                      >
                        Login
                      </Link>
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

export default SignupScreen;
