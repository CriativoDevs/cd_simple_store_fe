import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product, onClick }) {
  return (
    <div style={{ marginTop: "5px", marginBottom: "50px" }}>
      <Card
        className="my-3 p-3 rounded"
        onClick={onClick}
        style={{
          height: "100%",
          marginTop: "20px",
          paddingTop: "20px",
        }} // Set a fixed height for the card
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.product_image}
            alt={product.product_name}
            fluid
            style={{
              height: "270px", // Adjust the height of the image as needed
              width: "100%", // Ensure the image width takes the full width of its container
              objectFit: "cover",
            }}
          />
        </Link>
        <Card.Body style={{ height: "calc(100% - 270px)" }}>
          {" "}
          {/* Calculate height for the card body */}
          <Link
            to={`/product/${product._id}`}
            className="text-dark"
          >
            <Card.Title
              as="h3"
              style={{ maxHeight: "50px", overflow: "hidden" }}
            >
              {" "}
              {/* Limit maximum height of the product name */}
              {product.product_name}
            </Card.Title>
          </Link>
          <Card.Text as="h5">€ {product.product_price}</Card.Text>
          <Rating
            value={product.product_rating}
            text={`${product.number_of_reviews} reviews`}
            color={"#f8e825"}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
