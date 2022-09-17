import { TextField } from "@mui/material";
import React from "react";

export default function InputField({
    label,
    size = "normal",
    type = "text",
    value	 = "",
    onChange = () => {},
}) {
    return (
        <TextField
            label={label}
            size={size}
            type={type}
            variant="outlined"
            autoComplete="off"
            value={value}
            onChange={onChange}
            InputLabelProps={{
                style: { color: "#645CAA" },
            }}
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
                marginBottom: "1rem",
            }}
        />
    );
}
