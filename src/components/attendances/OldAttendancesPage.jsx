import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import { HumanMonth } from "../../helpers/HumanMonth";
import { UnixToDate } from "../../helpers/UnixToDate";

export default function OldAttendancesPage() {
    const [userDetails, setUserDetails] = useState([]);

    const fetchAttendances = async () => {
        const res = await api.fetchAttendanceList();
        setUserDetails(res);
    };

    useEffect(
        () => {
            fetchAttendances();
        },
        // eslint-disable-next-line
        []
    );
    return (
        <>
            <div>
                <span>Month</span>
                <span> - </span>
                <span>Date</span>
                <span> - </span>
                <span>Login Time</span>
                <span> - </span>
                <span>Logout Time</span>
            </div>
            <div>
                {userDetails?.attendance
                ?.map((each, index) => (
                    <div key={index} style={{ color: `${each.late === 1 && 'red'}` }}>
                        <span>{HumanMonth(each.month)}</span>
                        <span> - </span>
                        <span>{UnixToDate(each.date)}</span>
                        <span> - </span>
                        <span>{each.login_time}</span>
                        <span> - </span>
                        <span>{each.logout_time}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
