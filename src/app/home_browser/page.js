

// Import dependencies
'use client'
import { Grid, Box, Fab} from "@mui/material";
import TopAppBanner from './TopAppBanner';
import BottomAppBanner from './BottomAppBanner';
import SearchSortBar from './SearchSortBar';
import MapCard from './MapCard';
import AddIcon from '@mui/icons-material/Add';
import CreateMapModal from "src/app/components/CreateMapModal.js";
import React, {useState} from 'react'


const backgroundStyle = {
    backgroundImage: 'url("./topology_art.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%'
  };


export default function UserHomeScreenMapBrowsingScreenWrapper() {


    return(
        <Grid container >
            
            <Grid item xs={12}>
                <TopAppBanner />
            </Grid>
            <Grid item xs={12}>
                <SearchSortBar />
            </Grid>
            <Box item xs={12} sx={{position:"absolute", width: "100%", 
            display: "flex", flexDirection: "column", overflow: "scroll", maxHeight: "75%", top: "17%"}} style={backgroundStyle}>
                <MapCard />
                <MapCard />
                <MapCard />
                <MapCard />
            </Box>

            {/* <CreateMapModal open={open}/> */}

            <Grid item xs={12}>
                <BottomAppBanner />
            </Grid>
        </Grid>

    )
}