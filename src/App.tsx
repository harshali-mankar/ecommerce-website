import React from "react";
import styled from "styled-components";
import {
  Home,
  Products,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  Private,
  About,
} from "./pages";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "./components";
function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route index path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route index path="/products" element={<Products />}/>
          <Route path="products/:productId" element={<SingleProduct />} />

        <Route path="checkout" element={<Checkout />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
