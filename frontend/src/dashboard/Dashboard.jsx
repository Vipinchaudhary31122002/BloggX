import Navbar from "./navbar/Navbar";
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
const dashboard = () => {
  const cookie = document.cookie;
  console.log(cookie);
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
