import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Container,
  Form,
} from "react-bootstrap";

// import Loader from "../Loader";
import Message from "../Message";

import { addToCart, removeFromCart } from "../../actions/cartActions";

function CartScreen({ params }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // Get the quantity from the URL query

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // eslint-disable-next-line no-unused-vars
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <Container className="mt-5 text-center">
        <Row
          className="justify-content-center"
          style={{ width: "100%", marginBottom: "50px" }}
        >
          <Col
            className="m-auto"
            md={8}
          >
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
              <Message
                variant="info"
                className="text-center"
              >
                Your cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row className="justify-content-center">
                      <Col md={2}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2} xs={3}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option
                              key={x + 1}
                              value={x + 1}
                            >
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={1}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
        <style jsx>{`
          .ListGroup.flush {
            margin-bottom: ${cartItems.length * 100}px;
          }
        `}</style>
      </Container>
    </>
  );
}

export default CartScreen;
