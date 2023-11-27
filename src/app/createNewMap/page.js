'use client'
import React, { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import { Grid, Box } from "@mui/material";
import * as tj from "@mapbox/togeojson";
import { file } from '@babel/types';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'; 
import TopAppBanner from '../Utils/TopAppBanner';
import BottomAppBanner from '../Utils/BottomAppBanner';
<<<<<<< Updated upstream
=======
import AuthContext from '../auth';
>>>>>>> Stashed changes

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

export default function CreateMapModal() {
    const [mapType, setMapType] = React.useState('');
    const handleChange = (event) => {
        setMapType(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

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
        store.createNewMap('name', mapData, mapType)
        store.loadIdNamePairs();
    };

    return (
        <div>
            <TopAppBanner/>
            <Grid container sx ={style} spacing={2}>
                <div className="modal-dialog">
                    <header className="dialog-header">
                        Import a map in the format of GeoJSon, SHapefile or KML:
                    </header>

                    <div id="middle-container">
                        <input type="file" accept="" id="import-map-button" onChange={handleFileChange} />
                    </div>
                    <Box sx={{ minWidth: 120, marginTop: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Map Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={mapType}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>Color Categorized Map</MenuItem>
                                    <MenuItem value={1}>Textual Map</MenuItem>
                                    <MenuItem value={2}>Heat Map</MenuItem>
                                    <MenuItem value={3}>Dot Map</MenuItem>
                                    <MenuItem value={4}>Sized Dot Map</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                    <div id="confirm-cancel-container">
                        <button
                            id="dialog-yes-button"
                            className="modal-button"
                            onClick={handleCreateMap}
                        >Create Map</button>
                        <button
                            id="dialog-no-button"
                            className="modal-button"
                        >Cancel</button>
                    </div>
                </div>
                </Grid>
                <BottomAppBanner/>
        </div>
    );
}