import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
// eslint-disable-next-line no-unused-vars
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsListReducers,
  productDetailsReducers,
} from "./reducers/productsReducers";
import {
  userLoginReducers,
  userSignupReducers,
  userEmailToPasswordResetReducers,
  userResetPasswordReducers,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  productsList: productsListReducers,
  productDetails: productDetailsReducers,
  userLogin: userLoginReducers,
  userSignup: userSignupReducers,
  userEmail: userEmailToPasswordResetReducers,
  userResetPassword: userResetPasswordReducers,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};
const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store;
