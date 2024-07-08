import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { resetPassword } from "../../actions/userActions";

const NewPasswordForm = () => {
  const { uidb64, token } = useParams(); // Retrieve uidb64 and token from URL parameters
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const { loading, error } = userLogin;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, changeshow] = useState("fas fa-eye-slash");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    dispatch(resetPassword(uidb64, token, password));
    setMessage("Password was reset successfully");
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
      <Container className="my-4 pt-5">
        <Row>
          <Col md={4}></Col>
          <Col
            md={4}
            xs={9}
            style={{ marginBottom: "20px" }}
          >
            {loading ? (
              <Loader />
            ) : message ? (
              <Message variant="success">{message}</Message>
            ) : (
              <Card>
                <Card.Header
                  as="h3"
                  className="text-center bg-black text-light"
                >
                  Reset Password
                </Card.Header>
                <Card.Body>
                  {error && <Message variant="danger">{error}</Message>}
                  <Form onSubmit={handleSubmit}>
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
                        Password must be at least [1-9][a-z][A-z][_@#*&!...] and
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
                        Send
                      </Button>
                    </div>
                  </Form>
                  <Row className="py-3">
                    <Col className="text-center">
                      New user? <br />
                      <Link to="/signup">Signup</Link>
                    </Col>
                    <Col className="text-center">
                      Remember password? <br />
                      <Link to="/login">Login</Link>
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
};

export default NewPasswordForm;
