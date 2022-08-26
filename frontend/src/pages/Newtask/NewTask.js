import "./newtask.scss";
import { FcTodoList } from "react-icons/fc";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../../context/todoContext/TodoContext";
import {
  createTodo,
  deleteTodo,
  updateTodo,
} from "../../context/todoContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { getLists } from "../../context/listContext/apiCalls";

const NewTask = () => {
  const { dispatch, isFetching } = useContext(TodoContext);
  const { lists } = useContext(ListContext);
  let navigate = useNavigate();
  let location = useLocation();
  let task;
  if (location?.state) {
    task = location.state.task;
  }

  const selectRef = useRef(null);

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch, selectRef]);

  const [todo, setTodo] = useState({
    title: task?.title || "",
    detail: task?.detail || "",
  });

  const { title, detail } = todo;

  const onChange = (e) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteTask = (id) => {
    deleteTodo(id, dispatch);
    navigate("/");
  };

  // create a to-do
  const submitForm = (e) => {
    e.preventDefault();
    if (selectRef.current?.value === "default") {
      createTodo({ title, detail }, dispatch);
    } else {
      createTodo({ title, detail, list: selectRef.current?.value }, dispatch);
    }
    navigate("/");
  };
  // Edit a to-do
  const editForm = (e) => {
    e.preventDefault();
    if (selectRef.current?.value === "default") {
      updateTodo({ id: task._id, title, detail }, dispatch);
    } else {
      updateTodo(
        { id: task._id, title, detail, list: selectRef.current?.value },
        dispatch
      );
    }
    navigate("/");
  };

  return (
    <div className="new-task">
      <form onSubmit={task ? editForm : submitForm} className="form">
        <select
          className="select input-box"
          defaultValue={task?.list || "default"}
          ref={selectRef}
        >
          <option value="default">Default</option>
          {lists?.map((list) => (
            <option key={list._id} value={list._id}>
              {list.name}
            </option>
          ))}
        </select>
        <div className="input-box">
          <span className="icon">
            <FcTodoList />
          </span>
          <input
            value={title}
            name="title"
            autoFocus
            type="text"
            placeholder="New task"
            required
            onChange={onChange}
            minLength={2}
            maxLength={15}
          />
        </div>
        <div className="input-box">
          <span className="icon">
            <BiDetail />
          </span>
          <input
            name="detail"
            onChange={onChange}
            value={detail}
            type="text"
            placeholder="detail"
          />
        </div>
        <div className="input-box button">
          <span className={`icon ${task?.isStarred && "starred"}`}>
            <FaStar />
          </span>
          <button className="todo-save" type="submit">
            {isFetching ? "---" : "save"}
          </button>
        </div>
      </form>
      {task && (
        <button onClick={() => deleteTask(task._id)} className="delete-todo">
          <RiDeleteBin2Fill />
        </button>
      )}
    </div>
  );
};

export default NewTask;
