import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import Rating from "./Rating";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Product({ product, onClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [hasBought, setHasBought] = useState(false);

  useEffect(() => {
    if (userInfo) {
      const checkPurchaseStatus = async () => {
        const { data } = await api.get(
          `/api/check-purchase-status/${product._id}/`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setHasBought(data.has_bought);
      };
      checkPurchaseStatus();
    }
  }, [userInfo, product._id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product._id, 1));
    navigate("/cart");
  };

  return (
    <div style={{ marginTop: "5px", marginBottom: "50px" }}>
      <Card
        className="my-3 p-3 rounded"
        onClick={onClick}
        style={{
          height: "100%",
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.product_image}
            alt={product.product_name}
            fluid
            style={{
              height: "270px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Link>
        <Card.Body style={{ height: "calc(100% - 270px)" }}>
          <Link
            to={`/product/${product._id}`}
            className="text-dark"
          >
            <Card.Title
              as="h3"
              style={{ maxHeight: "50px", overflow: "hidden" }}
            >
              {product.product_name}
            </Card.Title>
          </Link>
          <Card.Text as="h5">€ {product.product_price}</Card.Text>
          {/* <Rating
            value={product.product_rating}
            text={`${product.number_of_reviews} reviews`}
            color={"#f8e825"}
          /> */}
          {userInfo && hasBought ? (
            <Button
              type="button"
              className="mt-3"
              onClick={handleAddToCart}
            >
              Buy Again
            </Button>
          ) : userInfo ? (
            <Button
              type="button"
              className="mt-3"
              disabled
            >
              Product was not bought
            </Button>
          ) : (
            <Button
              type="button"
              className="mt-3"
              onClick={() => navigate("/login")}
            >
              Login to buy
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
