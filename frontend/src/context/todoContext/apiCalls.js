import { axiosInstance } from "../../axios";
import {
  createTodoFail,
  createTodoStart,
  createTodoSucess,
  deleteTodoFail,
  deleteTodoStart,
  deleteTodoSucess,
  getTodosFail,
  getTodosStart,
  getTodosSucess,
  updateTodoFail,
  updateTodoStart,
  updateTodoSucess,
} from "./TodoActions";
import { TODO_USER } from "./TodoContext";

export const getTodos = async (dispatch) => {
  dispatch(getTodosStart());
  try {
    const res = await axiosInstance.get("/todos", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(TODO_USER)).token
        }`,
      },
    });
    dispatch(getTodosSucess(res.data));
  } catch (e) {
    dispatch(getTodosFail(e));
  }
};

// create
export const createTodo = async (todo, dispatch) => {
  dispatch(createTodoStart());
  try {
    const res = await axiosInstance.post("/todos", todo, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(TODO_USER)).token
        }`,
      },
    });
    dispatch(createTodoSucess(res.data));
  } catch (e) {
    dispatch(createTodoFail(e));
  }
};

// update
export const updateTodo = async (todo, dispatch) => {
  dispatch(updateTodoStart());
  try {
    const res = await axiosInstance.put(`/todos/${todo.id}`, todo, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(TODO_USER)).token
        }`,
      },
    });
    dispatch(updateTodoSucess(res.data));
  } catch (e) {
    dispatch(updateTodoFail(e));
  }
};

// delete
export const deleteTodo = async (id, dispatch) => {
  dispatch(deleteTodoStart());
  try {
    await axiosInstance.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(TODO_USER)).token
        }`,
      },
    });
    dispatch(deleteTodoSucess(id));
  } catch (e) {
    dispatch(deleteTodoFail(e));
  }
};
