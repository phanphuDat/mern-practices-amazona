import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
// import StarRating from "./StarRating/StarRating";

const Product = ({ product }) => {
  return (
    <Card className="product">
      <Card className="product-box">
        <Link to={`/${product.slug}`}>
          <Card.Img variant="top" src={product.image} alt={product.name} />
        </Link>
      </Card>
      <Card.Body className="product-info">
        <Link to={`/${product.slug}`}>
          <Card.Text className="product-title">{product.name}</Card.Text>
        </Link>
        <Card.Text className="product-info-price">${product.price}
        </Card.Text>
        <Card className="product-add">
          <span className="product-review">{product.numReviews} reviews</span>
          <Button variant="outline-success">Add to Card</Button>
        </Card>
      </Card.Body>
    </Card>
  );
};

export default Product;
