import "./SignUp.css";
import { Link } from "react-router-dom";
const signup = () => {
  return (
    <div id="SignUpContainer" className="container-fluid">
      <span>SignUp</span>
      <form action="">
        <input
          type="text"
          className="form-control-lg"
          id="exampleFormControlInput1"
          placeholder="Enter your username"
        />
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

export default signup;
