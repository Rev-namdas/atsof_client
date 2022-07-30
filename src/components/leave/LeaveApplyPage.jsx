import React, { useState } from "react";
import Cookies from "universal-cookie";
import DateToUnix from "../../helpers/DateToUnix";
import Navbar from "../layouts/Navbar";
import * as api from "../../api/AdminApi"
import { toast, ToastContainer } from "react-toastify";

const cookies = new Cookies();

export default function LeaveApplyPage() {
    const user = cookies.get("udata");

    const [leaveDate, setLeaveDate] = useState(null);
    const [leaveDay, setLeaveDay] = useState(null)
    const [leaveType, setLeaveType] = useState(null);
    const [leaveReason, setLeaveReason] = useState("");

    const handleDate = (e) => {
      const date = new Date(e.target.value)
      setLeaveDay(date.getDay())
      setLeaveDate(DateToUnix(date))
    };

    const handleLeaveType = (e) => {
      setLeaveType(parseInt(e.target.value));
    };

    const handleReason = (e) => {
      setLeaveReason(e.target.value)
    };

    const handleSubmit = async (e) => {
      e.preventDefault()

      const payload = {
        user_id: user.user_id,
        name: user.username,
        day: leaveDay,
        date: leaveDate,
        reason: leaveReason.trim(),
        leave_id: leaveType
      }

      const res = await api.leaveApply(payload)

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
      } else if(res.data.flag === 'FAIL'){
        toast.dismiss()
				toast.error(res.data.message, {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
      }
    }

    return (
        <>
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

            <Navbar />
            <div>LeaveApplyPage</div>
            <div>
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    onChange={handleDate}
                />
            </div>
            <div>
                <label htmlFor="type">Leave Type</label>
                <select name="type" id="type" onChange={handleLeaveType}>
                    <option value="">Select Type</option>
                    <option value={process.env.REACT_APP_LEAVE_CASUAL}>
                        Casual
                    </option>
                    <option value={process.env.REACT_APP_LEAVE_SICK}>
                        Sick
                    </option>
                    <option value={process.env.REACT_APP_LEAVE_ANNUAL}>
                        Annual
                    </option>
                </select>
            </div>
            <div>
                <label htmlFor="reason">Reason</label>
                <textarea
                    name="reason"
                    id="reason"
                    cols="30"
                    rows="2"
                    onChange={handleReason}
                ></textarea>
            </div>
            <div>
                <button onClick={handleSubmit}>Apply</button>
            </div>
        </>
    );
}
