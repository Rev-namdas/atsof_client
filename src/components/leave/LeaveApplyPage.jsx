import React, { useState } from "react";
import * as api from "../../api/Api";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import "./leave.css";
import DatePickerField from "../utilities/DatePicker";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import CustomButton from "../utilities/CustomButton";

export default function LeaveApplyPage() {
    document.title = "AT Soft | Leave Apply Page";

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [leaveStartDate, setLeaveStartDate] = useState(
        moment().startOf("date").unix()
    );
    const [leaveEndDate, setLeaveEndDate] = useState(
        moment().startOf("date").unix()
    );
    const [leaveType, setLeaveType] = useState("");
    const [leaveReason, setLeaveReason] = useState("");

    const findDatesByStartEndDates = (from_date, to_date) => {
        const startDate = moment(from_date * 1000);
        const endDate = moment(to_date * 1000);
        const leave_day_count = endDate.diff(startDate, "days");

        let dates = [{ day: startDate.day(), date: startDate.unix() }];

        if (leave_day_count === 0) {
            return dates;
        }

        if (leave_day_count === 1) {
            dates = [
                { day: startDate.day(), date: startDate.unix() },
                { day: endDate.day(), date: endDate.unix() },
            ];

            return dates;
        }

        for (let i = 0; i < leave_day_count; i++) {
            const nextDate = startDate.add(1, "days");

            dates.push({
                day: nextDate.day(),
                date: nextDate.unix(),
            });
        }

        return dates;
    };

    const handleStartDate = (value) => {
        setStartDate(value);
        setLeaveStartDate(moment(value, "YYYY-MM-DD").startOf("day").unix());
    };

    const handleEndDate = (value) => {
        setEndDate(value);
        setLeaveEndDate(moment(value, "YYYY-MM-DD").startOf("day").unix());
    };

    const handleLeaveType = (e) => {
        setLeaveType(parseInt(e.target.value));
    };

    const handleReason = (e) => {
        setLeaveReason(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = [null, undefined, ""];

        if (errors.includes(leaveType) || errors.includes(leaveReason)) {
            toast.dismiss();
            return toast.error("All fields are required", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        const payload = {
            from_date: leaveStartDate,
            to_date: leaveEndDate,
            taken_dates: findDatesByStartEndDates(leaveStartDate, leaveEndDate),
            leave_count: findDatesByStartEndDates(leaveStartDate, leaveEndDate)
                .length,
            leave_id: leaveType,
            reason: leaveReason.trim(),
        };

        const res = await api.leaveApply(payload);

        if (res.flag === "SUCCESS") {
            toast.dismiss();
            toast.success(res.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (res.flag === "FAIL") {
            toast.dismiss();
            toast.error(res.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="leavepage__wrapper">
            <div className="leavepage__box">
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <div className="designbox">
                    <span className="designbox__bar"></span>
                    <h3 className="designbox__title">Leave Apply Page</h3>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ minWidth: "5rem" }} htmlFor="date">
                        From Date
                    </label>
                    <DatePickerField
                        value={startDate}
                        onChange={handleStartDate}
                    />

                    <label style={{ minWidth: "5rem" }} htmlFor="date">
                        To Date
                    </label>
                    <DatePickerField value={endDate} onChange={handleEndDate} />
                </div>
                <div
                    style={{
                        margin: "1rem 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <label htmlFor="type">Leave Type</label>
                    <FormControl sx={{ minWidth: "10rem" }} size="small">
                        {/* <FormControl sx={{ minWidth: "10rem", marginLeft: "1rem" }} size="small"> */}
                        <InputLabel
                            id="leave-type"
                            sx={{ color: "#645CAA !important" }}
                        >
                            Select Type
                        </InputLabel>
                        <Select
                            labelId="leave-type"
                            id="leave-type"
                            value={leaveType}
                            label="Select Type"
                            onChange={handleLeaveType}
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#645CAA",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "#645CAA",
                                    },
                            }}
                        >
                            <MenuItem
                                value={process.env.REACT_APP_LEAVE_CASUAL}
                            >
                                Casual
                            </MenuItem>
                            <MenuItem value={process.env.REACT_APP_LEAVE_SICK}>
                                Sick
                            </MenuItem>
                            <MenuItem
                                value={process.env.REACT_APP_LEAVE_ANNUAL}
                            >
                                Annual
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <label htmlFor="reason">Reason</label>
                    <TextField
                        label="Leave Reason"
                        value={leaveReason}
                        onChange={handleReason}
                        id="standard-multiline-static"
                        multiline
                        rows={2}
                        variant="outlined"
                        // defaultValue="Default Value"
                        InputLabelProps={{
                            style: { color: "#645CAA" },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#645CAA",
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                                    borderColor: "#645CAA",
                                    "& > legend": {
                                        color: "#645CAA",
                                    },
                                },
                            },
                        }}
                    />
                </div>
                <CustomButton label="Apply" onClick={handleSubmit} />
            </div>
        </div>
    );
}
