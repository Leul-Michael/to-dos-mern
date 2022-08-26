import { AUTHTYPES } from "./AuthActions";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case AUTHTYPES.START: {
      return {
        user: null,
        isFetching: true,
        isError: false,
      };
    }
    case AUTHTYPES.SUCCESS: {
      return {
        user: action.payload,
        isFetching: false,
        isError: false,
      };
    }
    case AUTHTYPES.FAIL: {
      return {
        user: null,
        isFetching: false,
        isError: action.payload,
      };
    }
    case AUTHTYPES.LOGOUT: {
      return {
        user: null,
        isFetching: false,
        isError: false,
      };
    }
    default:
      return { ...state };
  }
};

export default AuthReducer;
