import { CREATELIST, DELETELIST, LISTSTYPES, UPDATELIST } from "./ListActions";

const ListReducer = (state, action) => {
  switch (action.type) {
    case LISTSTYPES.START: {
      return {
        lists: [],
        isFetching: true,
        isError: false,
      };
    }
    case LISTSTYPES.SUCCESS: {
      return {
        lists: action.payload,
        isFetching: false,
        isError: false,
      };
    }
    case LISTSTYPES.FAIL: {
      return {
        lists: [],
        isFetching: false,
        isError: action.payload,
      };
    }
    case DELETELIST.START: {
      return {
        ...state,
        isFetching: true,
        isError: action.payload,
      };
    }
    case DELETELIST.SUCCESS: {
      return {
        todos: state.lists.filter((list) => list._id !== action.payload),
        isFetching: false,
        isError: false,
      };
    }
    case DELETELIST.FAIL: {
      return {
        ...state,
        isFetching: false,
        isError: action.payload,
      };
    }
    case CREATELIST.START: {
      return {
        ...state,
        isFetching: true,
        isError: action.payload,
      };
    }
    case CREATELIST.SUCCESS: {
      return {
        lists: [...state.lists, action.payload],
        isFetching: false,
        isError: false,
      };
    }
    case CREATELIST.FAIL: {
      return {
        ...state,
        isFetching: false,
        isError: action.payload,
      };
    }
    case UPDATELIST.START: {
      return {
        lists: [...state.lists],
        isFetching: true,
        isError: action.payload,
      };
    }
    case UPDATELIST.SUCCESS: {
      return {
        lists: state.lists.map((list) => {
          if (list._id === action.payload._id) {
            return action.payload;
          }
          return list;
        }),
        isFetching: false,
        isError: false,
      };
    }
    case UPDATELIST.FAIL: {
      return {
        lists: [...state.lists],
        isFetching: false,
        isError: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default ListReducer;
