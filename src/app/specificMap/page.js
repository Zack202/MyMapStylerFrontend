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
import { MapContainer, TileLayer} from 'react-leaflet'
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
  }},);


export default function specificMapScreen(){
    return(
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
            <Container maxwidth="sm" style={{ marginTop: '20px' }}>
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
                                    gridTemplateAreas: `"maphead maphead comhead"
        "map map comments"
        "map map comments"
        "describe describe . "`,
                                }}
                            >
                                <Box sx={{ gridArea: 'maphead', bgcolor: '#a9a9a9' }}>My Map of Paris
                                    
                                </Box>
                                <Box sx={{ gridArea: 'comhead', bgcolor: '#990000' }}>Comments
                            
                                </Box>
                                <Box sx={{ gridArea: 'map', bgcolor: '#d49182' }}>Map
                                 <Leafletmap />
                                </Box>
                                <Box sx={{ gridArea: 'comments', bgcolor: '#800000' }}>Comments
                                    <CommentSection />
                                </Box>
                                <Box sx={{ gridArea: 'describe', bgcolor: '#800000' }}>Description
                                    
                                </Box>
                            </Box>
                        </Box>
            </Container>
            </ThemeProvider>

    );
}