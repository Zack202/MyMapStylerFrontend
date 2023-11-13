//specific map screen

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
import CommentSection from './CommentSection';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { MapContainer, TileLayer } from 'react-leaflet'
import TopAppBanner from './TopAppBanner';
//import "leaflet/dist/leaflet.css"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Leafletmap from './Leafletmap';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#990000'
        },
        secondary: {
            main: '#800000'
        },
    }
},);


export default function specificMapScreen() {
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
                    <AccountCircleIcon sx={{ display: { xs: 'none', md: 'flex' }, zIndex: "2", right: '40px', position: 'absolute'}} />
                </Toolbar>
            </AppBar>
            <Container maxwidth="sm" style={{ marginTop: '20px', height: '100%' }}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
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
                            gridTemplateAreas: `"maphead maphead maphead"
        "map map comments"
        "map map comments"
        "describe describe comments "`,
                        }}
                    >
                        <Box sx={{ gridArea: 'maphead', bgcolor: '#a9a9a9' }}>
                            <Typography variant="h3" align='center' >
                                My Map of Some Countries
                            </Typography>

                        </Box>
                        <Box sx={{ gridArea: 'map', bgcolor: '#d49182' }}>
                            <Leafletmap />
                        </Box>
                        <Box sx={{ gridArea: 'comments', bgcolor: '#800000' }}>
                            <CommentSection />
                        </Box>
                        <Box sx={{ gridArea: 'describe', bgcolor: '#777b7e' }}>
                            <AppBar position="relative" >
                                <Toolbar >
                                    <AccountCircleIcon/> MapMan23
                                    <Box sx={{ display: { xs: 'none', md: 'flex' }, zIndex: "2", gap: 1, right: '20px', position: 'absolute'}}>
                                    <ThumbUpIcon /> 25
                                    <ThumbDownIcon /> 1000
                                    </Box>

                                </Toolbar>
                            </AppBar>
                            <Typography variant='h6'>Description:</Typography>
                            <Typography>
                                
                                This is a description it describes the map and it says things about the map that are very descriptive. This description is very descriptive and describes the map very well.
                            </Typography>
                            <Box sx={{display: { xs: 'none', md: 'flex' }, zIndex: "2", gap: 1, position: 'relative'}}>
                            <Button variant="contained" color="primary">Export</Button>
                            <Button variant="contained" color="primary">Fork</Button>
</Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>

    );
}