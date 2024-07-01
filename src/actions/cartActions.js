import api from "../api";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await api.get(`/api/product/${id}`);

  if (data.product_image && !data.product_image.startsWith("http")) {
    const baseUrl = process.env.REACT_APP_API_URL || window.location.origin;
    data.product_image = new URL(data.product_image, baseUrl).href;
  }

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.product_name,
      image: data.product_image,
      price: data.product_price,
      countInStock: data.product_stock_count,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CART_CLEAR_ITEMS,
  });

  localStorage.removeItem("cartItems");
};

export const createCheckoutSession =
  (cartItems) => async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.post(
      "/api/create-payment-intent/",
      {
        cartItems,
      },
      config
    );
    return data;
  };
