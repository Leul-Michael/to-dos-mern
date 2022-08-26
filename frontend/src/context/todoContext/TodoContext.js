import TodoReducer from "./TodoReducer";
import { createContext, useEffect, useReducer, useState } from "react";

export const TODO_USER = "TODO_APP_USER";

const INITIAL_STATE = {
  todos: [],
  isFetching: false,
  isError: false,
};

export const TodoContext = createContext(INITIAL_STATE);

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, INITIAL_STATE);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    setFilteredTodos(state?.todos);
  }, [state.todos]);

  return (
    <TodoContext.Provider
      value={{
        todos: state?.todos,
        isFetching: state.isFetching,
        isError: state.isError,
        filtered: { setFilteredTodos, filteredTodos },
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
