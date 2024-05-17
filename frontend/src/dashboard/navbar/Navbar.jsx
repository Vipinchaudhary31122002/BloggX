import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const DisplaySuccess = (text) => toast.success(text);
const DisplayError = (text) => toast.error(text);

const Navbar = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/api/v1/auth/logout", {
        withCredentials: true,
      });
      if (res.data.message === "logout successful") {
        navigate("/");
        DisplaySuccess("Successfully logout");
      } else if (res.data.message === "token not found") {
        navigate("/login");
      } else {
        DisplayError("error generated on serverside while logging out");
      }
    } catch (error) {
      DisplayError("Some error occurred by connecting server!");
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body mb-3"
      data-bs-theme="dark"
    >
      <div className="container-fluid" id="NavbarContainer">
        <Link to="/dashboard" className="btn btn-primary p-1">
          Dashboard
        </Link>
        <div className="d-flex">
          <Link to="profile" className="btn btn-primary p-1 m-1">
            Profile
          </Link>
          <form onSubmit={handleSubmit}>
            <button className="btn btn-primary p-1 m-1" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
