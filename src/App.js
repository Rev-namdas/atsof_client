import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AttendancesPage from "./components/attendances/AttendancesPage";
import UserCreatePage from "./components/create-employee/UserCreatePage";
import DashboardPage from "./components/dashboard/DashboardPage";
import EmployeeListPage from "./components/employee-list/EmployeeListPage";
import LoginPage from "./components/login/LoginPage";
import LeaveApplyPage from "./components/leave/LeaveApplyPage"
import LeaveApprovalListPage from "./components/leave/LeaveApprovalListPage";
import LeaveStatusPage from "./components/leave/LeaveStatusPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<DashboardPage />} />
        <Route exact path="/user/create" element={<UserCreatePage />} />
        <Route exact path="/user/list" element={<EmployeeListPage />} />
        <Route exact path="/user/attendances" element={<AttendancesPage />} />
        <Route exact path="/user/leave/apply" element={<LeaveApplyPage />} />
        <Route exact path="/user/leave-approval-list" element={<LeaveApprovalListPage />} />
        <Route exact path="/user/leave-status" element={<LeaveStatusPage />} />
      </Routes>
    </Router>
  );
}

export default App;
