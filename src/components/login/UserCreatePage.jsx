import React, { useState } from "react";
import * as api from "../../api/AdminApi";
import Navbar from "../layouts/Navbar";

export default function UserCreatePage() {
    const initialState = Object.freeze({
        username: "",
        password: "",
        role: "",
        dayoff: "",
    });
    const initialOfficeTime = Object.freeze({
        6: { starts: 0, ends: 0 },
        0: { starts: 0, ends: 0 },
        1: { starts: 0, ends: 0 },
        2: { starts: 0, ends: 0 },
        3: { starts: 0, ends: 0 },
        4: { starts: 0, ends: 0 },
        5: { starts: 0, ends: 0 },
    });
    const initialLeave = Object.freeze({
        151: 0,
        161: 0,
        171: 0,
        181: 0
    })

    const [details, setDetails] = useState(initialState);
    const [message, setMessage] = useState("");
    // leave type: static & custom
    const [leaveType, setLeaveType] = useState("static");
    const [leaveDetails, setLeaveDetails] = useState("");
    const [leaves, setLeaves] = useState(initialLeave)
    // office time type: common & custom
    const [officeTimeType, setOfficeTimeType] = useState("common");
    const [officeTime, setOfficeTime] = useState(initialOfficeTime);

    const weekDays = [
        {
            name: "Saturday",
            key: 6,
        },
        {
            name: "Sunday",
            key: 0,
        },
        {
            name: "Monday",
            key: 1,
        },
        {
            name: "Tuesday",
            key: 2,
        },
        {
            name: "Wednesday",
            key: 3,
        },
        {
            name: "Thursday",
            key: 4,
        },
        {
            name: "Friday",
            key: 5,
        },
    ];

    const handleChange = (e) => {
        if (e.target.name === "role" || e.target.name === "dayoff") {
            setDetails((prev) => ({
                ...prev,
                [e.target.name]: parseInt(e.target.value),
            }));
        } else {
            setDetails((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleLeaveType = (e) => {
        setLeaveType(e.target.value);
        if (e.target.value === "custom") {
            setLeaveDetails("");
        }
    };

    const handleOfficeTime = (e) => {
        const date = new Date();
        date.setHours(e.target.value.split(":")[0]);
        date.setMinutes(e.target.value.split(":")[1]);
        date.setSeconds(0);

        if (officeTimeType === "custom") {
            setOfficeTime((curState) => ({
                ...curState,
                [parseInt(e.target.dataset.key)]: {
                    ...curState[e.target.dataset.key],
                    [e.target.dataset.when]: date.toLocaleTimeString(),
                },
            }));
        }

        if (officeTimeType === "common") {
            for (let each of weekDays) {
                setOfficeTime((curState) => ({
                    ...curState,
                    [parseInt(each.key)]: {
                        ...curState[each.key],
                        [e.target.dataset.when]: date.toLocaleTimeString(),
                    },
                }));
            }
        }
    };

    const handleLeave = (e) => {
        setLeaves((curState) => {
            return {
                ...curState,
                [e.target.name]: parseInt(e.target.value)
            }
        })
    }

    const handleSubmit = async () => {
        const payload = {
            user_name: details.username,
            password: details.password,
            role: [details.role],
            dayoff: details.dayoff,
            client_roles: [369],
        };

        const res = await api.register(payload);
        setMessage(res.data.message);
    };

    return (
        <>
            <Navbar />
            <div>
                <h3>User Create Page</h3>
            </div>
            <div>
                <button onClick={() => console.log(officeTime, leaves)}>Print</button>
            </div>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={details.username}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={details.password}
                onChange={handleChange}
            />
            <select
                name="role"
                id="role"
                value={details.role}
                onChange={handleChange}
            >
                <option defaultValue="">Select User Role</option>
                <option value={process.env.REACT_APP_ROLE_USER}>User</option>
                <option value={process.env.REACT_APP_ROLE_ADMIN}>Admin</option>
            </select>
            <select
                name="dayoff"
                id="dayoff"
                value={details.dayoff}
                onChange={handleChange}
            >
                <option defaultValue="">Select Day Off</option>
                <option value="7">Saturday</option>
                <option value="1">Sunday</option>
                <option value="2">Monday</option>
                <option value="3">Tuesday</option>
                <option value="4">Wednesday</option>
                <option value="5">Thursday</option>
                <option value="6">Friday</option>
            </select>
            <div>
                <h3>Office Time</h3>
            </div>

            <div>
                <label htmlFor="office-time">
                    <input
                        type="radio"
                        name="office-time"
                        id="office-time"
                        value="common"
                        checked={officeTimeType === "common"}
                        onChange={(e) => setOfficeTimeType(e.target.value)}
                    />
                    Common
                </label>
                <label htmlFor="office-time-2">
                    <input
                        type="radio"
                        name="office-time"
                        id="office-time-2"
                        value="custom"
                        checked={officeTimeType === "custom"}
                        onChange={(e) => setOfficeTimeType(e.target.value)}
                    />
                    Custom
                </label>
            </div>

            {officeTimeType === "common" && (
                <>
                    <input
                        type="time"
                        data-key="common"
                        data-when="starts"
                        onChange={handleOfficeTime}
                    />
                    <span> - </span>
                    <input
                        type="time"
                        data-key="common"
                        data-when="ends"
                        onChange={handleOfficeTime}
                    />
                </>
            )}

            {officeTimeType === "custom" &&
                weekDays.map((each, index) => (
                    <div key={index}>
                        <label htmlFor="day">{each.name}</label>

                        <input
                            type="time"
                            data-key={each.key}
                            data-when="starts"
                            onChange={handleOfficeTime}
                        />
                        <span> - </span>
                        <input
                            type="time"
                            data-key={each.key}
                            data-when="ends"
                            onChange={handleOfficeTime}
                        />
                    </div>
                ))}

            <div>
                <h3>Leave Balance</h3>

                <div>
                    <label htmlFor="leave-type">
                        <input
                            type="radio"
                            name="leave-type"
                            id="leave-type"
                            value="static"
                            checked={leaveType === "static"}
                            onChange={handleLeaveType}
                        />
                        Static
                    </label>

                    <input
                        type="radio"
                        name="leave-type"
                        id="leave-type-2"
                        value="custom"
                        checked={leaveType === "custom"}
                        onChange={handleLeaveType}
                    />
                    <label htmlFor="leave-type-2">Custom</label>
                </div>

                {leaveType === "static" && (
                    <div>
                        <label htmlFor="leave-policy">Leave Policy</label>
                        <select
                            name="lave-policy"
                            id="leave-policy"
                            value={leaveDetails}
                            onChange={(e) => setLeaveDetails(e.target.value)}
                        >
                            <option value={""}>Select One</option>
                            <option value="Casual: 10, Sick: 14, Annual: 15, Holiday: 11">
                                General 1
                            </option>
                            <option value="Casual: 1, Sick: 2, Annual: 3, Holiday: 4">
                                General 2
                            </option>
                            <option value="Casual: 6, Sick: 4, Annual: 5, Holiday: 1">
                                General 3
                            </option>
                        </select>
                    </div>
                )}

                {leaveType === "custom" && (
                    <>
                        <div>
                            <label htmlFor="casual-leave">Casual Leave</label>
                            <input
                                type="number"
                                name={process.env.REACT_APP_LEAVE_CASUAL}
                                onChange={handleLeave}
                            />
                        </div>

                        <div>
                            <label htmlFor="sick-leave">Sick Leave</label>
                            <input 
                                type="number"
                                name={process.env.REACT_APP_LEAVE_SICK} 
                                onChange={handleLeave}
                            />
                        </div>

                        <div>
                            <label htmlFor="annual-leave">Annual Leave</label>
                            <input 
                                type="number" 
                                name={process.env.REACT_APP_LEAVE_ANNUAL}
                                onChange={handleLeave}
                            />
                        </div>

                        <div>
                            <label htmlFor="holiday">Govt. Holiday</label>
                            <input 
                                type="number" 
                                name={process.env.REACT_APP_LEAVE_HOLIDAY}
                                onChange={handleLeave}
                            />
                        </div>
                    </>
                )}

                {leaveDetails !== "" && (
                    <div>
                        <span>{leaveDetails}</span>
                    </div>
                )}
            </div>

            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <div>{message}</div>
        </>
    );
}
