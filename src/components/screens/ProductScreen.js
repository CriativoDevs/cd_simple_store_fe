import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productsActions";
import Rating from "../Rating";
import Loader from "../Loader";
import Message from "../Message";

function ProductScreen() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, product } = productDetails;
  const { userInfo } = userLogin;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(listProductDetails(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container>
      <div>
        <Link
          className="btn my-3 btn-primary btn-block"
          to="/"
        >
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image
                src={product.product_image}
                alt={product.product_name}
                fluid
                style={{
                  height: "500px",
                  width: "500px",
                  display: "block",
                  margin: "auto",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.product_name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.product_rating}
                    text={`${product.number_of_reviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Brand: {product.product_brand}</ListGroup.Item>
                <ListGroup.Item style={{ marginBottom: "20px" }}>
                  Description: {product.product_description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col
                        xs="auto"
                        className="my-1"
                      >
                        <strong>€{product.product_price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col
                        xs="auto"
                        className="my-1"
                      >
                        {product.product_stock_count > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.product_stock_count > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col
                          xs="auto"
                          className="my-1"
                        >
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.product_stock_count).keys()].map(
                              (x) => (
                                <option
                                  key={x + 1}
                                  value={x + 1}
                                >
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    {userInfo ? (
                      <Button
                        className="btn-block btn-success"
                        type="button"
                        disabled={product.product_stock_count === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className="mt-3 mx-auto d-block"
                        onClick={() => navigate("/login")}
                      >
                        Login to buy
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
}

export default ProductScreen;
