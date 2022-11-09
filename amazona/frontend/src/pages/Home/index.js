import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger";

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
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h3>list products</h3>
      <div className="products">
        {loading ? (
          <div>...loading...</div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          products.map((product) => {
            return (
              <div className="product" key={product.id}>
                <Link to={`/product/${product.slug}}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="product-info">
                  <Link href={`/product/${product.slug}}`}>
                    <p>{product.name}</p>
                  </Link>
                  <p>{product.price}</p>
                  <button className="bnt-cart">Add to Cart</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
