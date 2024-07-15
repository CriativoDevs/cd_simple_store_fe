import api from "../api";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
} from "../constants/productsConstants";

export const listProducts =
  ({ page = 1, min_price, max_price, brands, category, orderBy } = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const params = new URLSearchParams();
      params.append("page", page);
      if (min_price) params.append("min_price", min_price);
      if (max_price) params.append("max_price", max_price);
      if (brands) params.append("brands", brands);
      if (category) params.append("category", category);
      if (orderBy) params.append("order_by", orderBy);

      const { data } = await api.get(`/api/products/?${params.toString()}`);
      console.log("data", data);

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: {
          products: data.results,
          count: data.count,
          next: data.next,
          previous: data.previous,
        },
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await api.get(`/api/product/${id}`);

    // Ensure product_image is an absolute URL
    if (data.product_image && !data.product_image.startsWith("http")) {
      const baseUrl = process.env.REACT_APP_API_URL || window.location.origin;
      data.product_image = new URL(data.product_image, baseUrl).href;
    }

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const searchProducts = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEARCH_REQUEST });
    const { data } = await api.get(`/api/products/?search=${keyword}`);
    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
