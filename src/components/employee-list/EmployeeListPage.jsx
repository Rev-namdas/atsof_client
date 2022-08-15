import React, { useEffect, useState } from "react";
import * as api from "../../api/AdminApi";
import { toast, ToastContainer } from "react-toastify";
import { COOKIE_KEY, getCookie } from "../../helpers/CookieStorage";

export default function EmployeeListPage() {
    const [employee, setEmployee] = useState([]);
    const [userRole, setUserRole] = useState([])

    const fetchData = async (role) => {
        const res = await api.fetchEmployeeList({
            client_roles: role,
        });
        setEmployee(res.data);
    };

    useEffect(
        () => {
            const user = getCookie(COOKIE_KEY.USER_DATA)
            fetchData(user.role);
            setUserRole(user.role)
        },
        // eslint-disable-next-line
        []
    );

    const handleAccountStatus = async (e, user) => {
        e.preventDefault();

        const payload = {
            client_roles: userRole,
            user_id: user.user_id,
            account_status: !user.active,
        };

        const res = await api.changeAccountStatus(payload);

        if (res.data.flag === "SUCCESS") {
            toast.dismiss();
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            fetchData(userRole);
        } else if (res.data.flag === "FAIL") {
            toast.dismiss();
            toast.error(res.data.message, {
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
                employee.length === 0
                ? <span>No Record Found</span>
                : (
                    employee.map((each, index) => (
                        <div key={index}>
                            {each.username} - {each.active ? "TRUE" : "FALSE"} -{" "}
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
