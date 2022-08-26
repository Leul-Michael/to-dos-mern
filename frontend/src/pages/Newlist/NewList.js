import "./newlist.scss";
import { FcTodoList } from "react-icons/fc";
import { BsBookmarkStar } from "react-icons/bs";
import { useContext, useState } from "react";
import { createList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { useNavigate } from "react-router-dom";

const NewList = () => {
  const { dispatch } = useContext(ListContext);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    createList({ name: listName }, dispatch);
    navigate("/");
  };
  return (
    <form onSubmit={submitForm} className="new-list">
      <div className="input-box">
        <span className="icon">
          <FcTodoList />
        </span>
        <input
          autoFocus
          name="name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          type="text"
          placeholder="New list"
          minLength={2}
          maxLength={10}
        />
      </div>
      <div className="input-box button">
        <span className="icon non-click">
          <BsBookmarkStar />
        </span>
        <button type="submit">save</button>
      </div>
    </form>
  );
};

export default NewList;
