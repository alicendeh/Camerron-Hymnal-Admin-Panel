import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import React, { useReducer } from "react";

import axios from "axios";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    token: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //login user
  const loginUser = async (userData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/CH/AdminAuth/login", userData, config);

      dispatch({ type: "USER_LOGIN", payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  };

  //logout
  const onLogout = () => {
    try {
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error.message);
    }
  };

  //loadUser
  const loadUser = () => {
    dispatch({
      type: "LOAD_USER",
    });
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        token: state.token,
        loginUser,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
