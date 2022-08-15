const UserRoles = {
	SUPER_ADMIN: parseInt(process.env.REACT_APP_ROLE_SUPER_ADMIN),
	ADMIN: parseInt(process.env.REACT_APP_ROLE_ADMIN),
	USER: parseInt(process.env.REACT_APP_ROLE_USER)
}

export default UserRoles