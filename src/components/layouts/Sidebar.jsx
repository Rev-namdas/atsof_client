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
import UserRoles from "../../helpers/UserRoles";

export default function Sidebar({ toggleDrawer }) {
    const [navlist, setNavlist] = useState([])
    const navigate = useNavigate();

    const fetchRole = async () => {
        const udata = getCookie(COOKIE_KEY.USER_DATA)

        if(udata.role.includes(UserRoles.SUPER_ADMIN)){
            setNavlist([
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
                    name: "User Attendances",
                    icon: <FormatListBulletedIcon />,
                    link: "/user/attendances/all",
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
                    link: `${udata.role.includes(
                        parseInt(
                            process.env.REACT_APP_ROLE_SUPER_ADMIN
                        )) 
                        ? "/user/leave-approval-list" 
                        : udata.role.includes(
                            parseInt(
                                process.env.REACT_APP_ROLE_ADMIN
                            ))
                            ? "/user/leave/list/recommend"
                            : ""
                    }`
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
            ])
        } else if(udata.role.includes(UserRoles.ADMIN)){
            setNavlist([
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
                    name: "User Attendances",
                    icon: <FormatListBulletedIcon />,
                    link: "/user/attendances/all",
                },
                {
                    name: "Leave Approval List",
                    icon: <FactCheckIcon />,
                    link: `${udata.role.includes(
                        parseInt(
                            process.env.REACT_APP_ROLE_SUPER_ADMIN
                        )) 
                        ? "/user/leave-approval-list" 
                        : udata.role.includes(
                            parseInt(
                                process.env.REACT_APP_ROLE_ADMIN
                            ))
                            ? "/user/leave/list/recommend"
                            : ""
                    }`
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
            ])
        } else if(udata.role.includes(UserRoles.USER)){
            setNavlist([
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
            ])
        } else {
            setNavlist([])
        }
    }

    useEffect(
        () => {
            fetchRole()
        },
        // eslint-disable-next-line
        []
    );

    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {navlist.map((each, index) => (
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

            {/* {console.log('super', userRole.includes(parseInt(process.env.REACT_APP_ROLE_SUPER_ADMIN)))}
            {console.log('admin', userRole.includes(parseInt(process.env.REACT_APP_ROLE_ADMIN)))}

            {(userRole.includes(
                parseInt(process.env.REACT_APP_ROLE_SUPER_ADMIN)
            ) === false
            || userRole.includes(
                parseInt(process.env.REACT_APP_ROLE_ADMIN)
            )) === false
            && <UserSidebar />}

            {userRole.includes(
                parseInt(process.env.REACT_APP_ROLE_ADMIN)
            ) === true
            && <AdminSidebar />}

            {userRole.includes(
                parseInt(process.env.REACT_APP_ROLE_SUPER_ADMIN)
            ) === true
            && <SuperAdminSidebar />} */}
        </Box>
    );
}