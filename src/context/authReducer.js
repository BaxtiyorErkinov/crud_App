const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        isAuthenticated: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        isAuthenticated: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
