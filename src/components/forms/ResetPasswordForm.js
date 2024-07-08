import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { emailToPasswordReset } from "../../actions/userActions";

const ResetPasswordForm = ({ onSubmit }) => {
  const userLogin = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const { loading, error } = userLogin;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailToPasswordReset(email));
    setMessage("Password reset link sent to your email");
  };

  return (
    <>
      <Container className="my-4 pt-5">
        <Row>
          <Col md={4}></Col>
          <Col
            md={4}
            xs={9}
            style={{ marginBottom: "150px" }}
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
                  Email to reset password
                </Card.Header>
                <Card.Body>
                  {error && <Message variant="danger">{error}</Message>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      controlId="email"
                      className="mb-3"
                    >
                      <Form.Label>
                        <span>
                          <i className="fas fa-envelope"></i>{" "}
                        </span>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
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
                      Remeber password? <br />
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

export default ResetPasswordForm;
