import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import { COOKIE_KEY, getCookie } from "../../helpers/CookieStorage";
import moment from "moment"

export default function HolidayExchange() {
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const [pendingList, setPendingList] = useState([]);
    const [deptList, setDeptList] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const [userSelection, setUserSelection] = useState("");
    const [exchangeSelection, setExchangeSelection] = useState("");
    const [dateSelection, setDateSelection] = useState("");

    useEffect(
        () => {
            fetchData();
        },
        // eslint-disable-next-line
        []
    );

    const fetchData = async () => {
        const user = getCookie(COOKIE_KEY.USER_DATA);
        let users = []

        if(user.dept_access.length === 0){
            users.push({
                user_id: user.user_id,
                username: user.username,
                dayoff: user.dayoff[0]
            });
        } else {
            const payload = {
                dept_ids: user.dept_access,
            };
            
            users = await api.fetchUsersByDept(payload);

            users.unshift({
                user_id: user.user_id,
                username: user.username,
                dayoff: user.dayoff[0]
            });
        }

        setUsers(users);

        const depts = await api.departmentList()
        setDeptList(depts);

        const result = await api.pendingExchangeList()
        setPendingList(result);
    };

    const fetchPendingList = async () => {
        const result = await api.pendingExchangeList()
        setPendingList(result);
    }

    const departmentName = (id) => {
        return deptList.find(each => each.dept_id === id).dept_name
    }

    const pendingStatus = (val) => {
        const status = { 0: "Pending" }

        return status[val]
    }

    const humanReadAbleDate = (unix) => {
        return moment.unix(unix).format("DD-MM-YYYY")
    }

    const handleSelection = (e) => {
        setExchangeSelection(e.target.value);
        setUserSelection("")
        setList([]);
    };

    const handleUsersDetails = async (e) => {
        if(exchangeSelection !== ""){
            setIsLoading(true);
            setUserSelection(e.target.value)
    
            const payload = {
                selection: exchangeSelection,
                user_id: (e.target.value)?.split("_")[0],
                user_dayoff: parseInt((e.target.value)?.split("_")[1])
            }
    
            const result = await api.exchangeAbleHolidays(payload);
    
            if (result.flag === "SUCCESS") {
                setList(result.list);
            }
            setIsLoading(false);
        }
    }

    const handleApply = async () => {
        const payload = {
            selection: exchangeSelection,
            user_id: userSelection?.split("_")[0],
            date: parseInt(dateSelection.split("_")[0]),
            details: dateSelection.split("_")[1]
        };

        const result = await api.exchangeRequest(payload)

        alert(result.message)
        fetchPendingList()
    };

    const handleApprove = async (user) => {
        const payload = {
            user_id: user.user_id,
            date: user.exchanged_dates.date,
            holiday_type: user.exchanged_dates.details
        }

        const result = await api.approveExchangeRequest(payload)

        alert(result.message)
        fetchPendingList()
    }

    return (
        <>
            <div>HolidayExchange</div>

            <div>
                <label htmlFor="holiday">Exchange Type</label>
                <select
                    name="holiday"
                    id="holiday"
                    value={exchangeSelection}
                    onChange={handleSelection}
                >
                    <option value="">Select Type</option>
                    <option value="day-off">Day Off</option>
                    <option value="holiday">Holiday</option>
                </select>
            </div>

            <div>
                <label htmlFor="user">Select User</label>
                <select
                    name="user"
                    id="user"
                    value={userSelection}
                    onChange={handleUsersDetails}
                >
                    <option value="">Select</option>
                    {users.map((each, index) => (
                        <option key={index} value={`${each.user_id}_${each.dayoff}`}>
                            {each.username}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="list">Exchange For</label>
                <select
                    name="list"
                    id="list"
                    value={dateSelection}
                    onChange={(e) => setDateSelection(e.target.value)}
                >
                    {isLoading ? (
                        <option value="no">Loading...</option>
                    ) : (
                        <>
                            {exchangeSelection === ""
                            ? (
                                <option value="">
                                    Select Exchange Type First
                                </option>
                            )
                            :
                                <>
                                    <option value="">Select {`${exchangeSelection === 'day-off' ? "Day Off" : "Holiday"}`}</option>
                                    {list.map((each, index) => (
                                        <option key={index} value={`${each.date}_${each.details}`}>
                                            { each.label }
                                        </option>
                                    ))}
                                </>
                            }
                        </>
                    )}
                </select>
            </div>

            <div>
                <button onClick={handleApply}>Apply</button>
            </div>

            <br />
            <div>Pending List</div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Department</th>
                            <th>Date</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingList.map((each, index) => (
                            <tr key={index}>
                                <td>{ each.username }</td>
                                <td>{ departmentName(each.department_id) }</td>
                                <td>{ humanReadAbleDate(each.exchanged_dates.date) }</td>
                                <td>{ each.exchanged_dates.details }</td>
                                <td>{ pendingStatus(each.exchanged_dates.approved) }</td>
                                <td><button onClick={() => handleApprove(each)}>Approve</button></td>
                            </tr>
                        ))}         
                    </tbody>
                </table>
            </div>
        </>
    );
}
