import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import UserRoles from "../../helpers/UserRoles";
import "./profilepage.css";
import TableWhite from "../utilities/TableWhite";

export default function ProfilePage() {
    document.title = "AT Soft | Profile Page";

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
        if (role === UserRoles.ADMIN) {
            return "Admin";
        } else if (role === UserRoles.SUPER_ADMIN) {
            return "Super Admin";
        } else if (role === UserRoles.USER) {
            return "User";
        }
    };

    return (
        <div className="profile__box__wrapper">
            <div className="profile__box">
                <div className="designbox">
                    <span className="designbox__bar"></span>
                    <h3 className="designbox__title">Profile Page</h3>
                </div>{" "}
                <br />
                <div className="flexbox">
                    <div className="flexbox flex-1">
                        <span className="profile__bar mr-1"></span>
                        <span>
                            <strong>Username:</strong> {info?.username}
                        </span>
                    </div>
                    <div className="flexbox flex-1">
                        <span className="profile__bar mr-1"></span>
                        <span>
                            <strong>Department:</strong> {info?.department}
                        </span>
                    </div>
                </div>
                <div className="flexbox">
                    <div className="flexbox flex-1">
                        <span className="profile__bar mr-1"></span>
                        <span>
                            <strong>Day Off:</strong> {info?.dayoff}
                        </span>
                    </div>
                    <div className="flexbox flex-1">
                        <span className="profile__bar mr-1"></span>
                        <span>
                            <strong>Role:</strong> {getRole(info?.role)}
                        </span>
                    </div>
                </div>
                {info?.dept_access?.length > 0
                &&
                <div className="flexbox">
                    <div className="flexbox flex-1">
                        <span className="profile__bar mr-1"></span>
                        <span>
                            <strong>Permitted Departments:</strong>{" "}
                            {info?.dept_access?.join(", ")}
                        </span>
                    </div>
                </div>}
                <div className="flexbox mt-2">
                    <div className="flexbox flex-1">
                        <span className="profile__bar mr-1"></span>
                        <span>
                            <strong>Office Time:</strong>
                        </span>
                    </div>
                </div>
                
                <TableWhite 
                    header={["Day", "Start", "End"]}
                    body={info.office_time}
                    keys={["day", "starts", "ends"]}
                />
            </div>
        </div>
    );
}
