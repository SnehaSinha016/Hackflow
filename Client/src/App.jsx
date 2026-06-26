import { Routes, Route, Navigate } from "react-router-dom";

import Projects from "./pages/ProjectPage/Projects";
import ProjectDetails from "./component/ProjectDetails/ProjectDetails";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Authentication/Signup"
import Login from "./pages/Authentication/Login"
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./component/ProtectedRoute";


const token = localStorage.getItem("token");

function App() {
  return (
    <Routes>


      <Route
        path="/"
        element={<LandingPage/>}
      />
   <Route
  path="/signup"
  element={
    localStorage.getItem("token")
      ? <Navigate to="/dashboard" replace />
      : <Signup />
  }
/>
     <Route
  path="/login"
  element={
    localStorage.getItem("token")
      ? <Navigate to="/dashboard" replace />
      : <Login />
  }
/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
   <Route
  path="/projects"
  element={
    <ProtectedRoute>
      <Projects />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute><ProjectDetails /></ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;