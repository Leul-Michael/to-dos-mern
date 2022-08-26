import "./header.scss";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/apiCalls";

const Header = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { dispatch, user } = useContext(AuthContext);

  const openMenu = () => {
    menuRef.current?.classList.toggle("active");
    if (menuRef.current?.classList.contains("active")) {
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".menu-list") && !e.target.closest(".user")) {
          menuRef.current?.classList.remove("active");
        }
      });
    }
  };

  const handleLogout = () => {
    if (menuRef) {
      menuRef.current.classList.remove("active");
    }
    logout(dispatch);
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="header-grid">
        <Link to="/" className="logo">
          Tasks
        </Link>
        <div ref={menuRef} className="user">
          <span onClick={openMenu} className="icon">
            <FaUser />
          </span>
          {user && (
            <ul className="menu-list">
              {/* <li>Profile</li> */}
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
