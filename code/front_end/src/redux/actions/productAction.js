import axios from "axios";
import Cookies from "js-cookie";

// Fetch all products
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Fetch products failed:", error);
      // You can dispatch a failure action if you want
    }
  };
};

// Add a new product
export const addProduct = (productData) => {
  return async (dispatch) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const response = await axios.post(
        "http://localhost:8000/api/products",
        productData,
        {
          headers: { "X-XSRF-TOKEN": csrfToken },
          withCredentials: true,
        }
      );
      // You might want to fetch products again or get the created product from response
      dispatch({
        type: "ADD_PRODUCT",
        payload: response.data, // make sure your API returns the created product object
      });
    } catch (error) {
      console.error("Add product failed:", error);
    }
  };
};

// Update a product
export const updateProduct = (id, productData) => {
  return async (dispatch) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");

      productData.append("_method", "PUT");

      const response = await axios.post(
        `http://localhost:8000/api/products/${id}`,
        productData,
        {
          headers: { "X-XSRF-TOKEN": csrfToken },
          withCredentials: true,
        }
      );
      dispatch({
        type: "UPDATE_PRODUCT",
        payload: response.data, // updated product
      });
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Update product failed:", error.response.data);
      } else {
        console.error("Update product failed:", error.message);
      }
    }
  };
};

// Delete a product
export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        headers: { "X-XSRF-TOKEN": csrfToken },
        withCredentials: true,
      });
      dispatch({
        type: "DELETE_PRODUCT",
        payload: id,
      });
    } catch (error) {
      console.error("Delete product failed:", error);
    }
  };
};
