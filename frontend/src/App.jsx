import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landingpage/LandingPage";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Profile from "./dashboard/profile/Profile";
import AllPosts from "./dashboard/allposts/AllPosts";
import ErrorPage from "./error/ErrorPage";
import NotificationIndicator from "./utils/NotificationIndicator";
function App() {
  return (
    <>
      <NotificationIndicator />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />}>
          <Route index element={<AllPosts />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
