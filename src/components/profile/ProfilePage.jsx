import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import UserRoles from "../../helpers/UserRoles"

export default function ProfilePage() {
    const [info, setInfo] = useState("");

    const fetchData = async () => {
        const res = await api.userProfile();
        setInfo(res);
    };

    useEffect(
        () => {
            fetchData();
        },
        // eslint-disable-next-line
        []
    );

	const getRole = (role) => {
		if(role === UserRoles.ADMIN){
			return "Admin"
		} else if(role === UserRoles.SUPER_ADMIN){
			return "Super Admin"
		} else if(role === UserRoles.USER){
			return "User"
		}
	}

    return (
        <>
            <div>ProfilePage</div> <br />

            <div>
                <span>Username: </span>
                <span>{info?.username}</span>
            </div>
            <div>
                <span>Department: </span>
                <span>{info?.department}</span>
            </div>
            <div>
                <span>Day Off: </span>
                <span>{info?.dayoff}</span>
            </div>
            <div>
                <span>Role: </span>
                <span>{getRole(info?.role)}</span>
            </div>
            <div>
                <span>Permitted Departments: </span>
                <span>{info?.dept_access?.join(", ")}</span>
            </div>
            <div>Office Time: </div>
			<div>Day - Start - End</div>
			{
				info?.office_time?.map((each, index) => (
					<div key={index}>
						<span>{ each.day } - </span>
						<span>{ each.starts } - </span>
						<span>{ each.ends }</span>
					</div>
				))
			}
        </>
    );
}
