import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";

export default function AssignGovtLeavePage() {
  const [leaveList, setLeaveList] = useState([])
  const [deptList, setDeptList] = useState([])

  const [selectedDept, setSelectedDept] = useState()
  
  const fetchData = async () => {
      const result = await api.getGovtLeaveList();
      setLeaveList(result.leaves);

      const depts = await api.departmentList()
      setDeptList(depts);
  };

  const handleDeptChange = (e) => {
    setSelectedDept(parseInt(e.target.value))
  }

  const loadUsers = async () => {
    const payload = {
      dept_ids: [selectedDept]
    }
    const users = await api.fetchUsersByDept(payload)
    console.log('payload', payload);
    console.log(users);
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

          <div>
              <select name="leave" id="leave">
                  {leaveList.map(each => (
                    <option key={each.leave_id} value={each.leave_id}>{ each.leave_name }</option>
                  ))}
              </select>
          </div>

          <div>
              <select name="dept" id="dept" onChange={handleDeptChange}>
                  {deptList.map(each => (
                    <option key={each.dept_id} value={each.dept_id}>{ each.dept_name }</option>
                  ))}
              </select>
          </div>

          <div>
              <select name="user" id="user" onFocus={loadUsers}>
                  
              </select>
          </div>
      </>
  );
}
