export const AUTHTYPES = {
  START: "LOGIN_START",
  SUCCESS: "LOGIN_SUCCESS",
  FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",
};

export const loginStart = () => ({
  type: AUTHTYPES.START,
});
export const loginSucess = (user) => ({
  type: AUTHTYPES.SUCCESS,
  payload: user,
});
export const loginFail = (err) => ({
  type: AUTHTYPES.FAIL,
  payload: err,
});
export const logoutStart = () => ({
  type: AUTHTYPES.LOGOUT,
});
