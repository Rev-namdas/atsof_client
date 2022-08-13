import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/AdminApi";
import DateToUnix from "../../helpers/DateToUnix";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie"
import moment from "moment";

const cookies = new Cookies()

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disableBtn, setDisableBtn] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisableBtn(true)

        const payload = {
            user_name: username,
            password: password,
        };
        const login_res = await api.login(payload);

        if(login_res.data.flag === 'FAIL'){
            setDisableBtn(false)

            toast.dismiss()
			return toast.error(login_res.data.message, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}

        if (login_res.data.flag === "SUCCESS") {
            const today = new Date();
            const payload = {
                user_id: login_res.data.user_id,
                month: moment().format("M"),
                date: DateToUnix(today),
                login_time: moment().format("hh:mm:ss A"),
            };

			cookies.set('udata', {...login_res.data, date: payload.date});

            const res = await api.storeAttendance(payload);

			if(res.data.flag === 'SUCCESS'){
                toast.dismiss()
				toast.success(res.data.message, {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});

				setTimeout(() => {
					navigate("/dashboard");
                    setDisableBtn(false)
				}, 2000);
			}
        }
    };

    return (
        <div className="login_wrapper">
			<ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <form className="login_box">
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
                <button disabled={disableBtn} onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}
