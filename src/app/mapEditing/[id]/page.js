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
import { useState } from 'react';


export default function MapEditingScreen() {
    const { store } = useContext(GlobalStoreContext);

    //State varibles for the map
    const [borderSwitch, setBorderSwitch] = useState(() => store.currentMap.mapFeatures.edits?.borderSwitch || true);
    const [borderWidth, setBorderWidth] = useState(() => store.currentMap.mapFeatures.edits?.borderWidth || 2);
    const [borderColor, setBorderColor] = useState(() => store.currentMap.mapFeatures.edits?.borderColor || "black");
    const [regionSwitch, setRegionSwitch] = useState(() => store.currentMap.mapFeatures.edits?.regionSwitch || false);
    const [regionNameColor, setRegionNameColor] = useState(() => store.currentMap.mapFeatures.edits?.regionNameColor || "red");
    const [backgroundColor, setBackgroundColor] = useState(() => store.currentMap.mapFeatures.edits?.backgroundColor || "white");
    const [tempCenter, setTempCenter] = useState(() => store.currentMap.mapFeatures.edits?.center || [0, 0]);
    const [center, setCenter] = useState(() => store.currentMap.mapFeatures.edits?.center || [0, 0]);
    const [tempZoom, setTempZoom] = useState(() => store.currentMap.mapFeatures.edits?.zoom || 1);
    const [zoom, setZoom] = useState(() => store.currentMap.mapFeatures.edits?.zoom || 1);



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
            mapColor = store.currentMap.mapFeatures.edits.priColor
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
                    <MapEditor 
                    setBorderSwitch={setBorderSwitch}
                    borderSwitch={borderSwitch}

                    setBorderWidth={setBorderWidth}
                    borderWidth={borderWidth}

                    setBorderColor={setBorderColor}
                    borderColor={borderColor}

                    setRegionSwitch={setRegionSwitch}
                    regionSwitch={regionSwitch}
                    
                    setRegionNameColor={setRegionNameColor}
                    regionNameColor = {regionNameColor}

                    setBackgroundColor={setBackgroundColor}
                    backgroundColor={backgroundColor}

                    setCenter={setCenter}
                    center={tempCenter}
                    realCenter={center}

                    setZoom={setZoom}
                    zoom={tempZoom}
                    realZoom={zoom}
                    />
                </Grid>
                <Grid item xs={9}>
                    <EditToolbar name={mapName}
                                            borderSwitch={borderSwitch}
                                            borderWidth={borderWidth}
                                            borderColor={borderColor}
                                            regionSwitch={regionSwitch}
                                            regionNameColor={regionNameColor}
                                            backgroundColor={backgroundColor}
                                            center={center}
                                            zoom={zoom}

                    />
                    <Leafletmap 
                        mapGeo={mapData}
                        borderSwitch={borderSwitch}
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                        regionSwitch={regionSwitch}
                        regionNameColor={regionNameColor}
                        backgroundColor={backgroundColor}
                        center={center}
                        zoom={zoom}
                        setTempCenter={setTempCenter}
                        setTempZoom={setTempZoom}
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