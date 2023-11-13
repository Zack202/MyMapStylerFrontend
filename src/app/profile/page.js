//profile screen
'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#990000'
        },
        secondary: {
            main: '#800000'
        },
  }},);

export default function Profile() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="relative" >
                <Toolbar >
                <IconButton aria-label="backarrow" disabled color="secondary"><ArrowBackIcon />
</IconButton>
                    
                    <HomeIcon />
                    <ManageSearchIcon />
                    <Typography variant="h6">
                        MyMapStyler

                    </Typography>
                    <AccountCircleIcon align='right' />
                </Toolbar>
            </AppBar>
            <main>
                <div>
                    <Container maxwidth="sm" style={{ marginTop: '20px' }}>
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                            Profile

                        </Typography>
                        <Grid item='true'>
                                                <Button href="/" variant="contained" color="primary">
                                                    LOG OUT
                                                </Button>
                                            </Grid>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Hello everyone this is where account info is supposed to be hopefully it looks ok because idk

                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                height: '400px',
                                color: '#fff',
                                '& > .MuiBox-root > .MuiBox-root': {
                                    p: 1,
                                    borderRadius: 2,
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gridTemplateRows: 'auto',
                                    gap: 1,
                                    gridTemplateAreas: `"profile account account"
        "footer community community"
        "footer community community"`,
                                }}
                            >
                                <Box sx={{ gridArea: 'profile', bgcolor: '#a9a9a9' }}>Profile
                                    <Box><AccountCircleIcon>
                                    </AccountCircleIcon></Box>
                                    
                                </Box>
                                <Box sx={{ gridArea: 'account', bgcolor: '#990000' }}>Account Settings
                                    <Typography>First Name: Jane</Typography>
                                    <Typography>Last Name: Doe</Typography>
                                    <Typography>User Name: Mapy</Typography>
                                    <Typography>Email: jd@stonybrook.edu</Typography>




                                </Box>
                                <Box sx={{ gridArea: 'community', bgcolor: '#d49182' }}>Community Feedback
                                    <Typography>Total Likes on Maps: 50</Typography>
                                    <Typography>Total Likes on Comments: 0</Typography>
                                    <Typography>Total Maps Viewed: 100</Typography>
                                    <Typography>Total Maps Made: 5</Typography>
                                    <Typography>Total Dislikes on Maps: 6</Typography>
                                    <Typography>Total Dislikes on Comments: 0</Typography>
                                    <Typography>Total Dislikes on Maps: 6</Typography>
                                </Box>
                                <Box sx={{ gridArea: 'footer', bgcolor: '#800000' }}>Footer
                                    <div>
                                        <Grid container spacing={5} align="center">
                                            <Grid item='true'>
                                                <Button variant="contained" color="primary">
                                                    Edit Account Information
                                                </Button>
                                            </Grid>
                                            <Grid item='true'>
                                                <Button variant="contained" color="primary">
                                                    Delete Profile
                                                </Button>
                                            </Grid>
                                            

                                        </Grid></div>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </div>
            </main>
            </ThemeProvider>
    );
}