import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid" id="NavbarContainer">
        <Link to="/dashboard" className="btn btn-primary p-1">
          Dashboard
        </Link>
        <div>
          <Link to="profile" className="btn btn-primary p-1 m-1">
            Profile
          </Link>
          <Link to="/" className="btn btn-primary p-1 m-1">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
