import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function CheckIsLoggedIn() {
    const loggedIn = !!localStorage.getItem("atsofauth")
    
    return loggedIn ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
}
