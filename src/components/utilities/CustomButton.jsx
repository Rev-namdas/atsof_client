import { Button } from "@mui/material";
import React from "react";

export default function CustomButton({
    label,
    onClick = () => {},
    disabled = false,
    type="button",
    color="#645CAA",
    hoverColor="#3b347a",
    width="max-content"
}) {
    return (
        <Button
            variant="contained"
            type={type}
            onClick={onClick}
            disabled={disabled}
            sx={{
                minWidth: width,
                marginBottom: "0.5rem",
                textTransform: "none",
                backgroundColor: color,
                "&:hover": {
                    backgroundColor: hoverColor,
                },
            }}
        >
            {label}
        </Button>
    );
}
