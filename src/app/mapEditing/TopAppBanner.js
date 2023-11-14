import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// import AuthContext from '../auth';
// import { GlobalStoreContext } from '../store';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function TopAppBanner() {
    if (typeof window !== 'undefined') {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        store.clearTransactions();
        auth.logoutUser();
    }

    const homeclearTransactions = () => {
        store.clearTransactions();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    // let editToolbar = "";
    // let menu = loggedOutMenu;
    // if (auth.loggedIn) {
    //     menu = loggedInMenu;
    //     // if (store.currentList) {
    //     //     editToolbar = <EditToolbar />;
    //     // }
    // }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle />;
    }

    return (
        <Box sx={{ flexGrow: 1, width: "100%"}}>
            <AppBar position="static" sx={{bgcolor: "#800000"}}>
                <Toolbar variant='dense'>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block'  }, zIndex: "2" }}                        
                    >
                        <img style={{height: "40px", }} src={'/logo_maroon.png'} alt="logo" />
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box  sx={{ display: { xs: 'none', md: 'flex' }, zIndex: "2", right: '20px', position: 'absolute'}}>
                        <IconButton
                            size="medium"
                            edge="end"
                            aria-haspopup="true"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            onClick={handleProfileMenuOpen}
                            href="/profile"
                            color="inherit"
                            sx={{bgcolor: "black"}}
                        >
                            {/* { getAccountMenu(auth.loggedIn) } */}
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                // menu
            }
        </Box>
    );
        }else{  return null;
        }
}