import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const SideBar = () => {
    return (
        <>
            <ListItemButton component={Link} to="/Student/halltickets">
                <ListItemIcon>
                    <ConfirmationNumberIcon color={location.pathname.startsWith("/Student/halltickets") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Hall Tickets" />
            </ListItemButton>
        </>
    );
}; 