import {
  FETCHCART_SUCCEEDED,
  FETCHCART_FAILED,
  UPDATE_CART_QUANTITY_SUCCEEDED,
  UPDATE_CART_QUANTITY_FAILED,
  DELETE_CART_ITEM_SUCCEEDED,
  DELETE_CART_ITEM_FAILED,
  CART_LOADING,
  CLEAR_CART_SUCCEEDED,
  CLEAR_CART_FAILED,
} from "../actions/cartAction";

const initialState = {
  cartitems: [],
  isloading: true,
  message: "",
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        isloading: true,
      };
    case FETCHCART_SUCCEEDED:
      return {
        ...state,
        cartitems: action.payload,
        isloading: false,
        error: null,
      };
    case FETCHCART_FAILED:
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };
    case UPDATE_CART_QUANTITY_SUCCEEDED:
      return {
        ...state,
        cartitems: state.cartitems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        isloading: false,
        message: "Quantity updated successfully",
        error: null,
      };
    case UPDATE_CART_QUANTITY_FAILED:
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };
    case DELETE_CART_ITEM_SUCCEEDED:
      return {
        ...state,
        cartitems: state.cartitems.filter((item) => item.id !== action.payload),
        isloading: false,
        message: "Item removed from cart successfully",
        error: null,
      };
    case DELETE_CART_ITEM_FAILED:
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };
    case CLEAR_CART_SUCCEEDED:
      return {
        ...state,
        cartitems: [],
        isloading: false,
        message: "Cart cleared successfully",
        error: null,
      };
    case CLEAR_CART_FAILED:
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
