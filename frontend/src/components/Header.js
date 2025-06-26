import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    MenuItem,
    Menu,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLogout } from '../redux/userRelated/userHandle';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
}));

const Header = ({ handleDrawerToggle }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationsMenuOpen = (event) => {
        setNotificationsAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setNotificationsAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
        handleMenuClose();
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const renderNotificationsMenu = (
        <Menu
            anchorEl={notificationsAnchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>No new notifications</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <StyledToolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ fontWeight: 600 }}
                        >
                            Student Connect
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            onClick={handleNotificationsMenuOpen}
                        >
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </StyledToolbar>
                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.12)' }} />
            </AppBar>
            {renderMenu}
            {renderNotificationsMenu}
        </Box>
    );
};

export default Header; 