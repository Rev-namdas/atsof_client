import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css"

const DatePickerField = ({ value = new Date(), onChange = () => {}, min = null }) => {
    return (
        <DatePicker
			dateFormat="dd-MM-yyyy"
			minDate={min}
            selected={value}
            onChange={onChange}
        />
    );
};

export default DatePickerField;
