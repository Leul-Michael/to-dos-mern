import "./task.scss";
import { FaStar } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { updateTodo } from "../../context/todoContext/apiCalls";
import { TodoContext } from "../../context/todoContext/TodoContext";

const Task = ({ todo }) => {
  const { dispatch, isFetching } = useContext(TodoContext);

  return (
    <div className={`task ${todo?.isCompleted && "compeleted"}`}>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <div className="left">
            <span
              className={`icon ${todo?.isCompleted && "completed"}`}
              onClick={() =>
                updateTodo(
                  { id: todo._id, isCompleted: !todo?.isCompleted },
                  dispatch
                )
              }
            >
              <GiCheckMark />
            </span>
          </div>
          <Link
            to={"/edit/task/" + todo._id}
            state={{ task: todo }}
            className="center"
          >
            <h1>{todo.title}</h1>
            <p>{todo.detail}</p>
          </Link>
          <div className="right">
            <span
              onClick={() =>
                updateTodo(
                  { id: todo._id, isStarred: !todo?.isStarred },
                  dispatch
                )
              }
              className={`icon ${todo?.isStarred && "starred"}`}
            >
              <FaStar />
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;

const Loading = () => {
  return (
    <p className="loading">
      <span>-</span>
      <span>-</span>
      <span>-</span>
    </p>
  );
};
