import axios from "axios";
import Cookies from "js-cookie";

// Action Types
export const FETCHCART_SUCCEEDED = "FETCHCART_SUCCEEDED";
export const FETCHCART_FAILED = "FETCHCART_FAILED";
export const UPDATE_CART_QUANTITY_SUCCEEDED = "UPDATE_CART_QUANTITY_SUCCEEDED";
export const UPDATE_CART_QUANTITY_FAILED = "UPDATE_CART_QUANTITY_FAILED";
export const DELETE_CART_ITEM_SUCCEEDED = "DELETE_CART_ITEM_SUCCEEDED";
export const DELETE_CART_ITEM_FAILED = "DELETE_CART_ITEM_FAILED";
export const CART_LOADING = "CART_LOADING";

export const CLEAR_CART_SUCCEEDED = "CLEAR_CART_SUCCEEDED";
export const CLEAR_CART_FAILED = "CLEAR_CART_FAILED";

// Fetch Cart Items
export const fetch_cart = () => {
  return async (dispatch) => {
    dispatch({ type: CART_LOADING });
    try {
      const csrfToken = Cookies.get("XSRF-TOKEN");
      const response = await axios.get("http://localhost:8000/api/cart", {
        headers: { "X-XSRF-TOKEN": csrfToken },
        withCredentials: true,
      });

      dispatch({
        type: FETCHCART_SUCCEEDED,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: FETCHCART_FAILED,
        payload: e.response?.data?.message || e.message,
      });
    }
  };
};

// Update Cart Item Quantity
export const update_cart_quantity = (productId, quantity) => {
  return async (dispatch) => {
    dispatch({ type: CART_LOADING });
    try {
      const csrfToken = Cookies.get("XSRF-TOKEN");
      const response = await axios.put(
        `http://localhost:8000/api/cart/${productId}`,
        { quantity },
        {
          headers: { "X-XSRF-TOKEN": csrfToken },
          withCredentials: true,
        }
      );

      dispatch({
        type: UPDATE_CART_QUANTITY_SUCCEEDED,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: UPDATE_CART_QUANTITY_FAILED,
        payload: e.response?.data?.message || e.message,
      });
    }
  };
};

// Delete Cart Item
export const delete_cart_item = (productId) => {
  return async (dispatch) => {
    dispatch({ type: CART_LOADING });
    try {
      const csrfToken = Cookies.get("XSRF-TOKEN");
      await axios.delete(`http://localhost:8000/api/cart/${productId}`, {
        headers: { "X-XSRF-TOKEN": csrfToken },
        withCredentials: true,
      });

      dispatch({
        type: DELETE_CART_ITEM_SUCCEEDED,
        payload: productId,
      });
    } catch (e) {
      dispatch({
        type: DELETE_CART_ITEM_FAILED,
        payload: e.response?.data?.message || e.message,
      });
    }
  };
};
// Clear All Cart Items
export const clear_cart = () => {
  return async (dispatch) => {
    dispatch({ type: CART_LOADING });
    try {
      const csrfToken = Cookies.get("XSRF-TOKEN");
      await axios.delete("http://localhost:8000/api/cart", {
        headers: { "X-XSRF-TOKEN": csrfToken },
        withCredentials: true,
      });

      dispatch({
        type: CLEAR_CART_SUCCEEDED,
      });
    } catch (e) {
      dispatch({
        type: CLEAR_CART_FAILED,
        payload: e.response?.data?.message || e.message,
      });
    }
  };
};

