import axios from "axios";
import Cookies from "js-cookie";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL";

// Base API URL
const API_URL = "http://localhost:8000/api";

export const create_order = (orderData, orderItems) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    // Step 0: Get CSRF cookie (required by Sanctum)
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });

    // Step 1: Create the order
    const csrfToken = Cookies.get("XSRF-TOKEN");

    const orderRes = await axios.post(`${API_URL}/orders`, orderData, {
      headers: {
        "X-XSRF-TOKEN": csrfToken,
      },
      withCredentials: true,
    });

    const order = orderRes.data;

    // Step 2: Create the order items
    await Promise.all(
      orderItems.map((item) =>
        axios.post(
          `${API_URL}/order-items`,
          {
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          },
          {
            headers: {
              "X-XSRF-TOKEN": csrfToken,
            },
            withCredentials: true,
          }
        )
      )
    );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: order });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL";

export const fetch_orders = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDERS_REQUEST });

    const response = await axios.get("http://localhost:8000/api/orders", {
      withCredentials: true,
    });

    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// orderActions.js
export const FETCH_ALL_ORDERS_REQUEST = "FETCH_ALL_ORDERS_REQUEST";
export const FETCH_ALL_ORDERS_SUCCESS = "FETCH_ALL_ORDERS_SUCCESS";
export const FETCH_ALL_ORDERS_FAIL = "FETCH_ALL_ORDERS_FAIL";

export const fetch_all_orders = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_ORDERS_REQUEST });

    const response = await axios.get("http://localhost:8000/api/admin/orders", {
      withCredentials: true,
    });

    dispatch({ type: FETCH_ALL_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_ORDERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
