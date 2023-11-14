'use client'
import styles from './SplashScreen.module.css'
import { useState } from 'react'
import React from 'react'
import api from './api.js'
import Button  from '@mui/material/Button'
import { Box, Typography } from '@mui/material'
import Link from '@mui/material/Link';

const backgroundStyle = {
  backgroundImage: 'url("./hckgavj2l7871.webp")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function SplashScreen (){
    return(
      <div style={backgroundStyle}>
      
        <Typography className={styles.center} style={{ fontFamily: 'Michroma', fontWeight: 'bold', fontSize:'110px' }}>
          <b><u>My Map Styler</u></b>
        </Typography>
        <Box sx={{ height: 300, background: '#BE8585', textAlign: 'center', borderRadius: '10px' }}>
        <Box sx={{ height: 100, width: 600, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h6" style={{color:'white', margin: '40px'}}>
              Welcome to <b>My Map Styler</b>. Here you can upload and edit maps, which can be later shared and downloaded. See a map you like and want to talk about it? Simply start a thread and get to discussing. Let's get Started.
            </Typography>
            <Button href="/login" variant="contained" className={styles.buttons} style={{background: 'maroon', margin: '10px'}}>Login</Button>
            <Button href="createAccount" variant="contained" className={styles.buttons} style={{background: 'maroon', margin: '10px'}}>Create an Account</Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
