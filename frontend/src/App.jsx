import "./App.css";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landingpage/LandingPage";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Profile from "./dashboard/profile/Profile";
import AllPosts from "./dashboard/allposts/AllPosts";
import ErrorPage from "./error/ErrorPage";
import NotificationIndicator from "./utils/NotificationIndicator";
import LoadingIndicator from "./utils/LoadingIndicator.jsx";
import UpdatePost from "./dashboard/updatepost/UpdatePost.jsx";

const Dashboard = lazy(() => import("./dashboard/Dashboard.jsx"));
function App() {
  return (
    <>
      <NotificationIndicator fallback={<LoadingIndicator />} />
      <Suspense>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />}>
            <Route index element={<AllPosts />} />
            <Route path="profile" element={<Profile />} />
            <Route path="updatepost" element={<UpdatePost />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
