import { useContext, useState, useEffect } from 'react';
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
// Modal
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../auth'
import GlobalStoreContext from '../store';

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

export default function TopAppBanner(props) {

    const { link } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const handleProfileOpen = () => setProfileOpen(true);
    const handleProfileClose = () => setProfileOpen(false);

    const [isGuest, setIsGuest] = useState(false);
    const [profileLink, setProfileLink] = useState("/profile/");


    useEffect(() => {
        if(auth.user){
            setProfileLink("/profile/" + auth.user.userName);
            
            if(auth.user.userName === "GUEST"){
                setIsGuest(true);
            }
        }
        if(auth.loggedIn){
        }
    
    }, [auth]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        store.clearTransactionStack();
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        //store.clearTransactions();
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
        <div>
        <Box flex
            sx={{
                width: '100%'
            }}>
            <AppBar position="static" sx={{ bgcolor: "#800000" }}>
                <Toolbar variant='dense'>
                    <Box bgcolor={'#e8e8e8'} >
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ position: 'relative', display: { xs: 'none', sm: 'block' }, zIndex: "2"}}
                    >
                        <a href={link}><img style={{ height: "40px", }} src={'/logo_maroon.png'} alt="logo" /></a>
                    </Typography>
                    </Box>
                    
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            marginRight: 5
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
                            id="profileButton"
                            aria-controls={menuId}
                            onClick={handleProfileOpen}
                            color="inherit"
                            sx={{ bgcolor: "black" }}
                        >
                            <AccountCircle />
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
                            <Button href={profileLink} variant="contained"  marginTop="4" color="primary" sx={{
                                display:
                                isGuest
                                    ? "none"
                                    : "contained",
                            }}>
                                VIEW PROFILE
                            </Button>
                            <Button onClick={handleLogout} variant="contained" marginTop="4" color="primary">
                                LOG OUT
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