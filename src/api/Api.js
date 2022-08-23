import axios from "axios";
import { COOKIE_KEY, getCookie } from "../helpers/CookieStorage";
import { APIENDPOINTS } from "./ApiEndpoints";

const user = getCookie(COOKIE_KEY.USER_DATA)

const config = {
    headers: {
        Authorization: user?.auth
    }
}

const catchMsg = {
    flag: "FAIL",
    message: "Something went wrong"
}


export const login = async (payload) => {  
    try {
        const res = await axios.post(APIENDPOINTS.user_login, payload);
        return res?.data;
    } catch {
        return catchMsg;
    }
}

export const register = async (payload) => {
    try {
        const res = await axios.post(APIENDPOINTS.user_create, payload, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}

export const fetchEmployeeList = async () => {
    try {
        const res = await axios.get(APIENDPOINTS.user_list, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}

export const changeAccountStatus = async (payload) => {
    try {
        const res = await axios.patch(APIENDPOINTS.change_account_status,
            payload, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}

export const storeAttendance = async (payload) => {
    try {
        const res = await axios.post(APIENDPOINTS.save_attendance, payload, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}

export const storeLogout = async (payload) => {
    try {
        const res = await axios.post(APIENDPOINTS.save_logout, payload, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}    

export const fetchAttendanceList = async () => {
    try {
        const res = await axios.get(APIENDPOINTS.attendance_list, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}

export const fetchUsersAttendanceList = async () => {
    try {
        const res = await axios.get(
            APIENDPOINTS.users_attendance_list, config);
        return res?.data?.attendances;
    } catch {
        return catchMsg;
    }
}

export const leaveApply = async (payload) => {
    try {
        const res = await axios.post(APIENDPOINTS.leave_apply, payload, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}

export const pendingLeaveList = async () => {
    try {
        const res = await axios.get(APIENDPOINTS.all_leave_list, config);
        return res?.data?.leaves;
    } catch {
        return catchMsg;
    }
}

export const approveLeave = async (payload) => {
    try {
        const res = await axios.patch(APIENDPOINTS.leave_approve, payload, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}

export const declineLeave = async (payload) => {
    try {
        const res = await axios.patch(APIENDPOINTS.leave_decline, payload, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}

export const recommendLeave = async (payload) => {
    try {
        const res = await axios.patch(APIENDPOINTS.leave_recommend, payload, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}
    
export const leaveStatus = async () => {
    try {
        const res = await axios.get(APIENDPOINTS.leave_status, config);
        return res?.data?.leave_details;
    } catch {
        return catchMsg;
    }
}
    
export const userLates = async () => {
    try {
        const res = await axios.get(APIENDPOINTS.user_lates, config);
        return res?.data;
    } catch {
        return catchMsg;
    }
}
    
export const departmentList = async () => {
    try {
        const res = await axios.get(APIENDPOINTS.department_list, config);
        return res?.data?.departments;
    } catch {
        return catchMsg;
    }
}