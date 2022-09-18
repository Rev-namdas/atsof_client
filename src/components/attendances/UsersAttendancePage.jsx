import moment from "moment";
import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DatePickerField from "../utilities/DatePicker";
import LoadingSkeleton from "../utilities/LoadingSkeleton";
import { Autocomplete, TextField } from "@mui/material";

export default function UsersAttendancePage() {
    document.title = "AT Soft | Users Attendance Page";

    const [attendances, setAttendances] = useState([]);
    const [userDate, setUserDate] = useState(new Date());
    const [userList, setUserList] = useState([])
    // initial state is null because
    // if no user is selected null will be passed
    const [searchedUser, setSearchedUser] = useState(null)
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

    const fetchData = async () => {
        setIsLoading(true);

        const result = await api.fetchUsersAttendanceList();
        setAttendances(result);

        const users = result.map(each => each.username)
        setUserList([...new Set(users)])

        setIsLoading(false);
    };

    useEffect(
        () => {
            fetchData();
        },
        // eslint-disable-next-line
        []
    );

    const handleDate = async (value) => {
        setIsLoading(true);
        setUserDate(value);

        const payload = {
            date: moment(value, "YYYY-MM-DD").unix(),
        };
        const res = await api.searchDeptWiseAttendanceByDate(payload);
        setAttendances(res);
        setIsLoading(false);

        console.log(searchedUser);
    };

    return (
        <>
            <div className="usersatpage__wrapper">
                <div className="usersatpage__box">
                    <div className="useratpage__header">
                        <div className="designbox">
                            <span className="designbox__bar"></span>
                            <h3 className="designbox__title">
                                User Attendance Page
                            </h3>
                        </div>
                        <div>
                            <Autocomplete
                                size="small"
                                disablePortal
                                options={userList}
                                onChange={(_, value) => setSearchedUser(value)} // if no user is selected null be set
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& > fieldset": {
                                            borderColor: "#645CAA",
                                        },
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                        "& > fieldset": {
                                            borderColor: "#645CAA",
                                            "& > legend": {
                                                color: "#645CAA",
                                            },
                                        },
                                    },
                                    width: 200,
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        InputLabelProps={{
                                            style: { color: "#645CAA", fontSize: 15 },
                                        }}
                                        label="Search By User"
                                    />
                                )}
                            />
                        </div>
                        <div className="flexbox">
                            <h4 className="useratpage__datepicker-label">
                                Search By Date
                            </h4>
                            <DatePickerField
                                value={userDate}
                                onChange={handleDate}
                            />
                        </div>
                    </div>
                    <TableContainer
                        component={Paper}
                        sx={{ overflow: "auto", maxHeight: "65vh" }}
                    >
                        <Table stickyHeader sx={{ minWidth: 650 }}>
                            <TableHead>
                                {isLoading ? (
                                    <TableRow>
                                        {[
                                            "User",
                                            "Department",
                                            "Month",
                                            "Date",
                                            "Login Time",
                                            "Logout Time",
                                        ].map((_, index) => (
                                            <TableCell key={index}>
                                                <LoadingSkeleton />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        {[
                                            "User",
                                            "Department",
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
                                        <TableCell>
                                            <LoadingSkeleton count={5} />
                                        </TableCell>
                                        <TableCell>
                                            <LoadingSkeleton count={5} />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    // if null mean no user is selected,
                                    // show the entire list without filtering
                                    searchedUser === null
                                    ?
                                        attendances
                                        .map((eachRow, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        {
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
                                                    {eachRow.username}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        color: "#645CAA",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {eachRow.department}
                                                </TableCell>
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
                                    :
                                        // if specific user is selected
                                        attendances
                                        .filter(each => each.username === searchedUser)
                                        .map((eachRow, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        {
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
                                                    {eachRow.username}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        color: "#645CAA",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {eachRow.department}
                                                </TableCell>
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
        </>
        // <>
        //     <div>
        //         <input
        //             type="date"
        //             name="date"
        //             id="date"
        // value={userDate}
        // onChange={handleDate}
        //         />
        //     </div>
        //     {
        //         isLoading
        //         ? <div>Loading... ...</div>
        //         : (
        //             <>
        //                 <div>
        //                     <span>User</span>
        //                     <span> - </span>
        //                     <span>Department</span>
        //                     <span> - </span>
        //                     <span>Month</span>
        //                     <span> - </span>
        //                     <span>Date</span>
        //                     <span> - </span>
        //                     <span>Login Time</span>
        //                     <span> - </span>
        //                     <span>Logout Time</span>
        //                 </div>
        //                 <div>
        //                     {attendances?.map((each, index) => (
        //                         <div
        //                             key={index}
        //                             style={{ color: `${each.late === 1 && "red"}` }}
        //                         >
        //                             <span>{ each.username }</span>
        //                             <span> - </span>
        //                             <span>{ each.department }</span>
        //                             <span> - </span>
        //                             <span>{ each.month }</span>
        //                             <span> - </span>
        //                             <span>{ each.date }</span>
        //                             <span> - </span>
        //                             <span>{ each.login_time }</span>
        //                             <span> - </span>
        //                             <span>{ each.logout_time }</span>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </>
        //         )
        //     }
        // </>
    );
}
