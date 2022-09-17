import { Button } from "@mui/material";
import React from "react";

export default function CustomButton({
    label,
    onClick = () => {},
    disabled = false,
    type="button"
}) {
    return (
        <Button
            variant="contained"
            type={type}
            onClick={onClick}
            disabled={disabled}
            sx={{
                marginBottom: "0.5rem",
                textTransform: "none",
                backgroundColor: "#645CAA",
                "&:hover": {
                    backgroundColor: "#3b347a",
                },
            }}
        >
            {label}
        </Button>
    );
}
