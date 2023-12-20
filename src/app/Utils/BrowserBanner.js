import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthContext from '../auth'; // assuming AuthContext import

export default function BrowserBanner() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <Box
        flex
        sx={{
          width: '100%',
        }}
      >
        <AppBar position="static" sx={{ bgcolor: "#BE8585" }}>
          <Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
          <Button
            href={auth.user && auth.user.userName !== "GUEST" ? "/home" : undefined}
            variant='contained'
            sx={{
                display: auth.user && auth.user.userName !== "GUEST" ? 'flex' : 'none',
                backgroundColor: "maroon",
                color: "white",
                width: "15%",
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                backgroundColor: 'maroon',
                },
            }}
            >
              {auth.user && auth.user.userName !== "GUEST" ? "Switch to Home" : null}
            </Button>
            <Typography
              style={{ fontWeight: 'bold', fontSize: '20px' }}
              sx={{ display: auth.user && auth.user.userName === "GUEST" ? "inline-block" : "none" }}
            >
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
              <Typography style={{ fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px', marginRight: auth.user && auth.user.userName !== "GUEST" ? '15%' : '3%' }}>
                <b><u>MAP BROWSING</u></b>
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, zIndex: "2", right: '20px', position: 'absolute' }}></Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}