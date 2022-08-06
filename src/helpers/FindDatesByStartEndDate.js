const FindDatesByStartEndDate = (from_date, to_date) => {
    const startDate = new Date(from_date * 1000);
    const endDate = new Date(to_date * 1000);
	console.log('date', startDate, endDate);
    const oneDay = 1000 * 60 * 60 * 24;
    let dates = [startDate];

    const diff = endDate - startDate;
    const leave_days = Math.ceil(diff / oneDay);

    // one day leave, both dates are same
    if (leave_days === 0) {
        return [from_date];
    }

    // only two dates which already mentioned
    if (leave_days === 1) {
        return [from_date, to_date];
    }

    // searching for next dates
    for (let i = 0; i < leave_days; i++) {
        // adding one day equivalent to current date

        let nextDate = dates[i] + oneDay;
		console.log(new Date(nextDate));
        dates.push(nextDate);
        // dates.push(nextDate / 1000);
    }

    return dates;
}


FindDatesByStartEndDate(1659463200, 1659722400)