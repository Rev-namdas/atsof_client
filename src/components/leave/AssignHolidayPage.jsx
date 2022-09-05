import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";

export default function AssignHolidayPage() {
  const [leaveList, setLeaveList] = useState([])
  const [deptList, setDeptList] = useState([])
  const [usersList, setUsersList] = useState([])

  const [selectedHoliday, setSelectedHoliday] = useState(null)
  const [selectedDept, setSelectedDept] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const fetchData = async () => {
      const result = await api.getHolidayList();
      setLeaveList(result.leaves);

      const depts = await api.departmentList()
      setDeptList(depts);
  };

  const handleHolidayChange = (e) => {
    setSelectedHoliday([parseInt(e.target.value)])
  }

  const handleDeptChange = async (e) => {
    setSelectedDept(parseInt(e.target.value))
    setIsLoading(true)

    const payload = {
      dept_ids: parseInt(e.target.value)
    }
    const users = await api.fetchUsersByDept(payload)
    setUsersList(users)
    setIsLoading(false)
  }

  const handleUserSelection = (e) => {
    setSelectedUser(e.target.value)
  }

  const handleSubmit = async () => {
    const payload = {
      holidays: 
        selectedHoliday[0] === 0 
        ? leaveList.map(each => each.leave_date)
        : selectedHoliday,
      dept_id: selectedDept,
      user_ids: selectedUser
    }

    const result = await api.assignHoliday(payload)
    
    console.log(payload, result);
  }

  useEffect(
      () => {
          fetchData();
      },
      // eslint-disable-next-line
      []
  );

  return (
      <>
          <div>AssignGovtLeavePage</div>

          <span>
              <select name="leave" id="leave" onChange={handleHolidayChange}>
                  <option value="">Select Holiday</option>
                  <option value="0">All Holiday</option>
                  {leaveList.map(each => (
                    <option key={each.leave_id} value={each.leave_date}>{ each.leave_name }</option>
                  ))}
              </select>
          </span>

          <span>
              <select name="dept" id="dept" onChange={handleDeptChange}>
                  <option value="">Select Department</option>
                  {deptList.map(each => (
                    <option key={each.dept_id} value={each.dept_id}>{ each.dept_name }</option>
                  ))}
              </select>
          </span>

          <span>
              <select name="user" id="user" onChange={handleUserSelection}>
                {
                  isLoading
                  ?
                  <option value="">Loading...</option>
                  :
                  <>
                    {
                      usersList.length !== 0
                      &&
                      <>
                        <option value="">Select User</option>
                        <option value="All">All Users</option>
                        {usersList.map((each, index) => (
                          <option key={index} value={each.user_id}>{ each.username }</option>
                        ))}
                      </>
                    }
                  </>
                }
              </select>
          </span>

          <button onClick={handleSubmit}>Apply</button>
      </>
  );
}
