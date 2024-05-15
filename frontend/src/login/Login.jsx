import "./Login.css";
import { Link } from "react-router-dom";
const login = () => {
  return (
    <div id="LogInContainer" className="container-fluid">
      <span>LogIn</span>
      <form action="">
      <input
          type="email"
          className="form-control-lg"
          id="exampleFormControlInput1"
          placeholder="Enter your email"
        />
        <input
          type="password"
          id="inputPassword5"
          className="form-control-lg"
          placeholder="Enter password"
          aria-describedby="passwordHelpBlock"
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

export default login;
