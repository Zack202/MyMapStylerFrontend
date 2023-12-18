import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from './MapEditor.module.css';
import Switch from '@mui/material/Switch';
// import "@melloware/coloris/dist/coloris.css";
// import { coloris, init } from "@melloware/coloris";
import InputAdornment from '@mui/material/InputAdornment';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect , useContext} from 'react';
import dynamic from 'next/dynamic';
import ImportMapDataModal from '../../components/ImportMapDataModal';
import { GlobalStoreContext } from '../../store/index.js'




export default function MapEditor(props) {
   if (typeof window !== 'undefined') {

   const { store } = useContext(GlobalStoreContext);
   //For Color
   //const setMapColor = props.setMapColor;
   //const mapColor = props.mapColor;
   let mapColor;
   if(store.currentMap){
      mapColor = store.currentMap.mapFeatures.edits.mapColor;
   }
   else{
      mapColor = 'maroon'
   }
   
   
   let colorTimeOut = 300;

   const handleColorChange = (color) => {
      setTimeout(() => {
         store.addChangePriColorTransaction(JSON.parse(JSON.stringify(mapColor)), JSON.parse(JSON.stringify(color)));
         //setMapColor(color);
       }, colorTimeOut);
   }

   // const handleColorChange = (event) => {
   //    if(store.currentMap.mapFeatures == null ){
   //       store.addChangePriColorTransaction('maroon', event)
   //    }
   //    else{
   //       set
   //       store.addChangePriColorTransaction(store.currentMap.mapFeatures.edits.priColor, event)
   //    }
   //    console.log('handleclorchange')
   // }


   //For border Switch
   const setBorderSwitch = props.setBorderSwitch;
   const borderSwitch = props.borderSwitch;
   const handleBorderSwitchChange = (event) => {
      setBorderSwitch(event.target.checked);
   }

   //For Border Width
   const setborderWidth = props.setBorderWidth;
   const borderWidth = props.borderWidth;
   const handleBorderWidthChange = (event) => {
      const newWidth = event.target.value.trim();;
      if(newWidth === '' || !isNaN(newWidth)){
      setborderWidth(newWidth === '' ? "" : parseFloat(newWidth));
      }
   }

   //For Border Color
   const setBorderColor = props.setBorderColor;
   const borderColor = props.borderColor;
   const handleColorChangeBorders = (color) => {
      setTimeout(() => {
         setBorderColor(color);
       }, colorTimeOut);
   }

   //For Region Name Switch
   const regionNameSwitch = props.regionSwitch;
   const setRegionNameSwitch = props.setRegionSwitch;
   const handleRegionNameSwitchChange = (event) => {
      setRegionNameSwitch(event.target.checked);
   }

   //For Region Name Color
   const setRegionNameColor = props.setRegionNameColor;
   const regionNameColor = props.regionNameColor;
   const handleColorChangeRegionName = (color) => {
      setTimeout(() => {
         setRegionNameColor(color);
       }, colorTimeOut)
   }

   //For Background Color
   const setBackgroundColor = props.setBackgroundColor;
   const backgroundColor = props.backgroundColor;
   const handleColorChangeBackground = (color) => {
      setTimeout(() => {
         setBackgroundColor(color);
       }, colorTimeOut);
   }

   //For Center
   const realCenter = props.realCenter;
   const setCenter = props.setCenter;
   const center = props.center;
   const handleCenterChange = (event) => {
      setCenter(center);
   }

   //For Zoom
   const realZoom = props.realZoom;
   const setZoom = props.setZoom;
   const zoom = props.zoom;
   const handleZoomChange = (event) => {
      setZoom(zoom);
   }

   //For Radius
   const setRadius = props.setRadius;
   const radius = props.radius;
   const handleRadiusChange = (event) => {
      const newRadius = event.target.value.trim();
      if(newRadius === '' || !isNaN(newRadius)){
      setRadius(newRadius === '' ? "" : parseFloat(newRadius));
      }
   }

   //For Dot Color
   const setDotColor = props.setDotColor;
   const dotColor = props.dotColor;
   const handleColorChangeDot = (color) => {
      setTimeout(() => {
         setDotColor(color);
         }, colorTimeOut);
   }

   //For Dot Opacity
   const setDotOpacity = props.setDotOpacity;
   const dotOpacity = props.dotOpacity;
   const handleDotOpacityChange = (event) => {
      const newOpacity = event.target.value.trim();
      if(newOpacity === '' || !isNaN(newOpacity)){
      setDotOpacity(newOpacity === '' ? "" : parseFloat(newOpacity/100));
      }
   }

   const formattedLat = center[0] ? center[0].toFixed(4) : '?';
   const formattedLng = center[1] ? center[1].toFixed(4) : '?';

   const realFormattedLat = realCenter[0] ? realCenter[0].toFixed(4) : '?';
   const realFormattedLng = realCenter[1] ? realCenter[1].toFixed(4) : '?';






    const rows = [
        { color: 'red', id: 1, label: 'Soda'},
        { color: 'yellow', id: 2, label: 'Coke'},
        { color: 'blue', id: 3, label: 'Pop'},
      ];
      const columns = [
        { field: 'color', headerName: 'Colors', width: 120,
        renderCell: (params) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: params.row.color, 
                border: '1px solid black',
              }}
            ></div>
          </div>
        ),
      },
        { field: 'label', headerName: 'Labels', width: 130, editable: true},
        {
            field: 'selection',
            headerName: ' ',
            width: 50,
            renderCell: (params) => (
              <input
                type="checkbox"
                checked={params.row.isSelected}
                style={{ width: '20px', height: '20px' }}
                onChange={() => {
                  
                }}
              />
            ),
          },
        ]


    return(
      <Box item xs={12} sx={{position:"absolute", width: "25%", 
            display: "flex", flexDirection: "column", overflow: "scroll", maxHeight: "85%",}}>
         <Grid container>
            <Box className = {styles.rect_box}>
               <Box className = {styles.title_box}>
                  <Typography className= {styles.text_color} component="h1" variant="h4" style={{ textAlign: 'center' }}><b><i>Map Editor</i></b></Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Select Color:</i> { }
                  <input
                     type="color"
                     className={styles.color_box}
                     value={mapColor}
                     onChange={(e) => handleColorChange(e.target.value)}
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Show Borders:</i> { }
                  <FormControlLabel 
                  value="start"
                  control={
                  <Switch id="border" checked={borderSwitch} onChange={handleBorderSwitchChange}color="primary" />
                  }
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Border Color:</i> { }
                  <input
                     type="color"
                     className={styles.color_box}
                     value={borderColor}
                     onChange={(e) => handleColorChangeBorders(e.target.value)}
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Border Width:</i> { }
                  <TextField
                  className={styles.text_box}
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: 100 }}
                  value={borderWidth}
                  onChange={handleBorderWidthChange}
                  InputProps={{
                  endAdornment: 
                  <InputAdornment position="end">px</InputAdornment>
                  ,
                  }}
                  ></TextField>
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Show Regions Names:</i> { }
                  <FormControlLabel
                  value="start"
                  control={
                  <Switch id="toggleNames" checked={regionNameSwitch} color="primary" onChange={handleRegionNameSwitchChange}/>
                  }
                  />
               </Typography>
               </Box>
               {/* <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Region Name Colors:</i> { }
                  <input
                     type="color"
                     className={styles.color_box}
                     value={regionNameColor}
                     onChange={(e) => handleColorChangeRegionName(e.target.value)}
                  />
               </Typography>
               </Box> */}
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Background Color:</i> {}
                  <input
                     type="color"
                     className={styles.color_box}
                     value={backgroundColor}
                     onChange={(e) => handleColorChangeBackground(e.target.value)}
                  />
               </Typography>
               </Box>
               <Box className={styles.item_box}>
                  <Typography className={styles.text_color} component="h1" variant="h6">
                  <i>Center : ({formattedLat}, {formattedLng}) { }</i>
                  <Button
                     style={{ color: 'black', backgroundColor: 'white' }}
                     onClick={handleCenterChange}
                     >
                     Set
                  </Button>
                  </Typography>
               </Box>
               <i>Current Center : ({realFormattedLat}, {realFormattedLng}) </i>
               <Box className={styles.item_box}>
                  <Typography className={styles.text_color} component="h1" variant="h6">
                  <i>Zoom: ({zoom}) { }</i>
                  <Button
                     style={{ color: 'black', backgroundColor: 'white' }}
                     onClick={handleZoomChange}
                  >
                     Set
                  </Button>
                  </Typography>
               </Box>
               <i>Zoom: ({realZoom}) { }</i>
               <div> DotMapParts
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Radius:</i> { }
                  <TextField
                  className={styles.text_box}
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: 100 }}
                  value={radius}
                  onChange={handleRadiusChange}
                  InputProps={{
                  endAdornment: 
                  <InputAdornment position="end">px</InputAdornment>
                  ,
                  }}
                  ></TextField>
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Dot Color:</i> { }
                  <input
                     type="color"
                     className={styles.color_box}
                     value={dotColor}
                     onChange={(e) => handleColorChangeDot(e.target.value)}
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Dot Opacity:</i> { }
                  <TextField
                  className={styles.text_box}
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: 100 }}
                  value={dotOpacity * 100}
                  onChange={handleDotOpacityChange}
                  InputProps={{
                  endAdornment: 
                  <InputAdornment position="end">%</InputAdornment>
                  ,
                  }}
                  ></TextField>
               </Typography>
               </Box>
               </div>
               <div style={{ display: 'flex', justifyContent: 'center', padding: '10px'}}>
               <ImportMapDataModal />
               </div>
               <div style={{ height: '30px', overflowY: 'auto' }}>
               </div>
               <div style={{margin: '10px', background: "darkgrey", padding: "10px", margin: "-10px"}}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  Legend: { }
                  <FormControlLabel
                  value="start"
                  control={
                  <Switch color="primary" />
                  }
                  />
                  <TextField
                  className={styles.text_box}
                  id="outlined-size-small"
                  variant="standard"
                  size="small"
                  defaultValue={"Legend"}
                  label={"Enter Legend Name"}
                  sx={{ width: 260, borderRadius: 1, marginBottom: '5px'}}>
                  
                     
                  </TextField>

            </Typography>
            
            <Box   backgroundColor="white" borderRadius={'5px'}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  editable
                  disableColumnMenu
                  hideFooterPagination
                  disableSelectionOnClick
                  />
            </Box>
            </div>
            </Box>

         </Grid>
         </Box>
    );
               }else{
                     return null;
               }
}