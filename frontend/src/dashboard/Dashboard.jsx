import Navbar from "./navbar/Navbar";
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
const dashboard = () => {
  return (
    <div id="DashboardContainer">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default dashboard;
