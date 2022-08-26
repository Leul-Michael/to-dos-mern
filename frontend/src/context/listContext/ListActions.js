export const LISTSTYPES = {
  START: "LISTS_START",
  SUCCESS: "LISTS_SUCCESS",
  FAIL: "LISTS_FAIL",
};

export const DELETELIST = {
  START: "DELETE_START",
  SUCCESS: "DELETE_SUCCESS",
  FAIL: "DELETE_FAIL",
};
export const CREATELIST = {
  START: "CREATE_START",
  SUCCESS: "CREATE_SUCCESS",
  FAIL: "CREATE_FAIL",
};
export const UPDATELIST = {
  START: "UPDATE_START",
  SUCCESS: "UPDATE_SUCCESS",
  FAIL: "UPDATE_FAIL",
};

export const getListsStart = () => ({
  type: LISTSTYPES.START,
});
export const getListsSucess = (lists) => ({
  type: LISTSTYPES.SUCCESS,
  payload: lists,
});
export const getListsFail = (err) => ({
  type: LISTSTYPES.FAIL,
  payload: err,
});
export const createListStart = () => ({
  type: CREATELIST.START,
});
export const createListSucess = (list) => ({
  type: CREATELIST.SUCCESS,
  payload: list,
});
export const createListFail = (err) => ({
  type: CREATELIST.FAIL,
  payload: err,
});
export const updateListStart = () => ({
  type: UPDATELIST.START,
});
export const updateListSucess = (list) => ({
  type: UPDATELIST.SUCCESS,
  payload: list,
});
export const updateListFail = (err) => ({
  type: UPDATELIST.FAIL,
  payload: err,
});
export const deleteListStart = () => ({
  type: DELETELIST.START,
});
export const deleteListSucess = (id) => ({
  type: DELETELIST.SUCCESS,
  payload: id,
});
export const deleteListFail = (err) => ({
  type: DELETELIST.FAIL,
  payload: err,
});
