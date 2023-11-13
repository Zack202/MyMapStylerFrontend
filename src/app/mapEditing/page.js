'use client'
import { Edit } from '@mui/icons-material';
import styles from './MapEditingScreen.module.css';
import MapEditor from './MapEditor';
import TopAppBanner from './TopAppBanner';
import BottomAppBanner from './BottomAppBanner';
import EditToolbar from './EditToolbar';
import Leafletmap from './Leafletmap';
import { Grid } from '@mui/material';

export default function MapEditingScreen() {
    return(
        <div className={styles.container}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <TopAppBanner />
                </Grid>
                <Grid item xs={2}>
                    <MapEditor />
                </Grid>
                <Grid item xs={10}>
                    <EditToolbar />
                    <Leafletmap />
                </Grid>
            </Grid>
            <BottomAppBanner />
        </div>
    )
}