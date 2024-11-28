import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import TestPage from "./pages/TestPage";
import TestResult from "./pages/TestResult";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/test" element={<TestPage />} />
            <Route path="/results" element={<TestResult />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
