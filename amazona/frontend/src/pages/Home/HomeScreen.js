import React from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import { Row } from "react-bootstrap";
import Product from "../../components/Product/Product";
import Col from 'react-bootstrap/Col'
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import { getError } from "../../utils";

// Sử dựng state.
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = React.useReducer(
    logger(reducer),
    {
      products: [],
      loading: true,
      error: "",
    }
  );

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>
          amazona
        </title>
      </Helmet>
      <h3>list products</h3>
      <div className="products">
        {loading ? (
          <LoadingBox/>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
