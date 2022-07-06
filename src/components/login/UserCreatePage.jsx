import React, { useState } from "react";
import * as api from "../../api/AdminApi"

export default function UserCreatePage() {
    const initialState = {
        username: "",
        password: "",
        role: "",
        dayoff: "",
    };
    const [details, setDetails] = useState(initialState);
	const [message, setMessage] = useState("")

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

	const handleSubmit = async () => {
		const payload = {
			user_name: details.username,
			password: details.password,
			role: [details.role],
			dayoff: details.dayoff,
			client_roles: [369]
		}

		const res = await api.register(payload)
		setMessage(res.data.message)
	}

    return (
        <>
            <div>User Create Page</div>
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
                <option value="852">User</option>
                <option value="147">Admin</option>
            </select>
            <select
                name="dayoff"
                id="dayoff"
                value={details.dayoff}
                onChange={handleChange}
            >
                <option defaultValue="">Select Day Off</option>
                <option value="1">Sunday</option>
                <option value="2">Monday</option>
                <option value="3">Tuesday</option>
                <option value="4">Wednesday</option>
                <option value="5">Thursday</option>
                <option value="6">Friday</option>
                <option value="7">Saturday</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
			
			<div>{ message }</div>
		</>
    );
}
