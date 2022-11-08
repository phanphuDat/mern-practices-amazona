import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./pages/Product";
import HomeScreen from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <a href="/">amazona</a>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
