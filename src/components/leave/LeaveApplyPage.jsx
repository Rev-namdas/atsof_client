/* eslint-disable */

import React, { useState } from "react";
import Cookies from "universal-cookie";
import DateToUnix from "../../helpers/DateToUnix";
import Navbar from "../layouts/Navbar";
import * as api from "../../api/AdminApi"
import { toast, ToastContainer } from "react-toastify";
import moment from "moment"

const cookies = new Cookies();

export default function LeaveApplyPage() {
    const user = cookies.get("udata");

    const [leaveStartDate, setLeaveStartDate] = useState(null);
    const [leaveEndDate, setLeaveEndDate] = useState(null)
    const [leaveType, setLeaveType] = useState(null);
    const [leaveReason, setLeaveReason] = useState("");
    const [leaveCount, setLeaveCount] = useState(0)

    const findDatesByStartEndDates = (from_date, to_date) => {
      const startDate = moment(from_date * 1000)
      const endDate = moment(to_date * 1000)
      const leave_day_count = endDate.diff(startDate, 'days')

      let dates = [{ day: startDate.day(), date: startDate.unix() }]

      for(let i=0; i<leave_day_count; i++){
        const nextDate = startDate.add(1, 'days')
        
        dates.push({
          day: nextDate.day(),
          date: nextDate.unix()
        })
      }

      setLeaveCount(dates.length)

      return dates
    }

    const handleDate = (e) => {
      if(e.target.name === 'from_date'){
        const date = new Date(e.target.value)

        setLeaveStartDate(DateToUnix(date))
      } else if(e.target.name === 'to_date'){
        const date = new Date(e.target.value)

        setLeaveEndDate(DateToUnix(date))
      }
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
        from_date: leaveStartDate,
        to_date: leaveEndDate,
        taken_dates: findDatesByStartEndDates(leaveStartDate, leaveEndDate),
        leave_count: leaveCount,
        leave_id: leaveType,
        reason: leaveReason.trim()
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
                <label htmlFor="date">From Date</label>
                <input
                    type="date"
                    name="from_date"
                    id="date"
                    onChange={handleDate}
                />

                <label htmlFor="date">To Date</label>
                <input
                    type="date"
                    name="to_date"
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
