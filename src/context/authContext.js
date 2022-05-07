import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./authReducer";

const INITIAL_STATE = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
  }, [state.isAuthenticated])

  return (
    <AuthContext.Provider value={ { isAuthenticated: state.isAuthenticated, dispatch } }>
      { children }
    </AuthContext.Provider>
    );
};