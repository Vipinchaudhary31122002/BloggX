import { Link } from "react-router-dom";
import "./ErrorPage.css";
const ErrorPage = () => {
  return (
    <>
      <div id="ErrorPageContainer" className="container-fluid">
        <span className="Title">Error Page</span>
        <Link to="/" className="btn btn-outline-primary">
          Back to homepage
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
