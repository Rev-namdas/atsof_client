import React, { useEffect, useState } from "react";
import * as api from "../../api/AdminApi";
import { UnixToDate } from "../../helpers/UnixToDate";
import { toast, ToastContainer } from "react-toastify";
import { leaveTypes } from "../../helpers/LeaveTypes";
import { COOKIE_KEY, getCookie } from "../../helpers/CookieStorage";

export default function LeaveApprovalListPage() {
    const [leaveList, setLeaveList] = useState([]);

    const fetchData = async (role) => {
        const payload = {
            client_roles: role
        }
        const res = await api.allLeaveList(payload);

        setLeaveList(res.data.leaves || []);
    };

    useEffect(
        () => {
            const user = getCookie(COOKIE_KEY.USER_DATA)
            fetchData(user.role);
        },
        //eslint-disable-next-line
        []
    );

	const handleApprove = async (e, obj) => {
		e.preventDefault()

        const user = getCookie(COOKIE_KEY.USER_DATA)
        
		const payload = {
			user_id: obj.user_id,
			from_date: obj.from_date,
			to_date: obj.to_date,
            leave_count: obj.leave_count,
            taken_dates: obj.taken_dates,
			client_roles: user.role
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

			fetchData(user.role)
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

	const handleDecline = async (e, obj) => {
		e.preventDefault()

        const user = getCookie(COOKIE_KEY.USER_DATA)
        
		const payload = {
			user_id: obj.user_id,
			from_date: obj.from_date,
			to_date: obj.to_date,
            client_roles: user.role
		}

		const res = await api.declineLeave(payload)
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

			fetchData(user.role)
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

            <div>LeaveApprovalListPage</div>
            {leaveList.length === 0
                ? <span>No Record Found</span>
                : (
                    leaveList.map((each, index) => (
                        <div key={index}>
                            {each.name} - {UnixToDate(each.from_date)} - {UnixToDate(each.to_date)} - {leaveTypes[each.leave_id]} -{" "}
                            {each.reason} -{" "}
                            <button onClick={(e) => handleApprove(e, each)}>Approve</button>{" "}
                            <button onClick={(e) => handleDecline(e, each)}>Decline</button>
                        </div>
                    ))
                )
            }
        </>
    );
}
