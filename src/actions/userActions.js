import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // Store JWT Token in local storage
    localStorage.setItem("jwtToken", data.token);

    // Store user information in local storage
    const userData = {
      username: data.username,
      email: data.email,
    };
    localStorage.setItem("userInfo", JSON.stringify(userData));

    console.log(data);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken"); // Remove JWT token from local storage
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const signup =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/register/",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        },
        config
      );
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
      // localStorage.setItem("userInfo", JSON.stringify(data)); // can be removed if not sending activation email
      
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  // In authActions.js

export const loadUserFromStorage = () => (dispatch) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const userInfoFromStorage = localStorage.getItem("userInfo");

  if (jwtToken && userInfoFromStorage) {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        token: jwtToken,
        userInfo: JSON.parse(userInfoFromStorage)
      }
    });
  }
};
