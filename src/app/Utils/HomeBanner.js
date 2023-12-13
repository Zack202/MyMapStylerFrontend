import { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function HomeBanner() {

    return (
        <div>
        <Box flex
            sx={{
                width: '100%'
            }}>
            <AppBar position="static" sx={{height: '50%', bgcolor: "#800000" }}>
                <Toolbar variant='dense'>

                <Button 
                    href="/browser" variant='contained'>
                    BROWSE
                </Button>
                    
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Typography style={{ fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px', marginRight: '90px' }}>
                            <b><u>YOUR MAPS</u></b>
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