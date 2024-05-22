import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../Message";

function CancelPage() {
  const error = useSelector((state) => state.cart.error);
  return (
    <>
      <Container className="my-4 pt-5 text-center">
        <Row className="justify-content-md-center">
          <Col
            className="m-auto"
            md={8}
          >
            <h1>Payment Cancelled</h1>
            <p>Your payment was cancelled. Please try again.</p>
            {error && <Message variant="danger">{error}</Message>}
            <Link to="/">Go Back</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CancelPage;
