import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableWhite({
    header = [],
    body = [],
    keys = [],
    colorDecider = "",
	colorRules = {},
    maxHeight = "100vh"
}) {
    const getColor = (val) => {
		return colorRules[val] || "#645CAA"
    };

    return (
        <TableContainer component={Paper} sx={{ overflow: "auto", maxHeight: maxHeight }}>
            <Table stickyHeader sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        {header.map((each, index) => (
                            <TableCell
                                key={index}
                                align="center"
                                sx={{ 
                                    backgroundColor: "#645CAA", 
                                    color: "white", 
                                    fontWeight: "bold" 
                                }}
                            >
                                {each}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body.map((eachRow, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            {keys.map((each, index) => (
                                <TableCell
                                    key={index}
                                    align="center"
                                    sx={{
                                        color: getColor(eachRow[colorDecider]),
                                        fontWeight: "bold",
                                    }}
                                >
                                    {eachRow[each]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
