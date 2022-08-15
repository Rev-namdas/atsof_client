import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IsoIcon from '@mui/icons-material/Iso';
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COOKIE_KEY, getCookie } from "../../helpers/CookieStorage";

export default function Sidebar({ toggleDrawer }) {
    const [userRole, setUserRole] = useState([]);
    const navigate = useNavigate();

    useEffect(
        () => {
            const udata = getCookie(COOKIE_KEY.USER_DATA)
            setUserRole(udata.role);
        },
        // eslint-disable-next-line
        []
    );

    const AdminSidebar = () => {
        return (
            <>
                <List>
                    {[
                        {
                            name: "Home",
                            icon: <HomeIcon />,
                            link: "/dashboard",
                        },
                        {
                            name: "Attendances",
                            icon: <FormatListBulletedIcon />,
                            link: "/user/attendances",
                        },
                        {
                            name: "Create Employee",
                            icon: <PersonAddAlt1Icon />,
                            link: "/user/create",
                        },
                        {
                            name: "Employees",
                            icon: <PeopleAltIcon />,
                            link: "/user/list",
                        },
                        {
                            name: "Leave Approval List",
                            icon: <FactCheckIcon />,
                            link: "/user/leave-approval-list",
                        },
                        {
                            name: "Leave Apply",
                            icon: <BookmarkAddIcon />,
                            link: "/user/leave/apply",
                        },
                        {
                            name: "Leave Status",
                            icon: <IsoIcon />,
                            link: "/user/leave-status",
                        },
                    ].map((each, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            onClick={() => navigate(each.link)}
                        >
                            <ListItemButton>
                                <ListItemIcon>{each.icon}</ListItemIcon>
                                <ListItemText primary={each.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </>
        );
    };

    const UserSidebar = () => {
        return (
            <>
                <List>
                    {[
                        {
                            name: "Home",
                            icon: <HomeIcon />,
                            link: "/dashboard",
                        },
                        {
                            name: "Attendances",
                            icon: <FormatListBulletedIcon />,
                            link: "/user/attendances",
                        },
                        {
                            name: "Leave Apply",
                            icon: <BookmarkAddIcon />,
                            link: "/user/leave/apply",
                        },
                        {
                            name: "Leave Status",
                            icon: <IsoIcon />,
                            link: "/user/leave-status",
                        },
                    ].map((each, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            onClick={() => navigate(each.link)}
                        >
                            <ListItemButton>
                                <ListItemIcon>{each.icon}</ListItemIcon>
                                <ListItemText primary={each.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </>
        );
    };

    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {(userRole.includes(parseInt(process.env.REACT_APP_ROLE_SUPER_ADMIN))
            || userRole.includes(parseInt(process.env.REACT_APP_ROLE_ADMIN))) ? (
                <AdminSidebar />
            ) : (
                <UserSidebar />
            )}
        </Box>
    );
}
