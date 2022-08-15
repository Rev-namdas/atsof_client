import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { COOKIE_KEY, getCookie } from "../../helpers/CookieStorage";

export default function CheckRole({ roles = [] }) {
	const user = getCookie(COOKIE_KEY.USER_DATA)
	const userRole = user.role[0] || 0
	const allowed = roles.includes(userRole)
	
	return <>
		{ allowed && <Outlet /> }
		{ !allowed && <Navigate to="/error/404" /> }
	</>;
}
