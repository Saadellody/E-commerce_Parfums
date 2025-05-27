import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ALL_ORDERS_REQUEST,
  FETCH_ALL_ORDERS_SUCCESS,
  FETCH_ALL_ORDERS_FAIL,
} from "../actions/orderActions";

const initialState = {
  isLoading: false,
  error: null,
  order: null,
  orders: [],
  allOrders: [], // <--- Admin orders
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case FETCH_ORDERS_REQUEST:
    case FETCH_ALL_ORDERS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CREATE_ORDER_SUCCESS:
      return { ...state, isLoading: false, order: action.payload };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, isLoading: false, orders: action.payload };
    case FETCH_ALL_ORDERS_SUCCESS:
      return { ...state, isLoading: false, allOrders: action.payload };
    case CREATE_ORDER_FAIL:
    case FETCH_ORDERS_FAIL:
    case FETCH_ALL_ORDERS_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}
