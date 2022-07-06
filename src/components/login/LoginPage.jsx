import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/AdminApi"
import dateToUnix from "../../helpers/DateToUnix";

export default function LoginPage() {
    const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		const payload = {
			user_name: username, 
			password: password
		}
		const login_res = await api.login(payload)
		setMessage(login_res.data.message)

		if(login_res.data.flag === 'SUCCESS'){
			const today = new Date()
			const payload = {
				user_id: login_res.data.user_id, 
				month: (today.getMonth() + 1), 
				date: dateToUnix(today), 
				login_time: today.toLocaleTimeString()
			}

			await api.storeAttendance(payload)
			navigate("/dashboard", 
				{ state: {
					user_id: login_res.data.user_id, 
					login_message: payload.login_time, 
				} }
			)
		}
	}

	return (
        <form>
            <input 
				type="text" 
				placeholder="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)} 
			/>
            <input 
				type="password" 
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)} 
			/>
			<button onClick={handleSubmit}>Login</button>
			<div>
				{message}
			</div>
        </form>
    );
}
