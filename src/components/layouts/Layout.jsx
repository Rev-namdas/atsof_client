import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserRoles from "../../helpers/UserRoles";
import AttendancesPage from "../attendances/AttendancesPage";
import UsersAttendancePage from "../attendances/UsersAttendancePage";
import CheckAlreadyLoggedIn from "../authentication/CheckAlreadyLoggedIn";
import CheckIsLoggedIn from "../authentication/CheckIsLoggedIn";
import CheckRole from "../authentication/CheckRole";
import UserCreatePage from "../create-employee/UserCreatePage";
import DashboardPage from "../dashboard/DashboardPage";
import EmployeeListPage from "../employee-list/EmployeeListPage";
import Error404Page from "../error 404/Error404Page";
import AssignGovtLeavePage from "../leave/AssignGovtLeavePage";
import GovtLeaveSetupPage from "../leave/GovtLeaveSetupPage";
import LeaveApplyPage from "../leave/LeaveApplyPage";
import LeaveApprovalListPage from "../leave/LeaveApprovalListPage";
import LeaveRecommendPage from "../leave/LeaveRecommendPage";
import LeaveStatusPage from "../leave/LeaveStatusPage";
import LoginPage from "../login/LoginPage";
import ProfilePage from "../profile/ProfilePage";
import Navbar from "./Navbar";

function Layout() {
  return (
    <Router>
      <Navbar>
        <Routes>
          <Route exact path="/" element={
            <CheckAlreadyLoggedIn>
              <LoginPage />
            </CheckAlreadyLoggedIn>
          } />
            
          {/* Check If User Is Logged In, For Further Proceed */}
          <Route element={<CheckIsLoggedIn />}>
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route exact path="/user/attendances" element={<AttendancesPage />} />
            <Route exact path="/user/leave/apply" element={<LeaveApplyPage />} />
            <Route exact path="/user/leave-status" element={<LeaveStatusPage />} />
            <Route exact path="/user/profile" element={<ProfilePage />} />

            {/* Check User Role Before Proceed */}
            <Route element={<CheckRole roles={[UserRoles.SUPER_ADMIN]} />}>
              <Route exact path="/user/create" element={<UserCreatePage />} />
              <Route exact path="/user/leave-approval-list" element={<LeaveApprovalListPage />} />
              <Route exact path="/user/list" element={<EmployeeListPage />} />
              <Route exact path="/leave/govt/create" element={<GovtLeaveSetupPage />} />
              <Route exact path="/leave/govt/assign" element={<AssignGovtLeavePage />} />
            </Route>

            <Route element={<CheckRole roles={[
              UserRoles.SUPER_ADMIN,
              UserRoles.ADMIN
            ]} />}>
              <Route exact path="/user/attendances/all" element={<UsersAttendancePage />} />
            </Route>

            {/* Check User Role Before Proceed */}
            <Route element={<CheckRole roles={[UserRoles.ADMIN]} />}>
              <Route exact path="/user/leave/list/recommend" element={<LeaveRecommendPage />} />
            </Route>
          </Route>

          <Route exact path="/error/404" element={<Error404Page />} />

        </Routes>
      </Navbar>
    </Router>
  );
}

export default Layout;
