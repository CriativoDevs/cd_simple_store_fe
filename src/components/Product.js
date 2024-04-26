import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.product_image}
          alt={product.product_name}
          fluid
          style={{
            height: "270px",
            width: "270px",
            display: "block",
            margin: "auto",
          }}
        />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          className="text-dark"
        >
          <Card.Title as="h3">{product.product_name}</Card.Title>
        </Link>
        <Card.Text as="h5">€ {product.product_price}</Card.Text>
        <Rating
          value={product.product_rating}
          text={`${product.number_of_reviews} reviews`}
          color={"#f8e825"}
        />
      </Card.Body>
    </Card>
  );
}

export default Product;
