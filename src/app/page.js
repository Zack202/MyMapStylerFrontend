'use client'
import styles from './SplashScreen.module.css'
import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material'
import AuthContext from './auth'
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';



export default function SplashScreen() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  if (auth.loggedIn) {
    if (auth.user.userName === "GUEST") {
      router.push('/browser');
    }
    else {
      router.push('/home');
    }

  }

  useEffect(() => {
    const loadImage = async () => {
      const img = new Image();
      img.src = './hckgavj2l7871.webp';
      img.onload = () => {
        setImageLoaded(true);
        if (auth.loggedIn) {
          if (auth.user.userName === "GUEST") {
            router.push('/browser');
          } else {
            router.push('/home');
          }
        }
      };
    };

    loadImage();
  }, [auth, router]);

  const backgroundStyle = {
    backgroundImage: imageLoaded ? 'url("./hckgavj2l7871.webp")' : 'url("./placeholder.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  };

  const handleGuest = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Auth object:", auth);
    auth.loginUser(
      "GUEST@GUEST.GUEST",
      "GUESTGUEST",
    )
  }
  return (
    <div style={backgroundStyle}>

      <Typography className={styles.center} style={{ fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '110px' }}>
        <b><u>My Map Styler</u></b>
      </Typography>
      <Box sx={{ height: 250, background: '#BE8585', textAlign: 'center', borderRadius: '10px' }}>
        <Box sx={{ height: 100, width: 800, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h6" style={{ color: 'white', margin: '40px' }}>
              Welcome to <b>My Map Styler</b>. Here you can upload and edit maps, which can be later shared and downloaded. See a map you like and want to talk about it? Simply start a thread and get to discussing. Let's get started.
            </Typography>
            <Button href="/login" variant="contained" className={styles.buttons} style={{ background: 'maroon', margin: '10px' }}>Login</Button>
            <Button href="/createAccount" variant="contained" className={styles.buttons} style={{ background: 'maroon', margin: '10px' }}>Create an Account</Button>
            <Button variant="contained" className={styles.buttons} style={{ background: 'maroon', margin: '10px' }} onClick={handleGuest}>Continue As Guest</Button>
          </Box>
        </Box>
      </Box>
    </div>
  )

}
