export const TODOSTYPES = {
  START: "TODOS_START",
  SUCCESS: "TODOS_SUCCESS",
  FAIL: "TODOS_FAIL",
};

export const DELETETODO = {
  START: "DELETE_START",
  SUCCESS: "DELETE_SUCCESS",
  FAIL: "DELETE_FAIL",
};
export const CREATETODO = {
  START: "CREATE_START",
  SUCCESS: "CREATE_SUCCESS",
  FAIL: "CREATE_FAIL",
};
export const UPDATETODO = {
  START: "UPDATE_START",
  SUCCESS: "UPDATE_SUCCESS",
  FAIL: "UPDATE_FAIL",
};

export const getTodosStart = () => ({
  type: TODOSTYPES.START,
});
export const getTodosSucess = (todos) => ({
  type: TODOSTYPES.SUCCESS,
  payload: todos,
});
export const getTodosFail = (err) => ({
  type: TODOSTYPES.FAIL,
  payload: err,
});
export const createTodoStart = () => ({
  type: CREATETODO.START,
});
export const createTodoSucess = (todo) => ({
  type: CREATETODO.SUCCESS,
  payload: todo,
});
export const createTodoFail = (err) => ({
  type: CREATETODO.FAIL,
  payload: err,
});
export const updateTodoStart = () => ({
  type: UPDATETODO.START,
});
export const updateTodoSucess = (todo) => ({
  type: UPDATETODO.SUCCESS,
  payload: todo,
});
export const updateTodoFail = (err) => ({
  type: UPDATETODO.FAIL,
  payload: err,
});
export const deleteTodoStart = () => ({
  type: DELETETODO.START,
});
export const deleteTodoSucess = (id) => ({
  type: DELETETODO.SUCCESS,
  payload: id,
});
export const deleteTodoFail = (err) => ({
  type: DELETETODO.FAIL,
  payload: err,
});
