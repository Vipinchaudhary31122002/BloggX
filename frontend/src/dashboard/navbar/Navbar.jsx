import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid p-2" id="NavbarContainer">
        <Link to="/dashboard" className="btn btn-primary p-1">
          Dashboard
        </Link>
        <Link to="profile" className="btn btn-primary p-1">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
