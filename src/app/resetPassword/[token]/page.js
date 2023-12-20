"use client";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from './ResetPassword.module.css';
import InputLabel from '@mui/material/InputLabel';
import MUIErrorModal from '../../components/MUIErrorModal';
import AuthContext from '../../auth';
import React, { useContext } from 'react';
import NavBar from '../../Utils/NavBar';
import { useEffect } from 'react';

const ResetPassword = () => {

    const { auth }  = useContext(AuthContext);
    if (typeof window !== 'undefined') {
    if (auth.loggedIn) {
        const router = useRouter();
        router.push('/home');
      }
    }
    const router = useRouter();
    const pathname = usePathname();
    const token = pathname.split('/')[2];
    console.log("token: " + token);

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
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
        auth.resetPassword(
            token,
            formData.password,
            formData.confirmPassword
        )
    };

  return (
    <div>
    <NavBar/>
    <div className={`${styles.backgroundContainer}`} >
    <CssBaseline />
    <Grid container align="center" >
        <Grid item xs>
            <Box className={styles.rounded_box} bgcolor={'white'} maxWidth='md' padding='5%' >
                <Container component="main" maxWidth="md">
                    <Box
                    sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                    >
                    <Typography className= {styles.text_color} component="h1" variant="h3">
                        Reset Password
                    </Typography>
                    <Typography className= {styles.text_color} component="h1" variant="h5">
                        Enter your new password below to reset your password. If you did not request a password reset, please ignore this page.
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm = {6}>
                            <InputLabel className={styles.text_color}>Password</InputLabel>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Enter Your Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm = {6}>
                            <InputLabel className={styles.text_color}>Confirm Password</InputLabel>
                            <TextField
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Re-Enter Your Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                            className={styles.button_color}
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1, height: '40px'}}
                            onClick={handleSubmit}
                            >
                            Reset Password
                            </Button>
                        </Grid>
                    </Grid>
            </Box>
            </Box>
            </Container>
            </Box>
        </Grid>

    </Grid>
    <MUIErrorModal/>
    </div>
    </div>
  );
};

export default ResetPassword;
