const initialState = {
  item: [],
  isloading: true,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        item: action.payload,
        isloading: false,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        item: [...state.item, action.payload],
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        item: state.item.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        item: state.item.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
};

export default productReducer;
