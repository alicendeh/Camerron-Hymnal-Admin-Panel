export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOGIN":
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        token: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        error: null,
        token: null,
      };
    case "LOAD_USER":
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        token: action.payload,
      };
  }
};
