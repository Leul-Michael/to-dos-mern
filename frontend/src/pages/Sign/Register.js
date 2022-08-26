import "./sign.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../axios";
import Error from "../../components/Error/Error";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [errorResponse, setErrorResponse] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/users", formData);
      navigate("/login");
    } catch (e) {
      setErrorResponse(e.response);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Error msg={errorResponse} />
      <div className="register">
        <h1 className="title">Register and start creating to-dos!</h1>
        <form onSubmit={onSubmit} className="from">
          <div className="input-box">
            <label>Name: </label>
            <input
              required
              autoFocus
              name="name"
              type="text"
              placeholder="Enter name"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label>Email: </label>
            <input
              required
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label>Password: </label>
            <input
              required
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label>Confirm Password: </label>
            <input
              required
              name="password2"
              type="password"
              placeholder="Confirm password"
              onChange={handleChange}
            />
          </div>
          <div className="button-box">
            <button type="submit">Register</button>
          </div>
          <p>
            already signed up? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
