export const UnixToDate = (timestamps) => {
	const date = new Date(timestamps * 1000)
	return date.toDateString()
}