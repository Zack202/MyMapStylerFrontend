import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { Link } from 'react-router-dom';
// import AuthContext from '../auth';
// import { GlobalStoreContext } from '../store';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// Modal
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        },
        primary: {
            main: '#990000'
        },
        secondary: {
            main: '#800000'
        },
    }
},);

export default function TopAppBanner() {

    const { auth }  = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileOpen = () => setProfileOpen(true);
    const handleProfileClose = () => setProfileOpen(false);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleGuest = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("Auth object:", auth);
        auth.loginUser(
            "GUEST@GUEST.GUEST",
            "GUESTGUEST",
        )
    }


    const menuId = 'primary-search-account-menu';


    return (
        <div>
            <Box flex
                sx={{
                    width: '100%'
                }}>
                <AppBar position="static" sx={{ bgcolor: "#800000" }}>
                    <Toolbar variant='dense'>
                        <Box bgcolor={'#e8e8e8'}>
                            <Typography
                                variant="h4"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' }, zIndex: "2" }}
                            >
                                <img style={{ height: "40px", }} src={'/logo_maroon.png'} alt="logo" />
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography style={{ fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px' }}>
                                <b><u>My Map Styler</u></b>
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, zIndex: "2", right: '20px', position: 'absolute' }}>
                            <IconButton
                                size="medium"
                                edge="end"
                                aria-haspopup="true"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                onClick={handleProfileOpen}
                                color="inherit"
                                sx={{ bgcolor: "black" }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Modal
                            open={profileOpen}
                            onClose={handleProfileClose}
                        >
                            <Container component="main" maxWidth="xs">
                                <ThemeProvider theme={defaultTheme}>
                                    <CssBaseline />
                                    <Box sx={{
                                        marginTop: 8,
                                        right: '20px',
                                        position: 'absolute',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'right',
                                        width: 300,
                                        bgcolor: 'background.paper',
                                        p: 2
                                    }}
                                    >
                                        <Button href="/login" variant="contained" marginTop="4" color="primary">
                                            Log in
                                        </Button>
                                        <Button href="/createAccount" variant="contained" marginTop="4" color="primary">
                                            Create a New Account
                                        </Button>
                                        <Button href="/browser" variant="contained" marginTop="4" color="primary" onClick={handleGuest}>
                                            Continue As Guest
                                        </Button>
                                        <Button href="/" variant="contained" marginTop="4" color="primary">
                                            Splash Screen
                                        </Button>
                                        
                                    </Box>
                                </ThemeProvider>
                            </Container>
                        </Modal>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}