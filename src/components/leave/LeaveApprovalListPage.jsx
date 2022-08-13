import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import * as api from "../../api/AdminApi";
import { UnixToDate } from "../../helpers/UnixToDate";
import { toast, ToastContainer } from "react-toastify";
import { leaveTypes } from "../../helpers/LeaveTypes";

export default function LeaveApprovalListPage() {
    const [leaveList, setLeaveList] = useState([]);

    const fetchData = async () => {
        const res = await api.allLeaveList({ client_roles: [369] });

        setLeaveList(res.data.leaves);
    };

    useEffect(
        () => {
            fetchData();
        },
        //eslint-disable-next-line
        []
    );

	const handleApprove = async (e, obj) => {
		e.preventDefault()

		const payload = {
			user_id: obj.user_id,
			from_date: obj.from_date,
			to_date: obj.to_date,
            leave_count: obj.leave_count,
            taken_dates: obj.taken_dates,
			client_roles: [369]
		}

		const res = await api.approveLeave(payload)
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
            <div>LeaveApprovalListPage</div>
            {leaveList &&
                leaveList.map((each, index) => (
                    <div key={index}>
                        {each.name} - {UnixToDate(each.from_date)} - {UnixToDate(each.to_date)} - {leaveTypes[each.leave_id]} -{" "}
                        {each.reason} -{" "}
						<button onClick={(e) => handleApprove(e, each)}>Approve</button>
                    </div>
                ))
            }
        </>
    );
}
