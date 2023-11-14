import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// import AuthContext from '../auth';
// import { GlobalStoreContext } from '../store';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Copyright } from '@mui/icons-material';
import { Typography } from '@mui/material';


export default function BottomAppBanner() {
    if (typeof window !== 'undefined') {
    return (
        <Box sx={{ flexGrow: 1, width: "100%", position:"absolute", bottom: 0}}>
            <AppBar position="static" sx={{bgcolor: "#800000", height:"48px"}}>
                <Typography sx={{  position: "absolute", top: "50%", left: "50%",   transform: "translate(-50%,-50%)"}}>
                <Copyright>My Map Styler</Copyright>
                My Map Styler
                </Typography>
            </AppBar>
        </Box>
    );
    }else{ 
        return null;
    }
}