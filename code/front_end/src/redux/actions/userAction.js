import axios from "axios";
import Cookies from "js-cookie";

export const register = (formData) => {
  return async (dispatch) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      const csrfToken = Cookies.get("XSRF-TOKEN");

      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData,
        {
          headers: { "X-XSRF-TOKEN": csrfToken },
          withCredentials: true,
        }
      );
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: response.data.user,
      });
    } catch (e) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: e.response?.data?.message || e.message,
      });
    }
  };
};

export const login = (formData) => {
  return async (dispatch) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      const csrfToken = Cookies.get("XSRF-TOKEN");

      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData,
        {
          headers: { "X-XSRF-TOKEN": csrfToken },
          withCredentials: true,
        }
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.user,
      });
    } catch (e) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: e.response?.data?.message || e.message,
      });
      return Promise.reject(e);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      const csrfToken = Cookies.get("XSRF-TOKEN");

      const response = await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: { "X-XSRF-TOKEN": csrfToken },
          withCredentials: true,
        }
      );

      dispatch({
        type: "LOGOUT_SUCCESS",
        payload: response.data.message,
      });
    } catch (e) {
      dispatch({
        type: "LOGOUT_FAIL",
        payload: e.response?.data?.message || e.message,
      });
    }
  };
};
