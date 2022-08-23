import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import { toast, ToastContainer } from "react-toastify";

export default function EmployeeListPage() {
    const [employee, setEmployee] = useState(null);

    const fetchData = async () => {
        const res = await api.fetchEmployeeList();
        setEmployee(res);
    };

    useEffect(
        () => {
            fetchData();
        },
        // eslint-disable-next-line
        []
    );

    const handleAccountStatus = async (e, user) => {
        e.preventDefault();

        const payload = {
            user_id: user.user_id,
            account_status: !user.active,
        };

        const res = await api.changeAccountStatus(payload);

        if (res.flag === "SUCCESS") {
            toast.dismiss();
            toast.success(res.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            fetchData();
        } else if (res.flag === "FAIL") {
            toast.dismiss();
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
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div>EmployeeListPage</div>
            {
                employee === null
                && <div>Loading...</div>
            }

            {
                employee !== null &&
                employee.length === 0
                ? <span>No Record Found</span>
                : (
                    employee?.map((each, index) => (
                        <div key={index}>
                            {each.username} - {each.department_id} - {each.active ? "TRUE" : "FALSE"} -{" "}
                            <button onClick={(e) => handleAccountStatus(e, each)}>
                                {each.active ? "Deactivate" : "Activate"}
                            </button>
                        </div>
                    ))
                )
            }
        </>
    );
}
