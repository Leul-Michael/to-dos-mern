import "./list.scss";
import { FaStar, FaPlus } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";
import Confirm from "../Confirm/Confirm";

const TODOS = {
  STARRED: "starred",
  DEFAULT: "default",
  COMPLETED: "completed",
};

const List = ({ todos, filtered }) => {
  const { lists, dispatch } = useContext(ListContext);
  const listsRef = useRef(null);
  const listMenuRef = useRef(null);
  const [operation, setOperation] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleFiltered = (e) => {
    e.preventDefault();
    if (!e.target.name) return;
    changeActiveList(e);
    filtered.setFilteredTodos(todos);
    switch (e.target.name) {
      case TODOS.STARRED:
        filtered.setFilteredTodos(
          todos?.filter((todo) => todo.isStarred === true)
        );
        break;
      case TODOS.COMPLETED:
        filtered.setFilteredTodos(
          todos.filter((todo) => todo.isCompleted === true)
        );
        break;
      case TODOS.DEFAULT:
        break;
      default:
        filtered.setFilteredTodos(
          todos?.filter((todo) => todo.list === e.target.name)
        );
        break;
    }
  };

  function changeActiveList(e) {
    [...listsRef.current.children].forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    if (
      e.target.name !== TODOS.STARRED &&
      e.target.name !== TODOS.COMPLETED &&
      e.target.name !== TODOS.DEFAULT
    ) {
      listMenuRef.current.style.display = "block";
    } else {
      listMenuRef.current.style.display = "none";
    }
  }

  const openListMenu = () => {
    listMenuRef.current?.classList.toggle("active");
    if (listMenuRef.current?.classList.contains("active")) {
      document.addEventListener("click", (e) => {
        if (
          !e.target.closest(".menu-list") &&
          !e.target.closest(".list-operation")
        ) {
          listMenuRef.current?.classList.remove("active");
        }
      });
    }
  };

  const handleDelete = () => {
    [...listsRef.current.children].forEach((btn) => {
      if (btn.classList.contains("active")) {
        setOperation({ id: btn.name, func: deleteList, dispatch: dispatch });
        setOpenConfirm(true);
      }
    });
  };

  return (
    <>
      <Confirm
        title="You will lose all to-dos in this list."
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        operation={operation}
      />
      <div className="list" ref={listsRef}>
        <button
          onClick={handleFiltered}
          title="starred"
          className="list-btn"
          name={TODOS.STARRED}
        >
          <span className="icon">
            <FaStar />
          </span>
        </button>
        <button
          onClick={handleFiltered}
          title="completed"
          className="list-btn"
          name={TODOS.COMPLETED}
        >
          <span className="icon">
            <GiCheckMark />
          </span>
        </button>
        <button
          onClick={handleFiltered}
          title="My tasks"
          className="list-btn active"
          name={TODOS.DEFAULT}
        >
          My tasks
        </button>
        {lists &&
          lists.map((list) => (
            <button
              onClick={handleFiltered}
              key={list._id}
              title={list.name}
              className="list-btn"
              name={list._id}
            >
              {list.name}
            </button>
          ))}
        <Link
          to="/new/list"
          className="list-btn add-new"
          title="Create new list"
        >
          <span className="icon">
            <FaPlus />
          </span>
          New List
        </Link>
      </div>
      <div ref={listMenuRef} className="list-operation">
        <span onClick={openListMenu} className="icon">
          <BsThreeDotsVertical />
        </span>
        <ul className="menu-list">
          <li onClick={handleDelete}>Delete list</li>
        </ul>
      </div>
    </>
  );
};

export default List;
