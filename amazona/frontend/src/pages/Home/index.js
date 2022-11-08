import React from "react";
import data from '../../data';
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  return (
    <div>
      <h3>list products</h3>
      <div className="products">
        {data.products.map((product) => {
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
        })}
      </div>
    </div>
  );
};

export default HomeScreen;
