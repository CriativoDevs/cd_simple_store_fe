import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/screens/HomeScreen";
import LoginScreen from "./components/screens/LoginScreen";
import SignupScreen from "./components/screens/SignupScreen";
import CartScreen from "./components/screens/CartScreen";
import ProductScreen from "./components/screens/ProductScreen";
import ResetPasswordForm from "./components/forms/ResetPasswordForm";
import NewPasswordForm from "./components/forms/NewPasswordForm";
import SuccessPage from "./components/pages/SuccessPage";
import CancelPage from "./components/pages/CancelPage";
import ProfileScreen from "./components/screens/ProfileScreen";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

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
          <Route
            path="/login"
            element={<LoginScreen />}
          />
          <Route
            path="/signup"
            element={<SignupScreen />}
          />
          <Route
            path="/profile"
            element={<ProfileScreen />}
          />
          <Route
            path="/send-email-reset-password"
            element={<ResetPasswordForm />}
          />
          <Route
            path="/reset-password/:uidb64/:token"
            element={<NewPasswordForm />}
          />
          <Route
            path="/product/:id"
            element={<ProductScreen />}
          />
        </Routes>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route
              path="/cart/:id?"
              element={<CartScreen />}
            />
            <Route
              path="/success"
              element={<SuccessPage />}
            />
            <Route
              path="/cancel"
              element={<CancelPage />}
            />
          </Routes>
        </Elements>
        <Footer />
      </Router>
    </>
  );
}
