//profile screen
'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import TopAppBanner from '../Utils/TopAppBanner';
import BottomAppBanner from '../Utils/BottomAppBanner';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//specifically from modal
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


let exampleUser = {
  userName: "Mapy",
  firstName: "Jane",
  lastName: "Doe",
  email: "jd@stonybrook.edu",
  //comments?????
  maps: ["21321321", "02103021", "921321321"] //NEED METHODS FOR GETTING THEIR DATA
}


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
      <Grid container align={'center'} >
        <Grid item xs={12} >
          <TopAppBanner />
        </Grid>

        <div>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
              <div>
                <Grid item>
                  <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                    Profile
                  </Typography>
                  </Grid>
                 
                  <Grid item>
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
                        alignItems: 'center'
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
        "profile community community"
        "profile community community"`,
                      }}
                    >
                      <Box sx={{ marginLeft: 1, gridArea: 'profile', bgcolor: '#e8e8e8' }} align={"center"}>


                        <Avatar sx={{ width: 175, height: 175 }} src={'/profile image.png'} alt="Profile Picture" />


                        <Grid container spacing={1} align="center">
                          <Grid item>
                            <Button onClick={handleOpen} variant="contained" color="primary" sx={{marginTop: 1}}>
                              Edit Account Information
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant="contained" color="primary">
                              Delete Profile
                            </Button>
                          </Grid>

                        </Grid>

                      </Box>

                      <Box sx={{ marginRight: 1, gridArea: 'account', bgcolor: '#800000' }}>
                        <Typography variant="h5"> Account Settings </Typography>
                        <Typography textAlign='left'>First Name: {exampleUser.firstName}</Typography>
                        <Typography textAlign='left'>Last Name: {exampleUser.lastName}</Typography>
                        <Typography textAlign='left'>User Name: {exampleUser.userName}</Typography>
                        <Typography textAlign='left'>Email: {exampleUser.email}</Typography>
                      </Box>

                      <Box sx={{ marginRight: 1, gridArea: 'community', bgcolor: '#800000' }}>
                        <Typography variant="h5"> Community Statistics </Typography>
                        <Typography textAlign='left'>Total Maps Made: 5</Typography>
                        <Typography textAlign='left'>Total Map Views: 100</Typography>
                        <Typography textAlign='left'>Total Map Likes: 50</Typography>
                        <Typography textAlign='left'>Total Maps Dislikes: 6</Typography>
                        <Typography textAlign='left'>Total Comment Likes: 0</Typography>
                        <Typography textAlign='left'>Total Comment Dislikes: 0</Typography>
                      </Box>


                    </Box>
                  </Box>
                  </Grid>
                 
                <Modal
                  open={open}
                  onClose={handleClose}
                >
                  <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        p: 2,
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
        <Grid item xs={12}>
          <BottomAppBanner />
        </Grid>
      </Grid>
    </div>
  );
}
