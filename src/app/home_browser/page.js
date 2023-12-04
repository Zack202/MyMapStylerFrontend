

// Import dependencies
'use client'
import { Grid, Box } from "@mui/material";
import TopAppBanner from '../Utils/TopAppBanner';
import BottomAppBanner from '../Utils/BottomAppBanner';
import SearchSortBar from './SearchSortBar';
import MapCard from './MapCard';
import AddIcon from '@mui/icons-material/Add';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import CreateMapModal from "src/app/components/CreateMapModal.js";
import React, { useState, useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import List from '@mui/material/List';
import AuthContext from "../auth";
import { useRouter } from 'next/navigation';

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

    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [shownMaps, setShownMaps] = useState(false);

    let isGuest = true;
    if(auth.loggedIn){
        if (auth.user.userName === "GUEST") {
            isGuest = true;
        }
        else{
            isGuest = false;
        }
    }

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let mapCard = "";
    if (store) {
        
        let filteredMap = [];
        
        let i = 0
        if(store.search === ""){
            filteredMap = store.idNamePairs;
        }else{
            for (let i = 0; i < store.idNamePairs.length; i++) {
                if(store.idNamePairs[i].name.includes(store.search)){
                    filteredMap.push(store.idNamePairs[i]);
                }
            }
        }
            
        
        
        mapCard =
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
                {
                    filteredMap.map((pair) => (
                        <MapCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
            </List>;
    }

    return (
        <Grid container >

            <Grid item xs={12}>
                <TopAppBanner />
            </Grid>
            <Grid item xs={12}>
                <SearchSortBar />
            </Grid>

            <Box item xs={12} sx={{
                position: "absolute", width: "100%",
                display: "flex", flexDirection: "column", overflow: "scroll", maxHeight: "75%", top: "17%"
            }} style={backgroundStyle}>

                {mapCard}
            </Box>
            {/* <CreateMapModal open={open}/> */}
            <Box item xs={12} sx={{
                position: "absolute", width: "100%",
            }}>
                <Button sx={{
                    marginLeft: 15, marginTop: .75, display:
                        isGuest
                            ? "none"
                            : "inline-block",
                }} href="/createNewMap" variant='contained'>
                    Create New Map
                </Button>
            </Box>
            <Grid item xs={12}>
                <BottomAppBanner />
            </Grid>
        </Grid>

    )
}