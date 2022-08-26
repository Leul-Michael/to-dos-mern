import "./sign.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";
import Error from "../../components/Error/Error";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { isFetching, dispatch, isError } = useContext(AuthContext);

  const { email, password } = loginForm;

  const onChange = (e) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <>
      <Error msg={isError?.response} />
      <div className="register">
        <h1 className="title">Login to your account and manage your to-dos!</h1>
        <form onSubmit={handleLogin} className="from">
          <div className="input-box">
            <label>Email: </label>
            <input
              value={email}
              onChange={onChange}
              name="email"
              required
              autoFocus
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="input-box">
            <label>Password: </label>
            <input
              value={password}
              onChange={onChange}
              name="password"
              required
              type="password"
              placeholder="Enter password"
            />
          </div>
          <div className="button-box">
            {isFetching ? (
              <p className="loading">
                <span>-</span>
                <span>-</span>
                <span>-</span>
              </p>
            ) : (
              <button type="submit" disabled={isFetching}>
                Login
              </button>
            )}
          </div>
          <p>
            don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
