import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <>
      <Container className="my-4 pt-5 text-center">
        <Row className="justify-content-md-center">
          <Col
            className="m-auto"
            md={8}
          >
            <h1>Payment Successful</h1>
            <p>Thank you for your purchase.</p>
            <Link to="/">Go Back</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SuccessPage;
