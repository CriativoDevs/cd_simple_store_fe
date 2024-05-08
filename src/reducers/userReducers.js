import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAIL,
  USER_EMAIL_TO_RESET_PASSWORD_REQUEST,
  USER_EMAIL_TO_RESET_PASSWORD_SUCCESS,
  USER_EMAIL_TO_RESET_PASSWORD_FAIL
} from "../constants/userConstants";

export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userSignupReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userEmailToPasswordResetReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_EMAIL_TO_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_EMAIL_TO_RESET_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_EMAIL_TO_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const userResetPasswordReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_RESET_REQUEST:
      return { loading: true };
    case USER_PASSWORD_RESET_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};