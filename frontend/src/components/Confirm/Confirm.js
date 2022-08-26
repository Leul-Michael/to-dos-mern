import { useNavigate } from "react-router-dom";
import "./confirm.scss";

const Confirm = ({ title, openConfirm, operation }) => {
  const navigate = useNavigate();
  const hadnleCancle = (e) => {
    e.preventDefault();
    navigate("/");
    window.location.reload();
  };
  const hadnledelete = (e) => {
    e.preventDefault();
    operation.func(operation.id, operation.dispatch);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={`confirm ${openConfirm ? "open" : ""}`}>
      <p>{title}</p>
      <div className="buttons">
        <button onClick={hadnleCancle} className="btn-cancle">
          Cancle
        </button>
        <button onClick={hadnledelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Confirm;
