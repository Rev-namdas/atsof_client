import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import moment from "moment"
import { COOKIE_KEY, removeCookie } from "../../helpers/CookieStorage";

export default function CheckIsLoggedIn() {
    let isLoggedIn

    const storage = JSON.parse(localStorage.getItem("atsofauth"))
    const currentTime = moment().unix()
    const expiresIn = moment.unix(storage?.expiresIn).unix()

    if(!!storage && (currentTime > expiresIn)){
        isLoggedIn = false
        localStorage.removeItem('atsofauth')
        removeCookie(COOKIE_KEY.USER_DATA)
    } else {
        isLoggedIn = !!storage
    }
    
    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
}
