import Navbar from "./navbar/Navbar";
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
const dashboard = () => {
  return (
    <>
      <div id="DashboardContainer" className="container-fluid">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default dashboard;
