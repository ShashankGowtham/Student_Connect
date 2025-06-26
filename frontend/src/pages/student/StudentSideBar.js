import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader, Divider } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ReportIcon from '@mui/icons-material/Report';

const StudentSideBar = () => {
    const location = useLocation();

    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Student/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton component={Link} to="/Student/subjects">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Student/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>

                <ListItemButton component={Link} to="/Student/attendance">
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.startsWith("/Student/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                </ListItemButton>

                <ListItemButton component={Link} to="/Student/halltickets">
                    <ListItemIcon>
                        <ConfirmationNumberIcon color={location.pathname.startsWith("/Student/halltickets") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Hall Tickets" />
                </ListItemButton>

                <ListItemButton component={Link} to="/Student/complain">
                    <ListItemIcon>
                        <ReportIcon color={location.pathname.startsWith("/Student/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                </ListItemButton>
            </React.Fragment>

            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>

                <ListItemButton component={Link} to="/Student/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Student/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>

                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    );
};

export default StudentSideBar;