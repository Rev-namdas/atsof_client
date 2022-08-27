import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import moment from "moment"

export default function AttendancesPage() {
    const [userDetails, setUserDetails] = useState([]);
    const [startDate, setStartDate] = useState("")
    const [userStartDate, setUserStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [userEndDate, setUserEndDate] = useState("")

    const fetchAttendances = async () => {
        const res = await api.fetchUserMonthlyAttendance();
        setUserDetails(res);
    };

    useEffect(
        () => {
            fetchAttendances();
        },
        // eslint-disable-next-line
        []
    );

    const handleDate = (e) => {
        if(e.target.name === "startdate"){
            setStartDate(moment(e.target.value, "YYYY-MM-DD").unix());
            setUserStartDate(e.target.value)
        } else if(e.target.name === "enddate"){
            setEndDate(moment(e.target.value, "YYYY-MM-DD").unix());
            setUserEndDate(e.target.value)
        } 
    }

    const handleSearch = async () => {
        const payload = {
            start_date: startDate,
            end_date: endDate
        }
        const res = await api.searchUserAttendanceByDates(payload)
        setUserDetails(res);
    }

    const handleReset = () => {
        fetchAttendances()
        setStartDate("")
        setUserStartDate("")
        setEndDate("")
        setUserEndDate("")
    }

    return (
        <>
            <div>
                <label htmlFor="startdate">Start Date</label>
                <input 
                    type="date" 
                    name="startdate" 
                    id="startdate" 
                    value={userStartDate}
                    onChange={handleDate}
                />
                <label htmlFor="enddate">End Date</label>
                <input 
                    type="date" 
                    name="enddate" 
                    id="enddate" 
                    min={userStartDate}
                    value={userEndDate}
                    onChange={handleDate}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleReset}>Reset</button>
            </div>
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
                    <div key={index} style={{ color: `${each.late === 1 && 'red'}` }}>
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