import React from "react";
import data from "./data";

const App = () => {
  return (
    <div>
      <header>
        <a href="/">amazona</a>
      </header>
      <main>
        <h3>list products</h3>
        <div className="products">
          {data.products.map((product) => {
            return (
              <div className="product" key={product.id}>
                <a href={`/product/${product.slug}}`}>
                  <img src={product.image} alt={product.name} />
                </a>
                <div className="product-info">
                <a href={`/product/${product.slug}}`}>
                    <p>{product.name}</p>
                  </a>
                  <p>{product.price}</p>
                  <button className="bnt-cart">Add to Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default App;
