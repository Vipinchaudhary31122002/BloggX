import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./LogIn.css";
const DisplaySuccess = (text) => toast.success(text);
const DisplayError = (text) => toast.error(text);

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const resetObject = () => {
    const defaultObject = {
      email: "",
      password: "",
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
      if (email.length !== 0 && password.length !== 0) {
        const res = await axios.post(
          "/api/v1/auth/Login",
          { email, password },
          { withCredentials: true }
        );
        if (
          res.data.message === "Incorrect email" ||
          res.data.message === "Incorrect password"
        ) {
          resetObject();
          DisplayError("Invalid credentials! Please enter correct one");
        } else {
          navigate("/dashboard");
          resetObject();
          DisplaySuccess("Welcome to OpenResumeBuilder");
        }
      } else {
        DisplayError("All field are required!");
      }
    } catch (error) {
      DisplayError("Some error occurred by connecting server!");
      console.log(error);
      resetObject();
    }
  };
  return (
    <div id="LogInContainer" className="container-fluid">
      <span>LogIn</span>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          name="email"
          type="email"
          className="form-control-lg"
          id="exampleFormControlInput1"
          placeholder="Enter your email"
          onChange={handleOnChange}
        />
        <input
          value={password}
          name="password"
          type="password"
          id="inputPassword5"
          className="form-control-lg"
          placeholder="Enter password"
          aria-describedby="passwordHelpBlock"
          onChange={handleOnChange}
        />
        <div className="BtnContainer">
          <Link to="/signup" className="btn btn-outline-primary btn-lg">
            SignUp
          </Link>
          <button className="btn btn-outline-primary btn-lg" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
