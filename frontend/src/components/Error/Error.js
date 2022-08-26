import "./error.scss";
import { CgDanger } from "react-icons/cg";
import { GiCancel } from "react-icons/gi";
import { useEffect, useRef } from "react";

const Error = ({ msg }) => {
  const errorRef = useRef(null);

  const removeActive = () => {
    errorRef.current?.classList.remove("active");
  };

  useEffect(() => {
    if (msg?.data) {
      errorRef.current?.classList.add("active");
    }
    setTimeout(removeActive, 5000);
  }, [msg]);

  return (
    <div ref={errorRef} className="error">
      <span className="icon">
        <CgDanger />
      </span>
      <p>{msg?.data || "Error Occured!"}</p>
      <span onClick={removeActive} className="icon">
        <GiCancel />
      </span>
    </div>
  );
};

export default Error;
