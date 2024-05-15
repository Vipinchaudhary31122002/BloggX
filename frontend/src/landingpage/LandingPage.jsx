import { Link } from "react-router-dom";
import "./LandingPage.css";
const landingpage = () => {
  return (
    <div id="LandingPageContainer" className="container-fluid">
      <span className="Title">Indutech Task</span>
      <Link to="/login" className="btn btn-outline-primary">
        Get Started
      </Link>
    </div>
  );
};

export default landingpage;
