import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import * as api from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import {
    COOKIE_KEY,
    getCookie,
    removeCookie,
} from "../../helpers/CookieStorage";
import moment from "moment";

export default function Navbar({ children }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState("");
    const [state, setState] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToProfile = () => {
        setAnchorEl(null);

        navigate("/user/profile");
    };

    const handleLogout = async () => {
        setAnchorEl(null);

        const udata = getCookie(COOKIE_KEY.USER_DATA);

        const payload = {
            user_id: udata.user_id,
            month: moment().format("M"),
            date: udata.date,
            logout_time: moment().format("hh:mm:ss A"),
        };

        await api.storeLogout(payload);

        removeCookie(COOKIE_KEY.USER_DATA);
        localStorage.removeItem("atsofauth");

        navigate("/");
    };

    useEffect(
        () => {
            const udata = getCookie(COOKIE_KEY.USER_DATA);
            udata?.username && setUsername(udata?.username);
        },
        //eslint-disable-next-line
        []
    );

    return (
        <>
            {!!localStorage.getItem("atsofauth") && (
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                        position="static"
                        sx={{ backgroundColor: "#645CAA" }}
                    >
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>

                            {/* sidebar */}
                            <Drawer
                                anchor="left"
                                open={state}
                                onClose={toggleDrawer(false)}
                            >
                                <Sidebar toggleDrawer={toggleDrawer} />
                            </Drawer>

                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                {username}
                            </Typography>
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={navigateToProfile}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Box>
            )}
            {children}
        </>
    );
}
