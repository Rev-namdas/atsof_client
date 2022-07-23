import React, { useState } from "react";
import * as api from "../../api/AdminApi";
import Navbar from "../layouts/Navbar";

export default function UserCreatePage() {
    const initialState = {
        username: "",
        password: "",
        role: "",
        dayoff: "",
    };
    const [details, setDetails] = useState(initialState);
    const [message, setMessage] = useState("");
    // leave type static & custom
    const [leaveType, setLeaveType] = useState("static");
    const [leaveDetails, setLeaveDetails] = useState('');

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
        setLeaveType(e.target.value)
        if(e.target.value === 'custom'){
            setLeaveDetails('')
        }
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
            {[
                "Saturday",
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
            ].map((each, index) => (
                <div key={index}>
                    <label htmlFor="day">{each}</label>
                    <select name="office-hour" id="office-hour">
                        <option value="">12 AM</option>
                        <option value="">1 AM</option>
                        <option value="">2 AM</option>
                        <option value="">3 AM</option>
                        <option value="">4 AM</option>
                        <option value="">5 AM</option>
                        <option value="">6 AM</option>
                        <option value="">7 AM</option>
                        <option value="">8 AM</option>
                        <option value="">9 AM</option>
                        <option value="">10 AM</option>
                        <option value="">11 AM</option>
                        <option value="">12 PM</option>
                        <option value="">1 PM</option>
                        <option value="">2 PM</option>
                        <option value="">3 PM</option>
                        <option value="">4 PM</option>
                        <option value="">5 PM</option>
                        <option value="">6 PM</option>
                        <option value="">7 PM</option>
                        <option value="">8 PM</option>
                        <option value="">9 PM</option>
                        <option value="">10 PM</option>
                        <option value="">11 PM</option>
                    </select>
                    <select name="office-minute" id="office-minute">
                        <option value="">00:00</option>
                        <option value="">01:00</option>
                        <option value="">02:00</option>
                        <option value="">03:00</option>
                        <option value="">04:00</option>
                        <option value="">05:00</option>
                        <option value="">06:00</option>
                        <option value="">07:00</option>
                        <option value="">08:00</option>
                        <option value="">09:00</option>
                        <option value="">10:00</option>
                        <option value="">11:00</option>
                        <option value="">12:00</option>
                        <option value="">13:00</option>
                        <option value="">14:00</option>
                        <option value="">15:00</option>
                        <option value="">16:00</option>
                        <option value="">17:00</option>
                        <option value="">18:00</option>
                        <option value="">19:00</option>
                        <option value="">20:00</option>
                        <option value="">21:00</option>
                        <option value="">22:00</option>
                        <option value="">23:00</option>
                        <option value="">24:00</option>
                        <option value="">25:00</option>
                        <option value="">26:00</option>
                        <option value="">27:00</option>
                        <option value="">28:00</option>
                        <option value="">29:00</option>
                        <option value="">30:00</option>
                        <option value="">31:00</option>
                        <option value="">32:00</option>
                        <option value="">33:00</option>
                        <option value="">34:00</option>
                        <option value="">35:00</option>
                        <option value="">36:00</option>
                        <option value="">37:00</option>
                        <option value="">38:00</option>
                        <option value="">39:00</option>
                        <option value="">40:00</option>
                        <option value="">41:00</option>
                        <option value="">42:00</option>
                        <option value="">43:00</option>
                        <option value="">44:00</option>
                        <option value="">45:00</option>
                        <option value="">46:00</option>
                        <option value="">47:00</option>
                        <option value="">48:00</option>
                        <option value="">49:00</option>
                        <option value="">50:00</option>
                        <option value="">51:00</option>
                        <option value="">52:00</option>
                        <option value="">53:00</option>
                        <option value="">54:00</option>
                        <option value="">55:00</option>
                        <option value="">56:00</option>
                        <option value="">57:00</option>
                        <option value="">58:00</option>
                        <option value="">59:00</option>
                        <option value="">60:00</option>
                    </select>

                    <span> - </span>

                    <select name="office-hour" id="office-hour">
                        <option value="">12 AM</option>
                        <option value="">1 AM</option>
                        <option value="">2 AM</option>
                        <option value="">3 AM</option>
                        <option value="">4 AM</option>
                        <option value="">5 AM</option>
                        <option value="">6 AM</option>
                        <option value="">7 AM</option>
                        <option value="">8 AM</option>
                        <option value="">9 AM</option>
                        <option value="">10 AM</option>
                        <option value="">11 AM</option>
                        <option value="">12 PM</option>
                        <option value="">1 PM</option>
                        <option value="">2 PM</option>
                        <option value="">3 PM</option>
                        <option value="">4 PM</option>
                        <option value="">5 PM</option>
                        <option value="">6 PM</option>
                        <option value="">7 PM</option>
                        <option value="">8 PM</option>
                        <option value="">9 PM</option>
                        <option value="">10 PM</option>
                        <option value="">11 PM</option>
                    </select>
                    <select name="office-minute" id="office-minute">
                        <option value="">00:00</option>
                        <option value="">01:00</option>
                        <option value="">02:00</option>
                        <option value="">03:00</option>
                        <option value="">04:00</option>
                        <option value="">05:00</option>
                        <option value="">06:00</option>
                        <option value="">07:00</option>
                        <option value="">08:00</option>
                        <option value="">09:00</option>
                        <option value="">10:00</option>
                        <option value="">11:00</option>
                        <option value="">12:00</option>
                        <option value="">13:00</option>
                        <option value="">14:00</option>
                        <option value="">15:00</option>
                        <option value="">16:00</option>
                        <option value="">17:00</option>
                        <option value="">18:00</option>
                        <option value="">19:00</option>
                        <option value="">20:00</option>
                        <option value="">21:00</option>
                        <option value="">22:00</option>
                        <option value="">23:00</option>
                        <option value="">24:00</option>
                        <option value="">25:00</option>
                        <option value="">26:00</option>
                        <option value="">27:00</option>
                        <option value="">28:00</option>
                        <option value="">29:00</option>
                        <option value="">30:00</option>
                        <option value="">31:00</option>
                        <option value="">32:00</option>
                        <option value="">33:00</option>
                        <option value="">34:00</option>
                        <option value="">35:00</option>
                        <option value="">36:00</option>
                        <option value="">37:00</option>
                        <option value="">38:00</option>
                        <option value="">39:00</option>
                        <option value="">40:00</option>
                        <option value="">41:00</option>
                        <option value="">42:00</option>
                        <option value="">43:00</option>
                        <option value="">44:00</option>
                        <option value="">45:00</option>
                        <option value="">46:00</option>
                        <option value="">47:00</option>
                        <option value="">48:00</option>
                        <option value="">49:00</option>
                        <option value="">50:00</option>
                        <option value="">51:00</option>
                        <option value="">52:00</option>
                        <option value="">53:00</option>
                        <option value="">54:00</option>
                        <option value="">55:00</option>
                        <option value="">56:00</option>
                        <option value="">57:00</option>
                        <option value="">58:00</option>
                        <option value="">59:00</option>
                        <option value="">60:00</option>
                    </select>
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
                            <option value={''}>
                                Select One
                            </option>
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
                            <input type="number" />
                        </div>

                        <div>
                            <label htmlFor="sick-leave">Sick Leave</label>
                            <input type="number" />
                        </div>

                        <div>
                            <label htmlFor="annual-leave">Annual Leave</label>
                            <input type="number" />
                        </div>

                        <div>
                            <label htmlFor="holiday">Govt. Holiday</label>
                            <input type="number" />
                        </div>
                    </>
                )}

                {leaveDetails !== ''
                &&
                (<div>
                    <span>{ leaveDetails }</span>
                </div>)
                }
            </div>

            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <div>{message}</div>
        </>
    );
}
