import React, { useEffect, useState } from "react";
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
    const [leaveBalance, setLeaveBalance] = useState({});
    const [leaveRemaining, setLeaveRemaining] = useState("")

    useEffect(() => {
        fetchLeaveData()
    }, 
    // eslint-disable-next-line
    [])
    
    const fetchLeaveData = async () => {
        const res = await api.leaveStatus()
        const leave_balance = {}

        res?.leave?.forEach(each => {
            leave_balance[each.leave_type] = (each.leave_balance - each.leave_taken)
        })

        setLeaveBalance(leave_balance);
    }

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
        setLeaveType(e.target.value);
        setLeaveRemaining(leaveBalance[(e.target.value).split("_")[1]])
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

                <div className="leaveapply__layout-wrapper">
                    <div className="leaveapply__layout">
                        <div className="leaveapply__layout-label">
                            From Date
                        </div>
                        <div className="leaveapply__layout-item">
                            <DatePickerField
                                value={startDate}
                                onChange={handleStartDate}
                            />
                        </div>
                    </div>
                    <div className="leaveapply__layout">
                        <div className="leaveapply__layout-label">To Date</div>
                        <div className="leaveapply__layout-item">
                            <DatePickerField
                                value={endDate}
                                onChange={handleEndDate}
                            />
                        </div>
                    </div>
                </div>

                <div className="leaveapply__layout-wrapper">
                    <div className="leaveapply__layout">
                        <div className="leaveapply__layout-label">
                            Leave Type
                        </div>
                        <div className="leaveapply__layout-item">
                            <FormControl
                                sx={{ minWidth: "13rem" }}
                                size="small"
                            >
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
                                        color: "#645CAA"
                                    }}
                                >
                                    <MenuItem
                                        value={
                                            `${process.env.REACT_APP_LEAVE_CASUAL}_${"Casual"}`
                                        }
                                    >
                                        Casual
                                    </MenuItem>
                                    <MenuItem
                                        value={
                                            `${process.env.REACT_APP_LEAVE_SICK}_${"Sick"}`
                                        }
                                    >
                                        Sick
                                    </MenuItem>
                                    <MenuItem
                                        value={
                                            `${process.env.REACT_APP_LEAVE_ANNUAL}_${"Annual"}`
                                        }
                                    >
                                        Annual
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="leaveapply__layout">
                        <div className="leaveapply__layout-label">Remaining</div>
                        <div className="leaveapply__layout-item">
                            <input 
                                className="leaveapply__layout-input"
                                disabled 
                                type="text"  
                                value={leaveRemaining !== "" ? leaveRemaining + " leaves" : ""}
                            />
                        </div>
                    </div>
                </div>

                <div className="leaveapply__layout-wrapper">
                    <div className="leaveapply__layout">
                        <div className="leaveapply__layout-label">Reason</div>
                        <div className="leaveapply__layout-item">
                            <TextField
                                label="Leave Reason"
                                value={leaveReason}
                                onChange={handleReason}
                                id="standard-multiline-static"
                                multiline
                                rows={2}
                                variant="outlined"
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
                                    width: "33.5rem"
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="leaveapply__btn-wrapper">
                    <CustomButton 
                        label="Apply"
                        width="10rem"
                        onClick={handleSubmit} 
                    />
                </div>
            </div>
        </div>
    );
}
