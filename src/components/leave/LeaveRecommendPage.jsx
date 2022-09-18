import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import { UnixToDate } from "../../helpers/UnixToDate";
import { toast, ToastContainer } from "react-toastify";
import { leaveTypes } from "../../helpers/LeaveTypes";

export default function LeaveRecommendPage() {
	document.title = "AT Soft | Leave Recommend Page"

    const [leaveList, setLeaveList] = useState([]);

    const fetchData = async () => {
        const res = await api.pendingLeaveList();

        setLeaveList(res || []);
    };

    useEffect(
        () => {
            fetchData();
        },
        //eslint-disable-next-line
        []
    );

	const handleRecommend = async (e, person) => {
		e.preventDefault()
        
		const payload = {
			decision: 'recommend',
			employee_id: person.user_id,
			from_date: person.from_date,
			to_date: person.to_date
		}

		const res = await api.recommendLeave(payload)
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

			fetchData()
		} else if (res.flag === 'FAIL'){
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

	const handleDecline = async (e, permission) => {
		e.preventDefault()
        
		const payload = {
			decision: 'decline',
			user_id: permission.user_id,
			from_date: permission.from_date,
			to_date: permission.to_date,
		}

		const res = await api.recommendLeave(payload)
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

			fetchData()
		} else if (res.flag === 'FAIL'){
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

	const recommend = (val) => {
		return val.map(each => each).join(", ")
	}

    return (
        <div style={{ marginTop: "5rem" }}>
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
                            {each.reason} - {recommend(each.recommended)} - {each.declined}
                            <button onClick={(e) => handleRecommend(e, each)}>Recommend</button>{" "}
                            <button onClick={(e) => handleDecline(e, each)}>Decline</button>
                        </div>
                    ))
                )
            }
        </div>
    );
}
