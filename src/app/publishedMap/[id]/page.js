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
import { useState } from 'react';
import { usePathname } from 'next/navigation';

//import "leaflet/dist/leaflet.css"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Leafletmap from '../../mapEditing/[id]/Leafletmap.js';

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
    const pathname = usePathname()
    useEffect(() => {
      const mapIdFromURL = pathname.split('/').pop();
      if (mapIdFromURL) {
      store.setCurrentMap(mapIdFromURL);
      }
    }, [pathname]);
    const { auth } = useContext(AuthContext);

    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
      if(auth.user){
          if(auth.user.userName === "GUEST"){
              setIsGuest(true);
          }
      }
  }, [auth]);

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
    legendOn: false,
  };

  
  const borderSwitch = store.currentMap ? (store.currentMap.mapFeatures.edits?.borderSwitch ?? defaultValues.borderSwitch) : defaultValues.borderSwitch
  const borderWidth = store.currentMap ? (store.currentMap.mapFeatures.edits?.borderWidth ?? defaultValues.borderWidth) : defaultValues.borderWidth
  const borderColor = store.currentMap ? (store.currentMap.mapFeatures.edits?.borderColor ?? defaultValues.borderColor) : defaultValues.borderColor
  const regionSwitch = store.currentMap ? (store.currentMap.mapFeatures.edits?.regionSwitch ?? defaultValues.regionSwitch) : defaultValues.regionSwitch
  const regionNameColor = store.currentMap ? (store.currentMap.mapFeatures.edits?.regionNameColor ?? defaultValues.regionNameColor) : defaultValues.regionNameColor
  const backgroundColor = store.currentMap ? (store.currentMap.mapFeatures.edits?.backgroundColor ?? defaultValues.backgroundColor) : defaultValues.backgroundColor
  const regionNameTextSize = store.currentMap ? (store.currentMap.mapFeatures.edits?.regionNameTextSize ?? defaultValues.regionNameTextSize) : defaultValues.regionNameTextSize

  // Is good like this
  const [tempCenter, setTempCenter] = useState(() =>
    store.currentMap ? (store.currentMap.mapFeatures.edits?.center ?? defaultValues.tempCenter) : defaultValues.tempCenter
  );
  const center = store.currentMap ? (store.currentMap.mapFeatures.edits?.center ?? defaultValues.center) : defaultValues.center
  // Is good like this
  const [tempZoom, setTempZoom] = useState(() =>
    store.currentMap ? (store.currentMap.mapFeatures.edits?.zoom ?? defaultValues.tempZoom) : defaultValues.tempZoom
  );
  const zoom = store.currentMap ? (store.currentMap.mapFeatures.edits?.zoom ?? defaultValues.zoom) : defaultValues.zoom
  const mapColor = store.currentMap ? (store.currentMap.mapFeatures.edits?.mapColor ?? defaultValues.mapColor) : defaultValues.mapColor
  const radius = store.currentMap ? (store.currentMap.mapFeatures.edits?.radius ?? defaultValues.radius) : defaultValues.radius
  const dotColor = store.currentMap ? (store.currentMap.mapFeatures.edits?.dotColor ?? defaultValues.dotColor) : defaultValues.dotColor
  const dotOpacity = store.currentMap ? (store.currentMap.mapFeatures.edits?.dotOpacity ?? defaultValues.dotOpacity) : defaultValues.dotOpacity
 

  // good as a state
  const [cursorModes, setCursorModes] = useState('');

  // good as a state??
  const [colorRegion, setColorRegion] = useState("#000000");

  const selectedValue = store.currentMap ? (store.currentMap.mapFeatures.edits?.selectedValue ?? "") : ""
  const regionNameToDisplay = store.currentMap ? (store.currentMap.mapFeatures.edits?.regionNameToDisplay ?? "") : ""
  const lowColorChoro = store.currentMap ? (store.currentMap.mapFeatures.edits?.lowColorChoro ?? defaultValues.lowColorChoro) : defaultValues.lowColorChoro
  const highColorChoro = store.currentMap ? (store.currentMap.mapFeatures.edits?.highColorChoro ?? defaultValues.highColorChoro) : defaultValues.highColorChoro
  const levelsChoro = store.currentMap ? (store.currentMap.mapFeatures.edits?.levelsChoro ?? defaultValues.levelsChoro) : defaultValues.levelsChoro
  const legendColors = store.currentMap ? (store.currentMap.mapFeatures.edits?.legendColors ?? defaultValues.legendColors) : defaultValues.legendColors
  const legendValues = store.currentMap ? (store.currentMap.mapFeatures.edits?.legendValues ?? defaultValues.legendValues) : defaultValues.legendValues
  const legendOn = store.currentMap ? (store.currentMap.mapFeatures.edits?.legendOn ?? defaultValues.legendOn) : defaultValues.legendOn
  const legendName = store.currentMap ? (store.currentMap.mapFeatures.edits?.legendName ?? defaultValues.legendName) : defaultValues.legendName
  const ttDirection = store.currentMap ? (store.currentMap.mapFeatures.edits?.ttDirection ?? defaultValues.ttDirection) : defaultValues.ttDirection

      let description = "No description provided"
      if (store.currentMap != null){
        if (store.currentMap.description != null) {
            description = store.currentMap.description ? store.currentMap.description : "No description provided"
          }
      }
    if (typeof window !== 'undefined') {
        let mapName = ""
        if (store.currentMap != null && store.currentMap.name != null){
            mapName = store.currentMap.name
        }
        let mapData;
        if (store.currentMap == null){
        }
        else {
            mapData = store.currentMap.mapGeometry
        }
    return(   
        <div>
        <div>
        <Grid item xs={12}>
            <TopAppBanner link={"/browser"}/>
        </Grid>
        </div>
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container  style={{ marginTop: '20px' }}>
        <Box
                        sx={{
                            width: '100%',
                            height: '100%',
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

                            <Box sx={{ gridArea: 'map', bgcolor: '#f2b8b8' }}>
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
                                radius={radius}
                                dotColor={dotColor}
                                dotOpacity={dotOpacity}
                                cursorModes={cursorModes}
                                colorRegion={colorRegion}
                                regionNameToDisplay={regionNameToDisplay}
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
                
                                ttDirection={ttDirection}
                                mapName={mapName}
                
                            />
                            </Box>
                            <Box sx={{ gridArea: 'comments', bgcolor: '#800000'}}>Comments
                                <CommentSection isGuest={isGuest}/>
                            </Box>
                            <Box sx={{ gridArea: 'describe', bgcolor: '#800000' }}>
                            <Typography variant="h6" color="white">
                              <h4>Description</h4>
                              </Typography>
                            <Typography variant="h7" color="white" paragraph>
                            {description}
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