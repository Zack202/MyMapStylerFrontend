// Import dependencies
'use client'
import { Grid, Box } from "@mui/material";
import TopAppBanner from '../Utils/TopAppBanner';
import BrowserBanner from '../Utils/BrowserBanner';
import SearchSortBar from '../Utils/SearchSortBar';
import PublishedMapCard from '../Utils/PublishedMapCard';
import Button from '@mui/material/Button';
import React, { useState, useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import List from '@mui/material/List';
import AuthContext from "../auth";
import { CircularProgress } from "@mui/material";

const backgroundStyle = {
    backgroundImage: 'url("./0dd0bbbc6c38a555d0817e8051ef2b12.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
};


export default function Browser() {


    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [shownMaps, setShownMaps] = useState(false);
    const [temporaryFilter, setTemporaryFilter] = useState("NEVER SET");
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        if(auth.user){
            if(auth.user.userName === "GUEST"){
                setIsGuest(true);
            }
        }
    }, [auth]);

    useEffect(() => {
        // idNamePair actually has a ton of the actually map data too.
        store.loadPublishedIdNamePairs();
    }, []);

    // after store.idNamePairs, generate
    useEffect(() => {
        if(store.search === "" && store.filter.length === 0){
            generateDefaultMapCard();
        }
    }, [store.idNamePairs]);

    // if temporary filter is changed, update
    useEffect(() => {
        if(temporaryFilter !== "NEVER SET" ) {
            generateMapCard(temporaryFilter);
            setShownMaps(mapCard);
        }
            
    }, [temporaryFilter]); 

        // if sort is changed, update
    useEffect(() => {
        runFilters();
    }, [store.sort]);

    // if store's filter is changed, update
    useEffect(() => {
        runFilters();
    }, [store.filter]);

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
            <List sx={{ width: '90%', left: '5%', bgcolor: '' }}>
                {
                    maps.map((pair) => (
                        <PublishedMapCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                            location={"browser"}
                            isGuest={isGuest}
                        />
                    ))
                }
            </List>;
    }

    const runFilters = async () => {
        if (store) {
            let searchedMaps = [];

            // Sorting
            switch (store.sort) {
                case "Likes": {
                    store.idNamePairs.sort((p1, p2) => p1.likes.length > p2.likes.length ? -
                    1 : (p1.likes.length < p2.likes.length) ? 1 : 0);
                    store.updateSort("Likes");

                    break;
                }
                case "Dislikes": {
                    store.idNamePairs.sort((p1, p2) => p1.dislikes.length > p2.dislikes.length ? -
                    1 : (p1.dislikes.length < p2.dislikes.length) ? 1 : 0);
                    store.updateSort("Dislikes");
                    break;
                }
                case "Date": {
                    store.idNamePairs.sort((p1, p2) => p1.createdAt < p2.createdAt ? -
                    1 : (p1.createdAt > p2.createdAt) ? 1 : 0);
                    store.updateSort("Date");
                    break;
                }
                case "Name": {
                    store.idNamePairs.sort((p1, p2) => p1.name.toUpperCase() < p2.name.toUpperCase() ? -
                    1 : (p1.name.toUpperCase() > p2.name.toUpperCase()) ? 1 : 0);
                    store.updateSort("Name");
                    break;
                }
                default: {
                    console.log("SORTING ERROR");
                }
            }

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
                    setShownMaps(mapCard);
                }
            }
            // Filtering
            if (store.filter !== null && store.filter !== undefined) {
            if (store.filter.length === 0) {
                generateMapCard(searchedMaps);
                setShownMaps(mapCard);
            }
            else {
                let filter2 = [];

                for (let i = 0; i < store.filter.length; i++) {
                    switch (store.filter[i]) {
                        case "Color": {
                            filter2.push(5);
                            break;
                        }
                        case "Text": {
                            filter2.push(1);
                            break;
                        }
                        case "Choropleth": {
                            filter2.push(4);
                            break;
                        }
                        case "Dot": {
                            filter2.push(3);
                            break;
                        }
                        case "Sized Dot": {
                            filter2.push(2);
                            break;
                        }
                        default: {
                            console.log("FILTER ERROR");
                        }
                    }
                }

                let filteredMaps = [];
                for (let i = 0; i < searchedMaps.length; i++) {
                    await store.getMapById(searchedMaps[i]._id).then((map) => {
                        if (filter2.includes(map.data.map.mapType)) {
                            filteredMaps.push(searchedMaps[i]);
                        }
                        
                        if (i === searchedMaps.length - 1) {
                            setTemporaryFilter(filteredMaps);
                            setShownMaps(mapCard);
                        }
                    });
                }                
            }
        }

        }
    }

    return (
        <Grid container >

            <Grid item xs={12}>
                <TopAppBanner link={"/browser"} />
            </Grid>
            <Grid item xs={12}>
                <BrowserBanner />
            </Grid>
            <Grid item xs={12}>
                <SearchSortBar />
            </Grid>

            <Box item xs={12} sx={{
                position: "relative", width: "100%",
                display: "flex", flexDirection: "column", overflow: "scroll", maxHeight: "75%", top: "17%"
            }} style={backgroundStyle}>

                <div>
                {shownMaps === false ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <CircularProgress sx={{ color: 'maroon' }} size={100} thickness={5} />
                </div>
                ) : (
                shownMaps
                )}
            </div>
            </Box>
            <Box item xs={12} sx={{
                position: "absolute", width: "100%",
            }}>
               
            </Box>
        </Grid>

    )
}