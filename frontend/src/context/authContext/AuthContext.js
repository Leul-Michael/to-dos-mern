import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

export const TODO_USER = "TODO_APP_USER";
const localStorageUser = JSON.parse(localStorage.getItem(TODO_USER));

const INITIAL_STATE = {
  user: localStorageUser || null,
  isFetching: false,
  isError: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem(TODO_USER, JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        isError: state.isError,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
