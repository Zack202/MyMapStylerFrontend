import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// import AuthContext from '../auth';
// import { GlobalStoreContext } from '../store';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Copyright } from '@mui/icons-material';
import { Typography } from '@mui/material';


export default function BottomAppBanner() {

    return (
        <Box flex sx={{ width: "100%", bottom: 0, position: 'absolute'}}>
            <AppBar position="static" sx={{bgcolor: "#800000", height:"48px"}}>
            <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Typography style={{ marginTop: 10, fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px' }}>
                          My Map Styler
                          <Copyright></Copyright>
                        </Typography>
                    </Box>
            </AppBar>
        </Box>
    );
}