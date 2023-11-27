'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from './CreateAccountScreen.module.css';
import InputLabel from '@mui/material/InputLabel';
import MUIErrorModal from '../components/MUIErrorModal';
import NavBar from '../Utils/NavBar';
import { useRouter } from 'next/navigation';

import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../auth'


export default function CreateAccountScreen() {
    const { auth }  = useContext(AuthContext);

    if (auth.loggedIn) {
        const router = useRouter();
        router.push('/home_browser');
      }


    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
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

    const[error, setError] = useState(false);
    const[errorMessage, setErrorMessage] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("Auth object:", auth);
        auth.registerUser(
            formData.userName,
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password,
            formData.confirmPassword
        )
    };

    useEffect(() => {
        // Clean up the animation when the component is unmounted
        return () => {
          const imageGallery = document.getElementById('image-gallery');
          if (imageGallery) {
            imageGallery.style.animation = 'none';
          }
        };
      }, []);


    return (
    <div><NavBar/>
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
                        Welcome to <span style={{ fontWeight: 'bold' }}>My Map Styler</span>
                    </Typography>
                    <Typography className= {styles.text_color} component="h1" variant="h5">
                        Sign up to start exploring and creating amazing maps!
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InputLabel className={styles.text_color}>First Name</InputLabel>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Enter Your First Name"
                            autoFocus
                            onChange={handleInputChange}
                            value={formData.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel className={styles.text_color}>Last Name</InputLabel>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Enter Your Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            onChange={handleInputChange}
                            value={formData.lastName}
                            />
                        </Grid>
                        <Grid item xs={12} sm = {6}>
                            <InputLabel className={styles.text_color}>User Name</InputLabel>
                            <TextField
                            required
                            fullWidth
                            id="userName"
                            label="Enter Your User Name"
                            name="userName"
                            autoComplete="user-name"
                            value={formData.userName}
                            onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm = {6}>
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
                            />
                        </Grid>
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
                            Confirm Registration
                            </Button>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className= {styles.text_color} component="h1" variant="h6">
                            Already have an account or want to continue as a guest?{' '}
                            <Link href="/login" variant="h6" className={styles.text_color}>
                            Login Here
                            </Link>
                            </Typography>
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
}