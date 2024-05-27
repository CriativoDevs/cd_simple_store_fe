import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { createCheckoutSession, clearCart } from "../../actions/cartActions";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CheckoutForm.css";

const CheckoutForm = ({ cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentProcessing(true);

    try {
      const session = await dispatch(createCheckoutSession(cartItems));
      const { clientSecret } = session;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (paymentResult.error) {
        setError(`Payment failed: ${paymentResult.error.message}`);
        setPaymentProcessing(false);
        navigate("/cancel");
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          dispatch(clearCart());
          navigate("/success");
        } else {
          setError("Payment did not succeed.");
          setPaymentProcessing(false);
          navigate("/cancel");
        }
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
      setPaymentProcessing(false);
      navigate("/cancel");
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="total-amount">
        <h5>
          Total: $
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </h5>
      </div>
      <div className="card-element-wrapper">
        <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      <div className="card-element-row">
        <div className="card-element-wrapper">
          <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <div className="card-element-wrapper">
          <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>
      <div className="button-wrapper">
        <Button
          type="submit"
          disabled={!stripe || paymentProcessing}
          className="mt-3 btn btn-primary"
        >
          {paymentProcessing ? "Processing..." : "Pay"}
        </Button>
      </div>
      {error && (
        <Alert
          variant="danger"
          className="mt-3"
        >
          {error}
        </Alert>
      )}
    </Form>
  );
};

export default CheckoutForm;
