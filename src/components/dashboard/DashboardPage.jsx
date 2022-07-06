import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as api from "../../api//AdminApi";
import dateToUnix from "../../helpers/DateToUnix";

export default function DashboardPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState("");

    const handleLogout = async () => {
        const today = new Date();
        const payload = {
            user_id: location.state.user_id,
            month: today.getMonth() + 1,
            date: dateToUnix(today),
            logout_time: today.toLocaleTimeString(),
        };

        const res = await api.storeAttendance(payload);
        setMessage(res.data.message);
    };

    return (
        <>
            <div>Dashboard</div>
            {location?.state?.login_message && (
                <div>{location?.state?.login_message}</div>
            )}

            <button onClick={() => navigate("/user/create")}>
                Create User
            </button>
            <button onClick={handleLogout}>Logout</button>
            <div>{message}</div>
        </>
    );
}
