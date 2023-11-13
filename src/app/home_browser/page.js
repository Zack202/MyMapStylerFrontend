

// Import dependencies
'use client'
import { Grid } from "@mui/material";
import TopAppBanner from './TopAppBanner';
import BottomAppBanner from './BottomAppBanner';
import SearchSortBar from './SearchSortBar';
import MapCard from './MapCard';


export default function UserHomeScreenMapBrowsingScreenWrapper() {

    //code here for if user is on home screen or map browsing screen




    return(
        <Grid container>
            <Grid item xs={12}>
                <TopAppBanner />
            </Grid>
            <Grid item xs={12}>
                <SearchSortBar />
            </Grid>
            <Grid item xs={12}>
                <MapCard />
                <MapCard />
                <MapCard />
                <MapCard />
            </Grid>
            <Grid item xs={12}>
                <BottomAppBanner />
            </Grid>
        </Grid>

    )
}