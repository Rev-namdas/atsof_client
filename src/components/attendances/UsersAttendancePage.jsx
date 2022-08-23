import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import { HumanMonth } from "../../helpers/HumanMonth";
import { UnixToDate } from "../../helpers/UnixToDate";

export default function UsersAttendancePage() {
    const [attendances, setAttendances] = useState([]);
    const [departments, setDepartments] = useState([])

    const fetchData = async () => {
        const depts = await api.departmentList()
        setDepartments(depts);

        const result = await api.fetchUsersAttendanceList();
        setAttendances(result);
    };

    const departmentName = (id) => {
        const dept_name = departments?.find(
            each => each.dept_id === id)?.dept_name
        return dept_name
    }

    useEffect(
        () => {
            fetchData();
        },
        // eslint-disable-next-line
        []
    );

    return (
        <>
            <div>
                <span>User</span>
                <span> - </span>
                <span>Department</span>
                <span> - </span>
                <span>Month</span>
                <span> - </span>
                <span>Date</span>
                <span> - </span>
                <span>Login Time</span>
                <span> - </span>
                <span>Logout Time</span>
            </div>
            <div>
                {attendances?.map((each, index) => (
                    <div
                        key={index}
                        style={{ color: `${each.late === 1 && "red"}` }}
                    >
                        <span>{ each.username }</span>
                        <span> - </span>
                        <span>{ departmentName(each.department_id) }</span>
                        <span> - </span>
                        <span>{HumanMonth(each.attendance.month)}</span>
                        <span> - </span>
                        <span>{UnixToDate(each.attendance.date)}</span>
                        <span> - </span>
                        <span>{each.attendance.login_time}</span>
                        <span> - </span>
                        <span>{each.attendance.logout_time}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
