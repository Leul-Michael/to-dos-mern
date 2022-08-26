import { CREATETODO, DELETETODO, TODOSTYPES, UPDATETODO } from "./TodoActions";

const TodoReducer = (state, action) => {
  switch (action.type) {
    case TODOSTYPES.START: {
      return {
        todos: [],
        isFetching: true,
        isError: false,
      };
    }
    case TODOSTYPES.SUCCESS: {
      return {
        todos: action.payload,
        isFetching: false,
        isError: false,
      };
    }
    case TODOSTYPES.FAIL: {
      return {
        todos: [],
        isFetching: false,
        isError: action.payload,
      };
    }
    case DELETETODO.START: {
      return {
        ...state,
        isFetching: true,
        isError: action.payload,
      };
    }
    case DELETETODO.SUCCESS: {
      return {
        todos: state.todos.filter((todo) => todo._id !== action.payload),
        isFetching: false,
        isError: false,
      };
    }
    case DELETETODO.FAIL: {
      return {
        ...state,
        isFetching: false,
        isError: action.payload,
      };
    }
    case CREATETODO.START: {
      return {
        ...state,
        isFetching: true,
        isError: action.payload,
      };
    }
    case CREATETODO.SUCCESS: {
      return {
        todos: [...state.todos, action.payload],
        isFetching: false,
        isError: false,
      };
    }
    case CREATETODO.FAIL: {
      return {
        ...state,
        isFetching: false,
        isError: action.payload,
      };
    }
    case UPDATETODO.START: {
      return {
        todos: [...state.todos],
        isFetching: true,
        isError: action.payload,
      };
    }
    case UPDATETODO.SUCCESS: {
      return {
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return action.payload;
          }
          return todo;
        }),
        isFetching: false,
        isError: false,
      };
    }
    case UPDATETODO.FAIL: {
      return {
        todos: [...state.todos],
        isFetching: false,
        isError: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default TodoReducer;
