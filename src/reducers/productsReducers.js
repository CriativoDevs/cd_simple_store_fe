import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
} from "../constants/productsConstants";

const initialState = {
  loading: false,
  products: [],
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

export const productsListReducers = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [], error: null };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        pagination: {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        },
        error: null,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload, products: [] };
    case PRODUCT_SEARCH_REQUEST:
      return { ...state, loading: true, error: null }; // Clear previous search results
    case PRODUCT_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case PRODUCT_SEARCH_FAIL:
      return { ...state, loading: false, error: action.payload, products: [] };
    default:
      return state;
  }
};

export const productDetailsReducers = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
