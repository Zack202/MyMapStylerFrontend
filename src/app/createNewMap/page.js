'use client'
import React, { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import { Grid, Box, TextField } from "@mui/material";
import * as tj from "@mapbox/togeojson";
import { file } from '@babel/types';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TopAppBanner from '../Utils/TopAppBanner';
import BottomAppBanner from '../Utils/BottomAppBanner';
import AuthContext from '../auth';
import { useRouter } from 'next/navigation';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import MUIErrorModal from '../components/MUIErrorModal';


const shp = require('shpjs');

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 500,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '5px'
};


const defaultTheme = createTheme({
    palette: {
      background: {
        paper: '#fff',
      },
      primary: {
        main: '#990000'
      },
      secondary: {
        main: '#800000'
      },
    }
  },);

export default function CreateMapModal() {
    const { auth } = useContext(AuthContext);
    if (typeof window !== 'undefined') {
        // if (!auth.loggedIn) {
        //     const router = useRouter();
        //     router.push('/login');
        //   }
    }

    const [mapType, setMapType] = React.useState('');
    const handleChange = (event) => {
        setMapType(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

    const [mapName, setMapName] = React.useState('');
    const handleNameChange = (event) => {
        setMapName(event.target.value);
    }

    const [mapDesc, setMapDesc] = React.useState('');
    const handleDescChange = (event) => {
        setMapDesc(event.target.value);
    }

    //code here for if user is on home screen or map browsing screen
    //const openCreateMapModal = () => {setOpen(true)};
    const { store } = useContext(GlobalStoreContext);

    const [mapData, setMapData] = useState(null);
    const [validFileMessage, setValidFileMessage] = useState("Waiting for file")
    const [ext, setExt] = useState("");
    var shapefile = require("shapefile");

    const correctTypes = ['kml', 'json', 'zip', 'shp'];

    const handleFileChange = async (event) => { // Handle file input, here is where to add other file types
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            try {

                const name = selectedFile.name;
                const lastDot = name.lastIndexOf(".");
                const fileExt = name.substring(lastDot + 1);
                setExt(name.substring(lastDot + 1));

                if (correctTypes.includes(fileExt)) {
                    setValidFileMessage("It is a valid file")
                } else {
                    setValidFileMessage("It is NOT a valid file")
                }
                const fileContent = await selectedFile.text();

                if (fileExt === "kml") {
                    console.log("kml was recognized");
                    const xmldom = new DOMParser().parseFromString(fileContent, "text/xml"); // create xml dom object
                    const kmlToGJ = tj.kml(xmldom); // convert xml dom to geojson
                    setMapData(kmlToGJ);


                } else if (fileExt === "zip") {
                    var reader = new FileReader();
                    reader.readAsArrayBuffer(selectedFile);
                    reader.onload = function (buffer) {
                        console.log("loading in progress", selectedFile.name)
                        async function convert(data) {
                            console.log("converting to shp")
                            const response = await shp(data);
                            console.log("2nd step")
                            setMapData(response);
                            console.log(response);
                        }

                        convert(buffer.target.result);
                    }
                } else if (fileExt === "shp") {
                    console.log("shp was recognized");
                    await selectedFile.arrayBuffer().then(async function (buffer) { // convert to ArrayBuffer
                        var feature = await shapefile.read(buffer); // convert buffer to geoJson
                        setMapData(feature); // set to geoJson
                    });

                } else {


                    // Parse JSON file
                    const parsedData = JSON.parse(fileContent);
                    setMapData(parsedData);
                }


            } catch (error) {
                setValidFileMessage('Error with file', error);
                console.log(error);
            }
        }
    };

    const handleCreateMap = (event) => {
        console.log(mapType)
        store.createNewMap(mapName, mapData, mapType, mapDesc)
    };

    return (
        <div>
            <Grid container sx={{maxHeight: "80%"}}>
                
            <Grid item xs={12}>
                <TopAppBanner  link={"/home"}/>
            </Grid>

            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
            <Grid item xs={12} >
                <Grid container>
                <Box sx={{width: 'auto', marginLeft: 'auto', marginRight: 'auto', marginTop: 4}}>

                <div className="modal-dialog">
                    <Grid item xs={12} align="center">
                    <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                        Import a map in the format of GeoJSon, Shapefile or KML:
                     </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        
                        <Box sx={{marginTop: 1, marginBottom: 5, position: "absolute"}}>
                        <div id="middle-container">
                            <input type="file" accept=".zip, .json, .kml" id="import-map-button" onChange={handleFileChange} />
                        </div>
                        </Box>

                    </Grid>
                    <Box sx={{display: "block", marginTop: 5}}>
                        {/* <Typography sx={{fontSize: "22pt", paddingRight: 2}}>Map Name: </Typography> */}
                    <TextField
                        name="MapName"
                        fullWidth
                        required
                        label="Map Name"
                        sx={{paddingBottom: 3}}
                        onChange={handleNameChange}
                    />
                    <p></p>
                    
                    {/* <Typography sx={{fontSize: "22pt", paddingRight: 2}}>Description: </Typography> */}
                    <TextField
                        name="Description"
                        fullWidth
                        required
                        label="Description"
                        multiline
                        onChange={handleDescChange}
                    />

                    </Box>
                    <Grid item xs={12}>
                        <Box sx={{marginTop: 5}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Map Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={mapType}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={5}>Color Categorized Map</MenuItem>
                                <MenuItem value={1}>Textual Map</MenuItem>
                                <MenuItem value={4}>Choropleth Map</MenuItem>
                                <MenuItem value={3}>Dot Map</MenuItem>
                                <MenuItem value={2}>Sized Dot Map</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                   
                    <Grid item xs={12}>
                    <div id="confirm-cancel-container">
                        <Button
                            id="dialog-yes-button"
                            className="modal-button"
                            color="primary"
                            variant="contained"
                            sx={{marginRight: 1}}
                            onClick={handleCreateMap}
                        >
                            Create Map
                            </Button>
                        <Button
                            id="dialog-no-button"
                            color="primary"
                            variant="contained"
                            sx={{marginRight: 5, marginLeft: 1}}
                            href="home"
                            className="modal-button"
                        >Cancel</Button>
                    </div>
                    </Grid>
                </div>
                </Box>
                </Grid>
                
                </Grid>
                </ThemeProvider>
                <Grid item xs={12}>
                    <BottomAppBanner />
                </Grid>
            </Grid>
            <MUIErrorModal />
        </div>

    );
}