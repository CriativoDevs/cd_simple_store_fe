import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/screens/HomeScreen";
import LoginScreen from "./components/screens/LoginScreen";
import SignupScreen from "./components/screens/SignupScreen";
import CartScreen from "./components/screens/CartScreen";
// import Product from "./components/Product";
import ProductScreen from "./components/screens/ProductScreen";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<HomeScreen />}
          />
        </Routes>
        <Routes>
          <Route
            path="/login"
            element={<LoginScreen />}
          />
        </Routes>
        <Routes>
          <Route
            path="/signup"
            element={<SignupScreen />}
          />
        </Routes>
        <Routes>
          <Route
            path="/cart"
            element={<CartScreen />}
          />
        </Routes>
        <Routes>
          <Route
            path="/product/:id"
            element={<ProductScreen />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
