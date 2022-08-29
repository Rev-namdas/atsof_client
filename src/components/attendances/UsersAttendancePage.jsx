import moment from "moment";
import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";

export default function UsersAttendancePage() {
    const [attendances, setAttendances] = useState([]);
    const [userDate, setUserDate] = useState(moment().format("YYYY-MM-DD"));
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)

        const result = await api.fetchUsersAttendanceList();
        setAttendances(result);

        setIsLoading(false)
    };

    useEffect(
        () => {
            fetchData();
        },
        // eslint-disable-next-line
        []
    );

    const handleDate = async (e) => {
        setIsLoading(true)
        setUserDate(e.target.value)

        const payload = {
            date: moment(e.target.value, "YYYY-MM-DD").unix()
        }
        const res = await api.searchDeptWiseAttendanceByDate(payload)
        setAttendances(res)
        setIsLoading(false)
    }

    return (
        <>
            <div>
                <input 
                    type="date" 
                    name="date" 
                    id="date" 
                    value={userDate}
                    onChange={handleDate}
                />
            </div>
            {
                isLoading
                ? <div>Loading... ...</div>
                : (
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
                                    <span>{ each.department }</span>
                                    <span> - </span>
                                    <span>{ each.month }</span>
                                    <span> - </span>
                                    <span>{ each.date }</span>
                                    <span> - </span>
                                    <span>{ each.login_time }</span>
                                    <span> - </span>
                                    <span>{ each.logout_time }</span>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </>
    );
}
