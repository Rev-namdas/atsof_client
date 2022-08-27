import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";

export default function AttendancesPage() {
    const [userDetails, setUserDetails] = useState([]);

    const fetchAttendances = async () => {
        const res = await api.fetchUsersMonthlyAttendance();
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
                {userDetails
                ?.map((each, index) => (
                    <div key={index} >
                        <span>{each.month}</span>
                        <span> - </span>
                        <span>{each.date}</span>
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

// style={{ color: `${each.late === 1 && 'red'}` }}