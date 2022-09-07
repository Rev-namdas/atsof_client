import React, { useEffect, useRef, useState } from "react";
import * as api from "../../api/Api";

export default function DepartmentPage() {
    const [deptList, setDeptList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const deptName = useRef();

    const fetchData = async () => {
        setIsLoading(true);
        const result = await api.departmentList();
        setDeptList(result);
        setIsLoading(false);
    };

    useEffect(
        () => {
            fetchData();
        },
        // eslint-disable-next-line
        []
    );

    const handleAdd = async () => {
		if(deptName.current.value !== ""){
			const payload = {
				dept_name: deptName.current.value.trim()
			}
			
			const result = await api.createNewDepartment(payload)
	
			if(result.flag === 'SUCCESS'){
				deptName.current.value = ""
				fetchData()
			} else if(result.flag === 'FAIL'){
				alert("Something went wrong")
			}
		}
    };

	const handleDelete = async (dept_id) => {
		const result = await api.deleteDepartment(dept_id)

		if(result.flag === 'SUCCESS'){
			fetchData()
		} else if(result.flag === 'FAIL'){
			alert(result.message)
		}
	}

    return (
        <>
            <div>DepartmentPage</div>

            <div>
                <input
                    type="text"
                    placeholder="Department Name"
                    ref={deptName}
                />
                <button onClick={handleAdd}>Add</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Department Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td>...</td>
                            <td>Loading...</td>
                        </tr>
                    ) : (
                        deptList.map((each) => (
                            <tr key={each.dept_id}>
                                <td>{each.dept_id}</td>
                                <td>{each.dept_name}</td>
                                <td>
									<button onClick={() => handleDelete(each.dept_id)}>Delete</button>
								</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}
