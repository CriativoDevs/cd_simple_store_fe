import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
    <div style={{ marginTop: "5px", marginBottom: "5px" }}>
      {" "}
      {/* Reduced spacing */}
      <Card
        className="my-1 p-2 rounded"
        onClick={onClick}
        style={{
          height: "100%",
          width: "100%", // Adjusted width for smaller cards
        }}
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.product_image}
            alt={product.product_name}
            fluid
            style={{
              height: "100px", // Reduced height for smaller cards
              width: "100%",
              objectFit: "cover",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Link>
        <Card.Body
          className="d-flex flex-column align-items-center"
          style={{ height: "calc(100% - 140px)" }} // Adjusted height
        >
          <Link
            to={`/product/${product._id}`}
            className="text-dark"
          >
            <Card.Title
              as="h5" // Reduced font size
              style={{
                textAlign: "center",
                maxHeight: "40px", // Adjusted max height
                overflow: "hidden",
              }}
            >
              {product.product_name}
            </Card.Title>
          </Link>
          <Card.Text
            as="h6" // Reduced font size
            className="my-1"
          >
            € {product.product_price}
          </Card.Text>
          {userInfo && hasBought ? (
            <Button
              type="button"
              className="mt-2 d-flex justify-content-center" // Reduced margin-top
              onClick={handleAddToCart}
            >
              Buy Again
            </Button>
          ) : userInfo ? (
            <Button
              type="button"
              className="mt-2 d-flex justify-content-center" // Reduced margin-top
              disabled
            >
              Product was not bought
            </Button>
          ) : (
            <Button
              type="button"
              className="mt-2 d-flex justify-content-center" // Reduced margin-top
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
