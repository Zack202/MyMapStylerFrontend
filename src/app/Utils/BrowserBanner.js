import { useContext} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// Guest
import AuthContext from '../auth'

export default function BrowserBanner() {

    const { auth } = useContext(AuthContext);

    let isGuest = false;
    if (auth.loggedIn) {
        if (auth.user.userName === "GUEST") {
            isGuest = true;
        }
        else {
            isGuest = false;
        }
    }


    return (
        <div>
        <Box flex
            sx={{
                width: '100%',
            }}>
            <AppBar position="static" sx={{ bgcolor: "#800000" }}>
                <Toolbar variant='dense'>
                    
                <Button href="/home" variant='contained'
                sx ={{ display:
                    isGuest
                        ? "none"
                        : "inline-block",}}>
                    HOME
                </Button>
                <Typography 
                style= {{fontWeight: 'bold', fontSize: '20px'}}
                sx ={{ display:
                    !isGuest
                        ? "none"
                        : "inline-block",}}>
                    Guest 
                </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Typography style={{ fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px', marginRight: '80px' }}>
                            <b><u>MAP BROWSING</u></b>
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, zIndex: "2", right: '20px', position: 'absolute' }}>

                    </Box>
                  
                </Toolbar>
            </AppBar>
        </Box>
        </div>
    );
    
}