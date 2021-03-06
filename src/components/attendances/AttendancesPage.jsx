import React, { useEffect, useState } from "react";
import * as api from "../../api//AdminApi";
import Cookies from "universal-cookie";
import { HumanMonth } from "../../helpers/HumanMonth";
import { UnixToDate } from "../../helpers/UnixToDate";
import Navbar from "../layouts/Navbar";

const cookies = new Cookies();

export default function AttendancesPage() {
    const [userDetails, setUserDetails] = useState([]);

    const fetchAttendances = async () => {
        const udata = cookies.get("udata");
        const res = await api.fetchAttendanceList(udata.user_id);
        setUserDetails(res.data);
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
			<Navbar />

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
                {userDetails?.attendance?.map((each, index) => (
                    <div key={index}>
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
