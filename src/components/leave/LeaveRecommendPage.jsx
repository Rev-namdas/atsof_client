import React, { useEffect, useState } from "react";
import * as api from "../../api/Api";
import { UnixToDate } from "../../helpers/UnixToDate";
import { toast, ToastContainer } from "react-toastify";
import { leaveTypes } from "../../helpers/LeaveTypes";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import LoadingSkeleton from "../utilities/LoadingSkeleton";
import CustomButton from "../utilities/CustomButton";

export default function LeaveRecommendPage() {
    document.title = "AT Soft | Leave Recommend Page";

    const [leaveList, setLeaveList] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
		setIsLoading(true)
        const res = await api.pendingLeaveList();
        setLeaveList(res || []);
		setIsLoading(false)
    };

    useEffect(
        () => {
            fetchData();
        },
        //eslint-disable-next-line
        []
    );

    const handleRecommend = async (e, person) => {
        e.preventDefault();

        const payload = {
            decision: "recommend",
            employee_id: person.user_id,
            from_date: person.from_date,
            to_date: person.to_date,
        };

        const res = await api.recommendLeave(payload);
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

            fetchData();
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

    const handleDecline = async (e, permission) => {
        e.preventDefault();

        const payload = {
            decision: "decline",
            user_id: permission.user_id,
            from_date: permission.from_date,
            to_date: permission.to_date,
        };

        const res = await api.recommendLeave(payload);
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

            fetchData();
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

    const recommend = (val) => {
        return val?.map((each) => each).join(", ");
    };

    return (
        <div className="recommendpage__wrapper">
            <div className="recommendpage__box">
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
					<h3 className="designbox__title">Leave Approval List Page</h3>
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
                                            "From",
                                            "To",
                                            "Leave Type",
                                            "Reason",
                                            "Recommend By",
                                            "Declined By",
                                            "Action",
                                        ].map((_, index) => (
                                            <TableCell key={index}><LoadingSkeleton /></TableCell>
                                        ))}
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        {[
                                            "User",
                                            "From",
                                            "To",
                                            "Leave Type",
                                            "Reason",
                                            "Recommend By",
                                            "Declined By",
                                            "Action",
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
                                        {[
                                            "User",
                                            "From",
                                            "To",
                                            "Leave Type",
                                            "Reason",
                                            "Recommend By",
                                            "Declined By",
                                            "Action",
                                        ].map((_, index) => (
                                            <TableCell key={index}><LoadingSkeleton count={5} /></TableCell>
                                        ))}
                                    </TableRow>
                                ) : (
									leaveList
									?.map((eachLeave, index) => (
										<TableRow
											key={index}
											sx={{
												"&:last-child td, &:last-child th":{
													border: 0,
												}
											}}
										>
											<TableCell
												align="center"
												sx={{
													color: "#645CAA",
													fontWeight: "bold",
												}}
											>
												{eachLeave.name}
											</TableCell>
											<TableCell
												align="center"
												sx={{
													color: "#645CAA",
													fontWeight: "bold",
												}}
											>
												{UnixToDate(eachLeave.from_date)}
											</TableCell>
											<TableCell
												align="center"
												sx={{
													color: "#645CAA",
													fontWeight: "bold",
												}}
											>
												{UnixToDate(eachLeave.to_date)}
											</TableCell>
											<TableCell
												align="center"
												sx={{
													color: "#645CAA",
													fontWeight: "bold",
												}}
											>
												{leaveTypes[eachLeave.leave_id]}
											</TableCell>
											<TableCell
												align="center"
												sx={{
													color: "#645CAA",
													fontWeight: "bold",
												}}
											>
												{eachLeave.reason}
											</TableCell>
											<TableCell
												align="center"
												sx={{
													color: "#645CAA",
													fontWeight: "bold",
												}}
											>
												{recommend(eachLeave.recommend)}
											</TableCell>
											<TableCell
												align="center"
												sx={{
													color: "#645CAA",
													fontWeight: "bold",
												}}
											>
												{eachLeave.declined}
											</TableCell>
											<TableCell
												align="center"
												sx={{
													color: "#645CAA",
													fontWeight: "bold",
												}}
											>
												<CustomButton
													label="Recommend"
													color="#1C6758"
													hoverColor="#034d3e"
													onClick={(e) => handleRecommend(e, eachLeave)}
												/>{" "}
												<CustomButton
													label="Decline"
													color="#C21010"
													hoverColor="#820000"
													onClick={(e) => handleDecline(e, eachLeave)}
												/>
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
