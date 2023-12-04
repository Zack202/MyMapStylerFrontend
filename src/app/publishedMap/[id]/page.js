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
import CommentSection from './CommentSection.js';
import TopAppBanner from '../../Utils/TopAppBanner';
import { MapContainer, TileLayer} from 'react-leaflet'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '../../auth'
import { useContext } from 'react';
import { GlobalStoreContext } from '../../store/index.js'
import customA from './customA.geo.json'

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

    const { store } = useContext(GlobalStoreContext);

    if (typeof window !== 'undefined') {
        let mapName = ""
        if (store.currentMap != null && store.currentMap.name != null){
            mapName = store.currentMap.name
        }
        let mapData;
        if (store.currentMap == null){
            mapData = customA
        }
        else {
            mapData = store.currentMap.mapGeometry
        }
    return(   
        <div>
        <div>
        <Grid item xs={12}>
            <TopAppBanner />
        </Grid>
        </div>
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
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
                                gridTemplateAreas: `"maphead maphead maphead"
    "map map comments"
    "map map comments"
    "describe describe describe"`,
                            }}
                        >
                            <Box sx={{ gridArea: 'maphead', bgcolor: '#a9a9a9' }}>{mapName}
                                
                            </Box>

                            <Box sx={{ gridArea: 'map', bgcolor: '#d49182' }}>
                            <Leafletmap 
                                mapGeo={mapData}
                            />
                            </Box>
                            <Box sx={{ gridArea: 'comments', bgcolor: '#800000' }}>Comments
                                <CommentSection />
                            </Box>
                            <Box sx={{ gridArea: 'describe', bgcolor: '#800000' }}>Description
                            <Typography variant="h5" align="center" color="white" paragraph>
                            This is the description for a map. Users can add a description to give other users a better idea of what the map is about.
                            </Typography>
                                
                            </Box>
                        </Box>
                    </Box>
        </Container>
        </ThemeProvider>
        </div>
        )
                        }
                        else {
                            return null
                        }
                        };