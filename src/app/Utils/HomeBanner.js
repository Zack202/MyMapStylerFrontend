import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function HomeBanner() {
    return (
      <div>
        <Box
          flex
          sx={{
            width: '100%'
          }}
        >
          <AppBar position="static" sx={{ height: '50%', bgcolor: "#BE8585" }}>
            <Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
              <Button href="/browser" variant='contained' style={{ width: "15%", background: 'maroon', color: "white", }}>
                Switch to Browse
              </Button>
  
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexGrow: 1,
                }}
              >
                <Typography style={{ fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px', marginRight: '17.5%' }}>
                  <b><u>YOUR MAPS</u></b>
                </Typography>
              </Box>
              
              <Box sx={{ display: { xs: 'none', md: 'flex' }, zIndex: "2", right: '20px', position: 'absolute' }}></Box>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  }