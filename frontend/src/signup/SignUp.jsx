import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
const DisplaySuccess = (text) => toast.success(text);
const DisplayError = (text) => toast.error(text);

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const resetObject = () => {
    const defaultObject = {
      email: "",
      password: "",
      username: "",
    };
    setInputValue(defaultObject);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        email.length !== 0 &&
        password.length !== 0 &&
        username.length !== 0
      ) {
        const res = await axios.post(
          "api/v1/auth/signup",
          { email, password, username },
          { withCredentials: true }
        );
        if (res.data.message === "User already exists") {
          DisplayError("email is being used by another user!");
          resetObject();
        } else {
          navigate("/login");
          resetObject();
          DisplaySuccess("Account Created! Please Login");
        }
      } else {
        DisplayError("all fields are required!");
      }
    } catch (error) {
      DisplayError("Some error occurred while creating account!");
      console.log(error);
      resetObject();
    }
  };
  return (
    <div id="SignUpContainer" className="container-fluid">
      <span>SignUp</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          className="form-control-lg"
          onChange={handleOnChange}
          placeholder="Enter your username"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          className="form-control-lg"
          placeholder="Enter your email"
        />
        <input
          name="password"
          value={password}
          type="password"
          onChange={handleOnChange}
          id="inputPassword5"
          className="form-control-lg"
          placeholder="Enter password"
          aria-describedby="passwordHelpBlock"
        />
        <div className="BtnContainer">
          <Link to="/login" className="btn btn-outline-primary btn-lg">
            Back
          </Link>
          <button className="btn btn-outline-primary btn-lg" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
