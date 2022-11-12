import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, ListGroup, Card, Button, Badge } from "react-bootstrap";
import StarRating from "../../components/Product/StarRating/StarRating";
import { SiNike } from "react-icons/si";
import { Helmet } from "react-helmet-async";

// Sử dựng state.
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = React.useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        console.log(product);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, [slug]);
  return loading ? (
    <div>...Loding...</div>
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <div>
      <Row>
        <Col md={6} xs={12}>
          <img className="img-large" src={product.image} alt={product.name} />
        </Col>
        <Col md={6}>
          <Row>
            <Col md={12}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <span className="product-detail-title">{product.name}</span>
                  <span>
                    <SiNike />
                    {product.brand}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <StarRating star={product.rating} />
                  <span>{product.numReviews} reviews</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>Price: ${product.price}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>description:</p>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <Button variant="outline-success" size="lg">
                        Add to Card
                      </Button>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
