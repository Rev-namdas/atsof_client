export const api_url = "https://at-sof.herokuapp.com"

export const APIENDPOINTS = {
	user_login: api_url + "/user/auth/login",
	user_create: api_url + "/user/auth/register",
	user_profile: api_url + "/account/details",
	user_list: api_url + "/account/list",
	user_lates: api_url + "/attendance/late",
	change_account_status: api_url + "/account/change-account-status",

	save_attendance: api_url + "/attendance/save",
	save_logout: api_url + "/attendance/logout-time/save",
	attendance_list: api_url + "/attendance/list",
	users_attendance_list: api_url + "/attendance/list/by-dept",
	search_depts_attendance_list: api_url + "/attendance/search/by-dept",
	user_monthly_attendance: api_url + "/attendance/monthly",
	search_user_attendance: api_url + "/attendance/search-by-dates",
	users_by_dept: api_url + "/account/list/users-by-dept",
	
	all_leave_list: api_url + "/user/leave/list/all",
	leave_apply: api_url + "/user/leave/apply",
	leave_approve: api_url + "/user/leave/approve",
	leave_decline: api_url + "/user/leave/decline",
	leave_recommend: api_url + "/user/leave/recommend",
	leave_status: api_url + "/user/leave/status",

	department_list: api_url + "/settings/department/list",
	create_department: api_url + "/settings/department/create",
	delete_department: api_url + "/settings/department/delete",

	create_holiday: api_url + "/holiday/create",
	holiday_list: api_url + "/holiday/fetch",
	assign_holiday: api_url + "/holiday/assign",
	holiday_exchangeable_list: api_url + "/holiday/list/fetch",
	holiday_exchange_request: api_url + "/holiday/exchange-request",
	pending_exchange_list: api_url + "/holiday/pending/exchange-request",
	approve_exchange_request: api_url + "/holiday/exchange-request/approve",
}
