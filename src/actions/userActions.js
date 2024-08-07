import api from "../api";
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
  USER_EMAIL_TO_RESET_PASSWORD_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await api.post(
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
      const { data } = await api.post(
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

export const loadUserFromStorage = () => (dispatch) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const userInfoFromStorage = localStorage.getItem("userInfo");

  if (jwtToken && userInfoFromStorage) {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        token: jwtToken,
        userInfo: JSON.parse(userInfoFromStorage),
      },
    });
  }
};

export const emailToPasswordReset = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_EMAIL_TO_RESET_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await api.post(
      "/api/users/email_to_reset_password/",
      { email: email },
      config
    );
    dispatch({ type: USER_EMAIL_TO_RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_EMAIL_TO_RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail // error.response.data.detail
          : error.message,
    });
  }
};

export const resetPassword = (uidb64, token, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_RESET_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      password,
    });

    const { data } = await api.post(
      `/api/users/reset-password/${uidb64}/${token}/`,
      body,
      config
    );

    dispatch({
      type: USER_PASSWORD_RESET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_RESET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const token = localStorage.getItem("jwtToken");

    if (!token) {
      throw new Error("No token found");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.get("/api/users/profile/", config);

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(logout());
    } else {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  }
};

export const updateUserProfile = (profile) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

    const token = localStorage.getItem("jwtToken");

    if (!token) {
      throw new Error("No token found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const payload = {
      profile,
    };

    const { data } = await api.put("/api/users/profile/", payload, config);

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(logout());
    } else {
      dispatch({
        type: USER_PROFILE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  }
};
