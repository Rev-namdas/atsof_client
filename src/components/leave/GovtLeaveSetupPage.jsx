import moment from "moment";
import React, { useState } from "react";
import * as api from "../../api/Api"

export default function GovtLeaveSetupPage() {
    const [leaveDate, setLeaveDate] = useState("");
    const [userLeaveDate, setUserLeaveDate] = useState("");
    const [leaveName, setLeaveName] = useState("");
	const [message, setMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

    const handleDateChange = (e) => {
        setUserLeaveDate(e.target.value);
        setLeaveDate(moment(e.target.value, "YYYY-MM-DD").startOf('day').unix());
    };

	const handleSubmit = async () => {
		setIsLoading(true)

		const payload = {
			leave_name: leaveName,
			leave_date: leaveDate
		}

		const result = await api.createGovtLeave(payload)

		if(result.flag === 'SUCCESS'){
			setMessage(result.message)
			setUserLeaveDate("")
			setLeaveName("")
		} else if(result.flag === 'WARNING'){
			setMessage(result.message)
		} else {
			setMessage("Something went wrong")
		}


		setIsLoading(false)
	}

    return (
        <>
            <div>GovtLeaveSetupPage</div>
            <div>
                <input
                    type="date"
                    name="leave"
                    id="leave"
                    value={userLeaveDate}
                    onChange={handleDateChange}
					/>

                <input
                    type="text"
                    placeholder="Leave Name"
                    value={leaveName}
                    onChange={(e) => setLeaveName(e.target.value)}
					style={{ width: "15rem" }}
                />
            </div>
			<div>
				<button disabled={isLoading} onClick={handleSubmit}>Create</button>
			</div>
			<div>{ message }</div>
        </>
    );
}
