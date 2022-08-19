import axios from "axios";
import { COOKIE_KEY, getCookie } from "../helpers/CookieStorage";
import { APIENDPOINTS } from "./ApiEndpoints";

const user = getCookie(COOKIE_KEY.USER_DATA)

const config = {
    headers: {
        Authorization: user.auth
    }
}

const catchMsg = {
    flag: "FAIL",
    message: "Something went wrong"
}


export const login = (payload) => {  
    return axios.post(APIENDPOINTS.user_login, payload)
        .then((res) => res?.data)
        .catch(() => catchMsg)
}

export const register = (payload) => {
    return axios.post(APIENDPOINTS.user_create, payload, config)
        .then((res) => res?.data)
        .catch(() => catchMsg)
}

export const fetchEmployeeList = () => {
    return axios.get(APIENDPOINTS.user_list, config)
        .then((res) => res?.data)
        .catch(() => catchMsg)
}

export const changeAccountStatus = (payload) => {
    return axios.patch(APIENDPOINTS.change_account_status, 
        payload, config)
            .then((res) => res?.data)
            .catch(() => catchMsg)
}

export const storeAttendance = (payload) => {
    return axios.post(APIENDPOINTS.save_attendance, payload)
        .then((res) => res?.data)
        .catch(() => catchMsg)
}

export const storeLogout = (payload) => {
    return axios.post(APIENDPOINTS.save_logout, payload)
        .then((res) => res?.data)
        .catch(() => catchMsg)
}    

export const fetchAttendanceList = () => {
    return axios.get(APIENDPOINTS.attendance_list, config)
        .then((res) => res?.data)
        .catch(() => catchMsg)
}

export const leaveApply = (payload) => {
    return axios.post(APIENDPOINTS.leave_apply, payload)
        .then((res) => res?.data)
        .catch(() => catchMsg)
}

export const pendingLeaveList = () => {
    return axios.get(APIENDPOINTS.all_leave_list, config)
        .then((res) => res?.data?.leaves)
        .catch(() => catchMsg)
}

export const approveLeave = (payload) => {
    return axios.patch(APIENDPOINTS.leave_approve, payload, config)
        .then((res) => res?.data)
        .catch(() => catchMsg)
}

export const declineLeave = (payload) => {
    return axios.patch(APIENDPOINTS.leave_decline, payload, config)
        .then((res) => res?.data)
        .catch(() => catchMsg)
}
    
export const leaveStatus = () => {
    return axios.get(APIENDPOINTS.leave_status, config)
        .then((res) => res?.data?.leave_details)
        .catch(() => catchMsg)
}
    
export const userLates = () => {
    return axios.get(APIENDPOINTS.user_lates, config)
        .then((res) => res?.data)
        .catch(() => catchMsg)
}