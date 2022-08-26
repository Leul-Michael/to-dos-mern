import "./home.scss";
import List from "../../components/List/List";
import Task from "../../components/Task/Task";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { TodoContext } from "../../context/todoContext/TodoContext";
import { getTodos } from "../../context/todoContext/apiCalls";

const Home = () => {
  const { todos, dispatch, isFetching, filtered } = useContext(TodoContext);

  useEffect(() => {
    getTodos(dispatch);
  }, [dispatch]);

  return (
    <main className="home">
      <div className="list-container">
        <List todos={todos} filtered={filtered} />
      </div>
      {isFetching ? (
        <p className="loading">
          <span>-</span>
          <span>-</span>
          <span>-</span>
        </p>
      ) : (
        <div className="to-dos">
          {filtered.filteredTodos?.length ? (
            filtered.filteredTodos.map((todo, index) => (
              <Task key={index} todo={todo} />
            ))
          ) : (
            <p className="no-item">No to-do to list here!</p>
          )}
        </div>
      )}
      <Link to="/new/task">
        <button className="btn-add" title="add new task">
          <FaPlus />
        </button>
      </Link>
    </main>
  );
};

export default Home;
