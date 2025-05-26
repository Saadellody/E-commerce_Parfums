const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || false,
  isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
  isLoading: true,
  message: "",
};

console.log(initialState.user);

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuth", JSON.stringify(false));
      return {
        ...state,
        user: action.payload,
        isAuth: false,
        isLoading: false,
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        isLoading: true,
        message: action.payload,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuth", JSON.stringify(true));
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isLoading: false,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoading: true,
        message: action.payload,
      };
    case "LOGOUT_SUCCESS":
      localStorage.removeItem("user");
      localStorage.removeItem("isAuth");
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case "LOGOUT_FAIL":
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
