import axios from "axios";
import { APIENDPOINTS } from "./ApiEndpoints";

export const login = (payload) => axios.post(APIENDPOINTS.user_login, payload);
export const register = (payload) =>
    axios.post(APIENDPOINTS.user_create, payload);
export const storeAttendance = (payload) =>
    axios.post(APIENDPOINTS.save_attendance, payload);
export const storeLogout = (payload) =>
    axios.post(APIENDPOINTS.save_logout, payload);
export const fetchAttendanceList = (param) =>
    axios.get(`${APIENDPOINTS.attendance_list}/${param}`);
export const fetchEmployeeList = (client_roles) =>
    axios.post(APIENDPOINTS.user_list, client_roles);
export const changeAccountStatus = (payload) =>
    axios.post(APIENDPOINTS.change_account_status, payload);
export const leaveApply = (payload) =>
    axios.post(APIENDPOINTS.leave_apply, payload);
export const AllLeaveList = (client_roles) =>
    axios.post(APIENDPOINTS.all_leave_list, client_roles);
export const ApproveLeave = (payload) =>
    axios.post(APIENDPOINTS.leave_approve, payload);