import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import moment from "moment";
import "./attendances.css";
import DatePickerField from "../utilities/DatePicker";
import CustomButton from "../utilities/CustomButton";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingSkeleton from "../utilities/LoadingSkeleton";

export default function AttendancesPage() {
    document.title = "AT Soft | Attendance List";

    const [userDetails, setUserDetails] = useState([]);
    const [startDate, setStartDate] = useState(moment().startOf("date").unix());
    const [endDate, setEndDate] = useState(moment().startOf("date").unix());
    const [userStartDate, setUserStartDate] = useState(new Date());
    const [userEndDate, setUserEndDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const getColor = (val1, val2) => {
        const rules = {
            "1": "#df2b2b",
            "Absent": "#FD841F",
            "Day Off": "#1fa741",
            "Leave": "#1fa77e",
            "Holiday": "#1fa77e",
        };
        return rules[val1] || rules[val2] || "#645CAA";
    };

    const fetchAttendances = async () => {
        setIsLoading(true);
        const res = await api.fetchUserMonthlyAttendance();
        setUserDetails(res);
        setIsLoading(false);
    };

    useEffect(
        () => {
            fetchAttendances();
        },
        // eslint-disable-next-line
        []
    );

    const handleStartDate = (value) => {
        setStartDate(moment(value, "YYYY-MM-DD").startOf("day").unix());
        setUserStartDate(value);
    };

    const handleEndDate = (value) => {
        setEndDate(moment(value, "YYYY-MM-DD").startOf("day").unix());
        setUserEndDate(value);
    };

    const handleSearch = async () => {
        const payload = {
            start_date: startDate,
            end_date: endDate,
        };
        const res = await api.searchUserAttendanceByDates(payload);
        setUserDetails(res);
    };

    const handleReset = () => {
        fetchAttendances();
        setStartDate(moment().startOf("date").unix());
        setEndDate(moment().startOf("date").unix());
        setUserStartDate(new Date());
        setUserEndDate(new Date());
    };

    return (
        <div className="atpage__wrapper">
            <div className="atpage__box">
                <div className="atpage__datepicker">
                    <div className="flexbox">
                        <label
                            className="atpage__datepicker-label"
                            htmlFor="startdate"
                        >
                            Start Date
                        </label>
                        <DatePickerField
                            className="flex-1"
                            value={userStartDate}
                            onChange={handleStartDate}
                        />
                    </div>

                    <div className="flexbox">
                        <label
                            className="atpage__datepicker-label"
                            htmlFor="enddate"
                        >
                            End Date
                        </label>
                        <DatePickerField
                            className="flex-1"
                            min={userStartDate}
                            value={userEndDate}
                            onChange={handleEndDate}
                        />
                    </div>
                    <CustomButton label="Search" onClick={handleSearch} />
                    <CustomButton
                        label="Reset"
                        color="#C21010"
                        hoverColor="#820000"
                        onClick={handleReset}
                    />
                </div>

                <TableContainer
                    component={Paper}
                    sx={{ overflow: "auto", maxHeight: "65vh" }}
                >
                    <Table stickyHeader sx={{ minWidth: 650 }}>
                        <TableHead>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell>
                                        <LoadingSkeleton />
                                    </TableCell>
                                    <TableCell>
                                        <LoadingSkeleton />
                                    </TableCell>
                                    <TableCell>
                                        <LoadingSkeleton />
                                    </TableCell>
                                    <TableCell>
                                        <LoadingSkeleton />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    {[
                                        "Month",
                                        "Date",
                                        "Login Time",
                                        "Logout Time",
                                    ].map((each, index) => (
                                        <TableCell
                                            key={index}
                                            align="center"
                                            sx={{
                                                backgroundColor: "#645CAA",
                                                color: "white",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {each}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )}
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell>
                                        <LoadingSkeleton count={5} />
                                    </TableCell>
                                    <TableCell>
                                        <LoadingSkeleton count={5} />
                                    </TableCell>
                                    <TableCell>
                                        <LoadingSkeleton count={5} />
                                    </TableCell>
                                    <TableCell>
                                        <LoadingSkeleton count={5} />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                userDetails.map((eachRow, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th": {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: "#645CAA",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {eachRow.month}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: "#645CAA",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {eachRow.date}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: getColor(
                                                    eachRow.logout_time,
                                                    eachRow.late
                                                ),
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {eachRow.login_time}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: "#645CAA",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {eachRow.logout_time}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
