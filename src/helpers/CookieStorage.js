import Cookies from "universal-cookie"

const cookies = new Cookies()
export const COOKIE_KEY = {
	USER_DATA: 'atsofcookiedata'
}

/**
 * For Saving Cookie in Browser
 * 
 * @method setCookie
 * @param {String} key cookie key to save & access data later
 * @param {Object} data data which will be stored in cookie
 */
export const setCookie = (key, data) => {
	cookies.set(key, data, { path: "/" })
}

/**
 * For Getting Saved Cookie Data
 * 
 * @method getCookie
 * @param {String} key cookie key to access
 * @returns Cookie Data
 */
export const getCookie = (key) => {
	return cookies.get(key)
}

/**
 * Remove Cookie From Browser
 * 
 * @method removeCookie
 * @param {String} key cookie key to delete/remove data
 */
export const removeCookie = (key) => {
	cookies.remove(key)
}