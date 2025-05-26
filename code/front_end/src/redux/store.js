import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReduser";
import userReducer from "./reducers/userReducer";
import orderReducer from "./reducers/orderReducer";

const rootReducers = combineReducers({
  cart: cartReducer,
  product: productReducer,
  user: userReducer,
  order: orderReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));
