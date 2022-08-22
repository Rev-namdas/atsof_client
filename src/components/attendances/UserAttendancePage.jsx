import React, { useEffect, useState } from "react";
import { COOKIE_KEY, getCookie } from "../../helpers/CookieStorage";
import * as api from "../../api/Api";
import { HumanMonth } from "../../helpers/HumanMonth";
import { UnixToDate } from "../../helpers/UnixToDate";

export default function UserAttendancePage() {
    const [attendances, setAttendances] = useState([]);

    const fetchData = async () => {
        const user = getCookie(COOKIE_KEY.USER_DATA);

        const payload = {
            dept_ids: user.dept_access,
        };
        const result = await api.fetchUsersAttendanceList(payload);
        setAttendances(result);
    };

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
                        <span>{ each.department.name }</span>
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
