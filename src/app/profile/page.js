//profile screen
'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import TopAppBanner from '../Utils/TopAppBanner';
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
import BottomAppBanner from '../Utils/BottomAppBanner';
/////specifically from modal
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Modal from '@mui/material/Modal';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MyMapStyler
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function Profile() {
  //for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div>
      <Grid item xs={12}>
        <TopAppBanner />
      </Grid>

      <div>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <main>
            <div>
              <Container maxwidth="sm" style={{ marginTop: '20px' }}>
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                  Profile

                </Typography>
                <Grid item='true'>
                </Grid>
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
                            <Button onClick={handleOpen} variant="contained" color="primary">
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
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      bgcolor: 'background.paper',
                      p: 2
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Change Account Information
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="confirmpassword"
                            label="Confirm Password"
                            type="confirmpassword"
                            id="confirmpassword"
                            autoComplete="confirm-password"
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                  <Copyright sx={{ mt: 5 }} />
                </Container>
              </Modal>
            </div>
          </main>
        </ThemeProvider>
      </div>
      <BottomAppBanner />
    </div>
  );
}