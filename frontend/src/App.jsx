import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landingpage/LandingPage";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Profile from "./dashboard/profile/Profile";
import AllPosts from "./dashboard/allposts/AllPosts";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />}>
          <Route index element={<AllPosts />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
