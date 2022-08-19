import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import { UnixToDate } from "../../helpers/UnixToDate";
import { leaveTypes } from "../../helpers/LeaveTypes";
import { COOKIE_KEY, getCookie } from "../../helpers/CookieStorage";

export default function LeaveStatusPage() {
	const [leaveBalance, setLeaveBalance] = useState([])
	const [appliedLeaves, setAppliedLeaves] = useState([])

	const fetchData = async () => {
		const user = getCookie(COOKIE_KEY.USER_DATA)
		const res = await api.leaveStatus(user.user_id)

		setLeaveBalance(res?.leave || [])
		setAppliedLeaves(res?.leave_dates || [])
	}
	
	useEffect(() => {
		fetchData()
	}, 
	// eslint-disable-next-line
	[])
	
	
    return (
        <>
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
