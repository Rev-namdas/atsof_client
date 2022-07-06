import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardPage from "./components/dashboard/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import UserCreatePage from "./components/login/UserCreatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<DashboardPage />} />
        <Route exact path="/user/create" element={<UserCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
