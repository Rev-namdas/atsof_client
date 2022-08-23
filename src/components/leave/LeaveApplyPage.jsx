import React, { useState } from "react";
import DateToUnix from "../../helpers/DateToUnix";
import * as api from "../../api/Api"
import { toast, ToastContainer } from "react-toastify";
import moment from "moment"

export default function LeaveApplyPage() {
    const [leaveStartDate, setLeaveStartDate] = useState(null);
    const [leaveEndDate, setLeaveEndDate] = useState(null)
    const [leaveType, setLeaveType] = useState(null);
    const [leaveReason, setLeaveReason] = useState("");

    const findDatesByStartEndDates = (from_date, to_date) => {
      const startDate = moment(from_date * 1000)
      const endDate = moment(to_date * 1000)
      const leave_day_count = endDate.diff(startDate, 'days')

      let dates = [{ day: startDate.day(), date: startDate.unix() }]
      
      if(leave_day_count === 0){
        return dates
      }
      
      if(leave_day_count === 1){
        dates = [
          { day: startDate.day(), date: startDate.unix() }, 
          { day: endDate.day(), date: endDate.unix() }
        ]
        
        return dates
      }

      for(let i=0; i<leave_day_count; i++){
        const nextDate = startDate.add(1, 'days')
        
        dates.push({
          day: nextDate.day(),
          date: nextDate.unix()
        })
      }

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
        from_date: leaveStartDate,
        to_date: leaveEndDate,
        taken_dates: findDatesByStartEndDates(leaveStartDate, leaveEndDate),
        leave_count: findDatesByStartEndDates(leaveStartDate, leaveEndDate).length,
        leave_id: leaveType,
        reason: leaveReason.trim()
      }

      const res = await api.leaveApply(payload)

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
      } else if(res.flag === 'FAIL'){
        toast.dismiss()
				toast.error(res.message, {
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
