import React from "react";
import { Navigate } from "react-router-dom";

export default function CheckAlreadyLoggedIn(props) {
    const loggedIn = !!localStorage.getItem("atsofauth");

    return loggedIn ? <Navigate to="/dashboard" /> : <>{props.children}</>;
}
