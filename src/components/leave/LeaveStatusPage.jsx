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
	
	const userLeaveStatus = (val) => {
		if(val === 0){
			return 'Pending'
		} else if(val === 1){
			return 'Approved'
		} else if(val < 0){
			return 'Declined'
		}
	}
	
    return (
        <>
            <div>LeaveStatusPage</div>
			<div>Leave Balance</div>
			<div>
				<span>Type -</span>
				<span>Total -</span>
				<span>Taken -</span>
				<span>Remaining</span>
			</div>
			{leaveBalance.map((each, index) => (
				<div key={index}>
					<span>{ each.leave_type }</span>
					<span> - </span>
					<span>{ each.leave_balance }</span>
					<span> - </span>
					<span>{ each.leave_taken }</span>
					<span> - </span>
					<span>{ (each.leave_balance - each.leave_taken) }</span>
				</div>
			))}
			<br />

			<div>Leave Summary</div>
			{appliedLeaves
			.sort((a, b) => a.from_date > b.from_date ? 1 : -1)
			.map((each, index) => (
				<div key={index}>
					<span>{ UnixToDate(each.from_date) }</span>
					<span> - </span>
					<span>{ UnixToDate(each.to_date) }</span>
					<span> - </span>
					<span>{ each.leave_count }</span>
					<span> - </span>
					<span>{ leaveTypes[each.leave_id] }</span>
					<span> - </span>
					<span>{ each.reason }</span>
					<span> - </span>
					<span>{ userLeaveStatus(each.approved) }</span>
				</div>
			))}
        </>
    );
}
