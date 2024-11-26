import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import TestPage from "./pages/TestPage";
import TestResult from "./pages/TestResult";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState(null);
  const [testResult, setTestResult] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/test"
            element={<TestPage user={user} setTestResult={setTestResult} />}
          />
          <Route path="/results" element={<TestResult result={testResult} />} />
          <Route path="/profile" element={<Profile setUser={setUser} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
