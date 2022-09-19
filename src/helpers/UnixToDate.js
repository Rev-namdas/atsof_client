import moment from "moment"

export const UnixToDate = (timestamp) => {
	return moment.unix(timestamp).format("DD-MMM-YY ddd")
}