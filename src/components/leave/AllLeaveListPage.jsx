import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import * as api from "../../api/AdminApi";
import { UnixToDate } from "../../helpers/UnixToDate";
import { toast, ToastContainer } from "react-toastify";

export default function AllLeaveListPage() {
    const [leaveList, setLeaveList] = useState([]);

    const leaveTypes = {
        171: "Casual Leave",
        181: "Sick Leave",
        151: "Annual Leave",
        161: "Holiday"
    }

    const fetchData = async () => {
        const res = await api.AllLeaveList({ client_roles: [369] });

        let list = [];
        for (let eachLeave of res.data.leaves) {
            let leaves = eachLeave.leave_dates.map((each) => ({
                ...each,
                user_id: eachLeave.user_id,
                name: eachLeave.username
            }));
            list.push(...leaves);
        }

        setLeaveList(list);
    };

    useEffect(
        () => {
            fetchData();
        },
        //eslint-disable-next-line
        []
    );

	const handleApprove = async (e, id, date) => {
		e.preventDefault()

		const payload = {
			user_id: id,
			date: date,
			client_roles: [369]
		}

		const res = await api.ApproveLeave(payload)
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

			fetchData()
		} else if (res.data.flag === 'FAIL'){
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
            <div>AllLeaveListPage</div>
            {leaveList &&
                leaveList.map((each, index) => (
                    <div key={index}>
                        {each.name} - {UnixToDate(each.from_date)} - {UnixToDate(each.to_date)} - {leaveTypes[each.leave_id]} -{" "}
                        {each.reason} -{" "}
						<button onClick={(e) => handleApprove(e, each.user_id, each.date)}>Approve</button>
                    </div>
                ))}
        </>
    );
}
