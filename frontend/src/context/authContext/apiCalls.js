import { axiosInstance } from "../../axios";
import { loginFail, loginStart, loginSucess, logoutStart } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());

  try {
    const res = await axiosInstance.post("/users/login", user);
    dispatch(loginSucess(res.data));
  } catch (e) {
    dispatch(loginFail(e));
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
};
