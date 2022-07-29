import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import * as api from "../../api/AdminApi";
import { toast, ToastContainer } from "react-toastify";

export default function EmployeeListPage() {
    const [employee, setEmployee] = useState([]);

    const fetchData = async () => {
        const res = await api.fetchEmployeeList({
            client_roles: [parseInt(process.env.REACT_APP_ROLE_SUPER_ADMIN)],
        });
        setEmployee(res.data);
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
            client_roles: [parseInt(process.env.REACT_APP_ROLE_SUPER_ADMIN)],
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

            fetchData();
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

            <Navbar />
            <div>EmployeeListPage</div>
            {employee.map((each, index) => (
                <div key={index}>
                    {each.username} - {each.active ? "TRUE" : "FALSE"} -{" "}
                    <button onClick={(e) => handleAccountStatus(e, each)}>
                        {each.active ? "Deactivate" : "Activate"}
                    </button>
                </div>
            ))}
        </>
    );
}
