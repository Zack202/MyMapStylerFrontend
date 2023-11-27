'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../auth'
import { useContext, useState } from 'react';
import MUIErrorModal from '../components/MUIErrorModal';
import NavBar from '../Utils/NavBar';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import InputLabel from '@mui/material/InputLabel';

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



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 300,
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};


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

export default function SignIn() {

  const { auth } = useContext(AuthContext);
  if (typeof window !== 'undefined') {
    if (auth.loggedIn) {
      const router = useRouter();
      router.push('/home_browser');
    }
  }

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    emailForgot: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Auth object:", auth);
    auth.loginUser(
      formData.email,
      formData.password,
    ).catch((err) => {
      setErrorMessage("wrong email or password");
      setError(true);
    });

  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Auth object:", auth);
    auth.forgotPassword(
      formData.emailForgot,
    ).catch((err) => {
      setErrorMessage("wrong email");
      setError(true);
    });
    handleClose();
  };

  return (
<div>
  <NavBar />
  <div className={`${styles.backgroundContainer}`}>
    <CssBaseline />
    <Grid container align="center">
      <Grid item xs>
        <Box className={styles.rounded_box} bgcolor={'white'} maxWidth='md' padding='5%'>
          <Container component="main" maxWidth="md">
            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography className={styles.text_color} component="h1" variant="h3">
                Welcome back to <span style={{ fontWeight: 'bold' }}>My Map Styler</span>
              </Typography>
              <Typography className={styles.text_color} component="h1" variant="h5">
                Sign in to continue exploring and creating amazing maps!
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputLabel className={styles.text_color}>Email Address</InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Enter Your Email Address"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel className={styles.text_color}>Password</InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="Enter Your Password"
                      name="password"
                      type='password'
                      autoComplete="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      className={styles.button_color}
                      type="button"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 1, height: '40px' }}
                      id="signIn"
                      onClick={handleSubmit}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Grid container>
              <Grid item xs={6}>
                <Link onClick={handleOpen} variant="body2" className={styles.text_color}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href="/createAccount" variant="body2" className={styles.text_color}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Grid>
      
    </Grid>

    <Modal open={open} onClose={handleClose}>
      <Container component="main" maxWidth="xs">
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
            Forgot Password
          </Typography>
          <Typography>
            Enter the email address associated with your account, and we'll send you a link to reset your password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmitPassword} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="emailForgot"
                  label="Email Address"
                  name="emailForgot"
                  autoComplete="email"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Continue
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
    {/* Error Modal */}
    <MUIErrorModal />
  </div>
</div>


  );
}