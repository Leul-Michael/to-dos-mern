import { axiosInstance } from "../../axios";
import {
  createListFail,
  createListStart,
  createListSucess,
  deleteListFail,
  deleteListStart,
  deleteListSucess,
  getListsFail,
  getListsStart,
  getListsSucess,
  updateListFail,
  updateListStart,
  updateListSucess,
} from "./ListActions";
import { TODO_USER } from "./ListContext";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axiosInstance.get("/lists", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(TODO_USER)).token
        }`,
      },
    });
    dispatch(getListsSucess(res.data));
  } catch (e) {
    dispatch(getListsFail(e));
  }
};

// create
export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axiosInstance.post("/lists", list, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(TODO_USER)).token
        }`,
      },
    });
    dispatch(createListSucess(res.data));
  } catch (e) {
    dispatch(createListFail(e));
  }
};

// update
export const updateList = async (list, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await axiosInstance.put(`/lists/${list.id}`, list, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(TODO_USER)).token
        }`,
      },
    });
    dispatch(updateListSucess(res.data));
  } catch (e) {
    dispatch(updateListFail(e));
  }
};

// delete
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axiosInstance.delete(`/lists/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(TODO_USER)).token
        }`,
      },
    });
    dispatch(deleteListSucess(id));
  } catch (e) {
    dispatch(deleteListFail(e));
  }
};
