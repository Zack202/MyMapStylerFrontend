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

import React, { useEffect } from 'react';



export default function CreateAccountScreen() {

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
    <div className={`${styles.backgroundContainer}`}>
    <CssBaseline />
    <Grid container>
        <Grid item xs={8}>
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
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="firstName" className={styles.text_color}>First Name</InputLabel>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Enter Your First Name"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="lastName" className={styles.text_color}>Last Name</InputLabel>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Enter Your Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm = {6}>
                            <InputLabel htmlFor="userName" className={styles.text_color}>User Name</InputLabel>
                            <TextField
                            required
                            fullWidth
                            id="userName"
                            label="Enter Your User Name"
                            name="userName"
                            autoComplete="user-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm = {6}>
                            <InputLabel htmlFor="email" className={styles.text_color}>Email Address</InputLabel>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Enter Your Email Address"
                            name="email"
                            autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm = {6}>
                            <InputLabel htmlFor="password" className={styles.text_color}>Password</InputLabel>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Enter Your Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm = {6}>
                            <InputLabel htmlFor="confirmpassword" className={styles.text_color}>Confirm Password</InputLabel>
                            <TextField
                            required
                            fullWidth
                            name="confirmpassword"
                            label="Re-Enter Your Password"
                            type="password"
                            id="confirmpassword"
                            autoComplete="confirmpassword"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                            className={styles.button_color}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 1, height: '40px'}}
                            >
                            Confirm Registration
                            </Button>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className= {styles.text_color} component="h1" variant="h6">
                            Already have an account or want to continue as a guest?{' '}
                            <Link href="#" variant="h6" className={styles.text_color}>
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
        <Grid item xs={4}>
            <div id="image-gallery" className={styles.image_gallery}>
                <img src='B&WTopology.jpg' alt="Gallery Image 1" />
            </div>
        </Grid>
    </Grid>
    </div>
    );
}