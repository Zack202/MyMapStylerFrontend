

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
    const [temporaryFilter, setTemporaryFilter] = useState("NEVER SET");
    const [triggerGenerate, setTriggerGenerate] = useState(false);

    let isGuest = true;
    if (auth.loggedIn) {
        if (auth.user.userName === "GUEST") {
            isGuest = true;
        }
        else {
            isGuest = false;
        }
    }

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    // after store.idNamePairs, generate
    useEffect(() => {
        generateDefaultMapCard();
    }, [store.idNamePairs]);

    // if store's filter is changed, update
    useEffect(() => {
        runFilters();
    }, [store.filter]);

    // if temporary filter is changed, update
    useEffect(() => {
        if(temporaryFilter !== "NEVER SET" ) {
            generateMapCard(temporaryFilter);
            setShownMaps(mapCard);
        }
            
    }, [triggerGenerate]); 

    // if search is changed, update
    useEffect(() => {
        runFilters();
    }, [store.search]);

    let mapCard = "mapCard is never defined, AKA generateMapCard never ran";

    const generateDefaultMapCard = () => {
        setTemporaryFilter(store.idNamePairs); // must do to avoid crashing while loading first filter
        generateMapCard(store.idNamePairs);
        setShownMaps(mapCard);
    }

    const generateMapCard = (maps) => {
        mapCard =
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
                {
                    maps.map((pair) => (
                        <MapCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
            </List>;
    }

    const runFilters = () => {
        if (store) {
            let searchedMaps = [];

            // Searching
            if (store.search === "") {
                searchedMaps = store.idNamePairs;
            } else {
                for (let i = 0; i < store.idNamePairs.length; i++) {
                    if (store.idNamePairs[i].name.includes(store.search)) {
                        searchedMaps.push(store.idNamePairs[i]);
                    }
                }
                if(searchedMaps.length === 0){
                    setTemporaryFilter([]);
                    setTriggerGenerate(!triggerGenerate);
                    setShownMaps(mapCard);
                }
            }
            // Filtering
            if (store.filter.length === 0) {
                generateMapCard(searchedMaps);
                setShownMaps(mapCard);
            }
            else {
                let filter2 = [];

                for (let i = 0; i < store.filter.length; i++) {
                    switch (store.filter[i]) {
                        case "Color": {
                            filter2.push(0);
                            break;
                        }
                        case "Text": {
                            filter2.push(1);
                            break;
                        }
                        case "Heat": {
                            filter2.push(2);
                            break;
                        }
                        case "Dot": {
                            filter2.push(3);
                            break;
                        }
                        case "Sized Dot": {
                            filter2.push(4);
                            break;
                        }
                        default: {
                            console.log("FILTER ERROR");
                        }
                    }
                }

                let filteredMaps = [];
                for (let i = 0; i < searchedMaps.length; i++) {
                    store.getMapById(searchedMaps[i]._id).then((map) => {
                        if (filter2.includes(map.data.map.mapType)) {
                            filteredMaps.push(searchedMaps[i]);
                        }
                        setTemporaryFilter(filteredMaps);
                        if (i === searchedMaps.length - 1) {
                            setTriggerGenerate(!triggerGenerate);
                            setShownMaps(mapCard);
                        }
                    });
                }                
            }

        }
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

                {/*<MapCard />
                <MapCard />
                <MapCard />
        <MapCard />*/}
                {shownMaps}
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