import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
// eslint-disable-next-line no-unused-vars
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsListReducers,
  productDetailsReducers,
} from "./reducers/productsReducers";
import { userLoginReducers, userSignupReducers } from "./reducers/userReducers";

const reducer = combineReducers({
  productsList: productsListReducers,
  productDetails: productDetailsReducers,
  userLogin: userLoginReducers,
  userSignup: userSignupReducers,
});

const initialState = {};
const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store;
