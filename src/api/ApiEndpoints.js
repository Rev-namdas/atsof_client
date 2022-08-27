export const api_url = "http://localhost:5050/api/v1"

export const APIENDPOINTS = {
	user_login: api_url + "/user/auth/login",
	user_create: api_url + "/user/auth/register",
	user_list: api_url + "/account/list",
	user_lates: api_url + "/attendance/late",
	change_account_status: api_url + "/account/change-account-status",

	save_attendance: api_url + "/attendance/save",
	save_logout: api_url + "/attendance/logout-time/save",
	attendance_list: api_url + "/attendance/list",
	users_attendance_list: api_url + "/attendance/list/by-dept",
	user_monthly_attendance: api_url + "/attendance/monthly",
	search_user_attendance: api_url + "/attendance/search-by-dates",
	
	all_leave_list: api_url + "/user/leave/list/all",
	leave_apply: api_url + "/user/leave/apply",
	leave_approve: api_url + "/user/leave/approve",
	leave_decline: api_url + "/user/leave/decline",
	leave_recommend: api_url + "/user/leave/recommend",
	leave_status: api_url + "/user/leave/status",

	department_list: api_url + "/settings/department/list"
}