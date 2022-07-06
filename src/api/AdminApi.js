import axios from "axios"
import { APIENDPOINTS } from "./ApiEndpoints"

export const login = (payload) => axios.post(APIENDPOINTS.user_login, payload)
export const register = (payload) => axios.post(APIENDPOINTS.user_create, payload)
export const storeAttendance = (payload) => axios.post(APIENDPOINTS.save_attendance, payload)