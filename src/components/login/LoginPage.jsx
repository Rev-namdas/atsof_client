import React, { useState } from "react";
import * as api from "../../api/Api";
import DateToUnix from "../../helpers/DateToUnix";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { COOKIE_KEY, setCookie } from "../../helpers/CookieStorage";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disableBtn, setDisableBtn] = useState(false)

    const error_msg = {
        username: "Username field required",
        password: "Password field required"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === "") {
            toast.dismiss()

			return toast.error(error_msg.username, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
        }

        if (password === "") {
            toast.dismiss()

			return toast.error(error_msg.password, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
        }

        setDisableBtn(true)

        const payload = {
            user_name: username,
            password: password,
        };
        const login_res = await api.login(payload);

        if(login_res.flag === 'FAIL'){
            setDisableBtn(false)

            toast.dismiss()
			return toast.error(login_res.message, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}

        if (login_res.flag === "SUCCESS") {
            const today = new Date();
            const payload = {
                user_id: login_res.user_id,
                department: login_res.department,
                month: moment().format("M"),
                date: DateToUnix(today),
                login_time: moment().format("hh:mm:ss A"),
            };

            const res = await api.storeAttendance(payload);

			if(res.flag === 'SUCCESS'){
                toast.dismiss()
				toast.success(res.message, {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});

                setCookie(COOKIE_KEY.USER_DATA, {...login_res, date: payload.date})
                localStorage.setItem('atsofauth', 'AT-SOF-AUTH-CHECK')

				setTimeout(() => {
                    window.location.href = "/dashboard"
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
