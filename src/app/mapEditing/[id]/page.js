'use client'
import { Edit } from '@mui/icons-material';
import styles from './MapEditingScreen.module.css';
import MapEditor from './MapEditor';
import TopAppBanner from '../../Utils/TopAppBanner';
import BottomAppBanner from '../../Utils/BottomAppBanner';
import EditToolbar from './EditToolbar';
import Leafletmap from './Leafletmap';
import { Grid } from '@mui/material';
import AuthContext from '../../auth';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { GlobalStoreContext } from '../../store/index.js'
import customA from './customA.geo.json'

export default function MapEditingScreen() {
    // const { auth } = useContext(AuthContext);

    // if (!auth.loggedIn) {
    //     const router = useRouter();
    //     router.push('/login');
    //   }

    const { store } = useContext(GlobalStoreContext);
    let mapData;
    if (store.currentMap == null){
        mapData = customA
    }
    else {
        mapData = store.currentMap.mapGeometry
    }
    let mapName = null;
    let mapColor;
    if (typeof window !== 'undefined') {
        if (store.currentMap != null && store.currentMap.name != null){
            mapName = store.currentMap.name
        }
        if (store.currentMap != null && store.currentMap.mapFeatures != null){
            mapColor = store.currentMap.mapFeatures.priColor
        }
        else {
            mapColor = 'maroon'
        }
    return(
        <div className={styles.container}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <TopAppBanner />
                </Grid>
                <Grid item xs={3}>
                    <MapEditor />
                </Grid>
                <Grid item xs={9}>
                    <EditToolbar name={mapName}/>
                    <Leafletmap 
                        mapGeo={mapData}
                        mapColor={mapColor}
                    />
                </Grid>
            </Grid>
            <BottomAppBanner />
        </div>
    )
    }else{
        return null
    }
};