import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import * as api from "../../api/AdminApi";
import Cookies from "universal-cookie";
import { UnixToDate } from "../../helpers/UnixToDate";
import { leaveTypes } from "../../helpers/LeaveTypes";

const cookies = new Cookies()

export default function LeaveStatusPage() {
	const [leaveBalance, setLeaveBalance] = useState([])
	const [appliedLeaves, setAppliedLeaves] = useState([])

	const fetchData = async () => {
		const user = cookies.get('udata')
		const res = await api.leaveStatus(user.user_id)

		setLeaveBalance(res.data.leave_details.leave)
		setAppliedLeaves(res.data.leave_details.leave_dates)
	}
	
	useEffect(() => {
		fetchData()
	}, 
	// eslint-disable-next-line
	[])
	
	
    return (
        <>
            <Navbar />
            <div>LeaveStatusPage</div>
			<div>Leave Balance</div>
			{leaveBalance.map((each, index) => (
				<div key={index}>
					<span>{ each.leave_type }</span>
					<span> - </span>
					<span>{ each.leave_balance }</span>
					<span> - </span>
					<span>{ each.leave_taken }</span>
				</div>
			))}
			<br />

			<div>Leave Summary</div>
			{appliedLeaves.map((each, index) => (
				<div key={index}>
					<span>{ UnixToDate(each.from_date) }</span>
					<span> - </span>
					<span>{ UnixToDate(each.to_date) }</span>
					<span> - </span>
					<span>{ each.leave_count }</span>
					<span> - </span>
					<span>{ leaveTypes[each.leave_id] }</span>
				</div>
			))}
        </>
    );
}
