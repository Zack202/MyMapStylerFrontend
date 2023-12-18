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
import AddCustomDataProps from './AddCustomDataProps';


export default function MapEditingScreen() {
    const { store } = useContext(GlobalStoreContext);

    const defaultValues = {
        borderSwitch: true,
        borderWidth: 2,
        borderColor: "black",
        regionSwitch: false,
        regionNameColor: "red",
        backgroundColor: "white",
        tempCenter: [0, 0],
        center: [0, 0],
        tempZoom: 1,
        zoom: 1,
        mapColor: "maroon",
        radius: 5,
        dotColor: "black",
        dotOpacity: 1,
        regionNameTextSize: 10,
        lowColorChoro: "#FFFFFF",
        highColorChoro: "#000000",
        levelsChoro: 2,
        legendColors: ["#FFFFFF", "#000000"],
        legendValues: ['', ''],
        legendName: 'Legend',
      };
      
      /*const [borderSwitch, setBorderSwitch] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.borderSwitch ?? defaultValues.borderSwitch) : defaultValues.borderSwitch
      );
      const [borderWidth, setBorderWidth] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.borderWidth ?? defaultValues.borderWidth) : defaultValues.borderWidth
      );
      const [borderColor, setBorderColor] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.borderColor ?? defaultValues.borderColor) : defaultValues.borderColor
      );
      */
      const [regionSwitch, setRegionSwitch] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.regionSwitch ?? defaultValues.regionSwitch) : defaultValues.regionSwitch
      );
      const [regionNameColor, setRegionNameColor] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.regionNameColor ?? defaultValues.regionNameColor) : defaultValues.regionNameColor
      );
      const [regionNameTextSize, setRegionNameTextSize] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.regionNameTextSize ?? defaultValues.regionNameTextSize) : defaultValues.regionNameTextSize
      );
      const [backgroundColor, setBackgroundColor] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.backgroundColor ?? defaultValues.backgroundColor) : defaultValues.backgroundColor
      );
      const [tempCenter, setTempCenter] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.center ?? defaultValues.tempCenter) : defaultValues.tempCenter
      );
      const [center, setCenter] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.center ?? defaultValues.center) : defaultValues.center
      );
      const [tempZoom, setTempZoom] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.zoom ?? defaultValues.tempZoom) : defaultValues.tempZoom
      );
      const [zoom, setZoom] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.zoom ?? defaultValues.zoom) : defaultValues.zoom
      );

      /*const [mapColor, setMapColor] = useState(() =>
        //store.currentMap ? (store.currentMap.mapFeatures.edits?.mapColor ?? defaultValues.mapColor) : defaultValues.mapColor
        //store.edits ? (store.edits?.mapColor ?? defaultValues.mapColor) : defaultValues.mapColor
        store.edits ? (store.edits?.mapColor ?? defaultValues.mapColor) : defaultValues.mapColor
        );*/

      const [radius, setRadius] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.radius ?? defaultValues.radius) : defaultValues.radius
      );
      const [dotColor, setDotColor] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.dotColor ?? defaultValues.dotColor) : defaultValues.dotColor
      );
      const [dotOpacity, setDotOpacity] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.dotOpacity ?? defaultValues.dotOpacity) : defaultValues.dotOpacity
      );
      const [cursorModes, setCursorModes] = useState('');


      const [colorRegion, setColorRegion] = useState("#000000");

      const [selectedValue, setSelectedValue] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.selectedValue ?? "") : ""
      );

      const [lowColorChoro, setLowColorChoro] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.lowColorChoro ?? defaultValues.lowColorChoro) : defaultValues.lowColorChoro
      );

      const [highColorChoro, setHighColorChoro] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.highColorChoro ?? defaultValues.highColorChoro) : defaultValues.highColorChoro
      );

      const [levelsChoro, setLevelsChoro] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.levelsChoro ?? defaultValues.levelsChoro) : defaultValues.levelsChoro
      );

      const [legendColors, setLegendColors] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.legendColors ?? defaultValues.legendColors) : defaultValues.legendColors
      );

      const [legendValues, setLegendValues] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.legendValues ?? defaultValues.legendValues) : defaultValues.legendValues
      );

      const [legendOn, setLegendOn] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.legendOn ?? defaultValues.legendOn) : defaultValues.legendOn
      );

      const [legendName, setLegendName] = useState(() =>
        store.currentMap ? (store.currentMap.mapFeatures.edits?.legendName ?? defaultValues.legendName) : defaultValues.legendName
      );


    let mapData;
    if (store.currentMap == null){
        mapData = customA
    }
    else {
        mapData = store.currentMap.mapGeometry
    }
    let mapName = null;
    if (typeof window !== 'undefined') {
        if (store.currentMap != null && store.currentMap.name != null){
            mapName = store.currentMap.name
        }
    return(
        <div className={styles.container}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <TopAppBanner link={"/home"}/>
                </Grid>
                <Grid item xs={3}>
                    <MapEditor 
                    /*setMapColor={setMapColor}
                    mapColor={mapColor}

                    setBorderSwitch={setBorderSwitch}
                    borderSwitch={borderSwitch}

                    setBorderWidth={setBorderWidth}
                    borderWidth={borderWidth}

                    setBorderColor={setBorderColor}
                    borderColor={borderColor}*/

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

                    setRadius={setRadius}
                    radius={radius}

                    setDotColor={setDotColor}
                    dotColor={dotColor}

                    setDotOpacity={setDotOpacity}
                    dotOpacity={dotOpacity}

                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}

                    setRegionNameTextSize={setRegionNameTextSize}
                    regionNameTextSize={regionNameTextSize}

                    //For choropleth map
                    setLowColorChoro={setLowColorChoro}
                    lowColorChoro={lowColorChoro}

                    setHighColorChoro={setHighColorChoro}
                    highColorChoro={highColorChoro}
                    
                    setLevelsChoro={setLevelsChoro}
                    levelsChoro={levelsChoro}

                    setLegendColors={setLegendColors}
                    legendColors={legendColors}

                    setLegendValues={setLegendValues}
                    legendValues={legendValues}
                    //For choropleth map

                    setLegendOn={setLegendOn}
                    legendOn={legendOn}

                    setLegendName={setLegendName}
                    legendName={legendName}



                    />
                </Grid>
                <Grid item xs={7}>
                    <EditToolbar name={mapName}
                                            /*mapColor={mapColor}
                                            borderSwitch={borderSwitch}
                                            borderWidth={borderWidth}
                                            borderColor={borderColor}
                                            */
                                            regionSwitch={regionSwitch}
                                            regionNameColor={regionNameColor}
                                            backgroundColor={backgroundColor}
                                            center={center}
                                            zoom={zoom}
                                            radius={radius}
                                            dotColor={dotColor}
                                            dotOpacity={dotOpacity}
                                            cursorModes={cursorModes}
                                            setCursorModes={setCursorModes}
                                            colorRegion={colorRegion}
                                            setColorRegion={setColorRegion}
                                            regionNameTextSize={regionNameTextSize}
                                            selectedValue={selectedValue}

                                            //For choropleth map
                                            lowColorChoro={lowColorChoro}
                                            highColorChoro={highColorChoro}
                                            levelsChoro={levelsChoro}
                                            legendColors={legendColors}
                                            legendValues={legendValues}
                                            //For choropleth map

                                            legendOn={legendOn}
                                            legendName={legendName}





                    />
                    <Leafletmap 
                        mapGeo={mapData}
                        //borderSwitch={borderSwitch}
                        //borderWidth={borderWidth}
                        //borderColor={borderColor}
                        regionSwitch={regionSwitch}
                        regionNameColor={regionNameColor}
                        backgroundColor={backgroundColor}
                        center={center}
                        zoom={zoom}
                        setTempCenter={setTempCenter}
                        setTempZoom={setTempZoom}
                        //mapColor={mapColor}
                        radius={radius}
                        dotColor={dotColor}
                        dotOpacity={dotOpacity}
                        cursorModes={cursorModes}
                        colorRegion={colorRegion}
                        selectedValue={selectedValue}
                        regionNameTextSize={regionNameTextSize}

                        //For choropleth map
                        lowColorChoro={lowColorChoro}
                        highColorChoro={highColorChoro}
                        levelsChoro={levelsChoro}
                        legendColors={legendColors}
                        legendValues={legendValues}
                        //For choropleth map

                        legendOn={legendOn}
                        legendName={legendName}

                    />
                </Grid>
                <Grid item xs={2}>
                    <AddCustomDataProps 
                    cursorModes={cursorModes}
                    setCursorModes={setCursorModes}
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