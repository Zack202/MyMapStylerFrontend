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
import { useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import ImportMapDataModal from '../../components/ImportMapDataModal';
import { GlobalStoreContext } from '../../store/index.js'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import chroma from 'chroma-js';
import { useRef } from 'react';
import { useCallback } from 'react';
import { IconButton  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';





export default function MapEditor(props) {
   if (typeof window !== 'undefined') {

      const { store } = useContext(GlobalStoreContext);


      //For Color
      //const setMapColor = props.setMapColor;
      const mapColor = props.mapColor;
      let colorTimeOut = 300;
      const handleColorChange = (color) => {
         setTimeout(() => {
            //store.addChangePriColorTransaction(mapColor, color);
            //setMapColor(color);
            let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
            let newEdits = JSON.parse(JSON.stringify(oldEdits));
            newEdits.mapColor = color;
            store.addMapFeaturesEditsTransaction(oldEdits, newEdits)
         }, colorTimeOut);
      }

      //For border Switch
      //const setBorderSwitch = props.setBorderSwitch;
      const borderSwitch = props.borderSwitch;
      const handleBorderSwitchChange = (event) => {
         //setBorderSwitch(event.target.checked);
         console.log(event.target.checked)
         let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
         let newEdits = JSON.parse(JSON.stringify(oldEdits));
         newEdits.borderSwitch = event.target.checked;
         store.addMapFeaturesEditsTransaction(oldEdits, newEdits)
      }

      //For Border Color
      //const setBorderColor = props.setBorderColor;
      const borderColor = props.borderColor;
      const handleColorChangeBorders = (color) => {
         setTimeout(() => {
            //setBorderColor(color);
            let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
            let newEdits = JSON.parse(JSON.stringify(oldEdits));
            newEdits.borderColor = color;
            store.addMapFeaturesEditsTransaction(oldEdits, newEdits)
         }, colorTimeOut);
      }

      //For Border Width
      //const setborderWidth = props.setBorderWidth;
      const borderWidth = props.borderWidth;
      const handleBorderWidthChange = (event) => {
         const newWidth = event.target.value.trim();;
         if (newWidth === '' || !isNaN(newWidth)) {
            //setborderWidth(newWidth === '' ? "" : parseFloat(newWidth));
            let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
            let newEdits = JSON.parse(JSON.stringify(oldEdits));
            newEdits.borderWidth = newWidth === '' ? "" : parseFloat(newWidth);
            store.addMapFeaturesEditsTransaction(oldEdits, newEdits)
         }
      }

      //For Region Name Switch
      const regionNameSwitch = props.regionSwitch;
      //const setRegionNameSwitch = props.setRegionSwitch;
      const handleRegionNameSwitchChange = (event) => {
         //setRegionNameSwitch(event.target.checked);

         let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
         let newEdits = JSON.parse(JSON.stringify(oldEdits));
         newEdits.regionSwitch = event.target.checked;
         store.addMapFeaturesEditsTransaction(oldEdits, newEdits)
      }

      const ttDirection = props.ttDirection;
      const setTtDirection = props.setTtDirection;
      const handleTtDirectionChange = (event) => {
         //dropdown
         setTtDirection(event.target.value);
         //add temp fix here when doing undo redo
      }

      //For Region Name Color
      //const setRegionNameColor = props.setRegionNameColor;
      const regionNameColor = props.regionNameColor;
      const handleColorChangeRegionName = (color) => {
         setTimeout(() => {
            //setRegionNameColor(color);
            let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
            let newEdits = JSON.parse(JSON.stringify(oldEdits));
            newEdits.regionNameColor = color;
            store.addMapFeaturesEditsTransaction(oldEdits, newEdits)

            //temp fix: doesn't work with undo/redo
            newEdits.regionSwitch = false;
            store.editMapAttributes(newEdits);
            setTimeout(() => {
               newEdits.regionSwitch = true;
               store.editMapAttributes(newEdits);
            }, 25);


         }, colorTimeOut)
         /*setRegionNameSwitch(false); //temp fix for region name switch not updating
         setTimeout(() => {
            setRegionNameSwitch(true);
          }, 25);*/
      }

      //text size doesn't save, look into later , need to change store index and map controller 
      const regionNameTextSize = props.regionNameTextSize;
      const setRegionNameTextSize = props.setRegionNameTextSize;
      const handleRegionNameTextSizeChange = (event) => {
         const newTextSize = event.target.value.trim();
         if (newTextSize === '' || !isNaN(newTextSize)) {
           setRegionNameTextSize(newTextSize === '' ? "" : parseFloat(newTextSize));
           /* let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
            let newEdits = JSON.parse(JSON.stringify(oldEdits));
            newEdits.regionNameTextSize = newTextSize === '' ? "" : parseFloat(newTextSize);
            store.addMapFeaturesEditsTransaction(oldEdits, newEdits)*/
         }
         /*setRegionNameSwitch(false); //temp fix for region name switch not updating
         setTimeout(() => {
            setRegionNameSwitch(true);
          }, 25);*/
         //temp fix 
         let newEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
         newEdits.regionSwitch = false;
         store.editMapAttributes(newEdits);
         setTimeout(() => {
            newEdits.regionSwitch = true;
            store.editMapAttributes(newEdits);
         }, 25);
      }

      //For Background Color
      //const setBackgroundColor = props.setBackgroundColor;
      const backgroundColor = props.backgroundColor;
      const handleColorChangeBackground = (color) => {
         setTimeout(() => {
            //setBackgroundColor(color);
            let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
            let newEdits = JSON.parse(JSON.stringify(oldEdits));
            newEdits.backgroundColor = color;
            store.addMapFeaturesEditsTransaction(oldEdits, newEdits)
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
      //const setRadius = props.setRadius;
      let radius = props.radius;
      const handleRadiusChange = (event) => {
         const newRadius = event.target.value.trim();
         let parsedRadius = parseInt(newRadius);
       
         if (newRadius === '' || (!isNaN(parsedRadius) && parsedRadius >= 0)) {
           let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
           let newEdits = JSON.parse(JSON.stringify(oldEdits));
       
           newEdits.radius = newRadius === '' ? 0 : parsedRadius;
           store.addMapFeaturesEditsTransaction(oldEdits, newEdits);
         }
       };

      //For Dot Color
      //const setDotColor = props.setDotColor;
      const dotColor = props.dotColor;
      const handleColorChangeDot = (color) => {
         setTimeout(() => {
            //setDotColor(color);
            let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
            let newEdits = JSON.parse(JSON.stringify(oldEdits));
            newEdits.dotColor = color;
            store.addMapFeaturesEditsTransaction(oldEdits, newEdits);
         }, colorTimeOut);
      }

      //For Dot Opacity
      //const setDotOpacity = props.setDotOpacity;
      const dotOpacity = props.dotOpacity;
      const handleDotOpacityChange = (event) => {
         const newOpacity = event.target.value.trim();
         if (newOpacity === '' || !isNaN(newOpacity)) {
            //setDotOpacity(newOpacity === '' ? "" : parseFloat(newOpacity / 100));
            let oldEdits = JSON.parse(JSON.stringify(store.currentMap.mapFeatures.edits));
            let newEdits = JSON.parse(JSON.stringify(oldEdits));
            newEdits.dotOpacity = newOpacity === '' ? "" : parseFloat(newOpacity / 100);
            store.addMapFeaturesEditsTransaction(oldEdits, newEdits);
         }
      }

      //For Cursor Modes
      const cursorModes = props.cursorModes;

      //FOR CHOROPLETH ____________________________________________________________
      //For Choropleth Low Color
      const setLowColorChoro = props.setLowColorChoro;
      const lowColorChoro = props.lowColorChoro;
      const handleColorChangeLowChoro = (color) => {
         setTimeout(() => {
            setLowColorChoro(color);
         }, colorTimeOut);
      }

         //For Choropleth Low Color
         const setHighColorChoro = props.setHighColorChoro;
         const highColorChoro = props.highColorChoro;
         const handleColorChangeHighChoro = (color) => {
            setTimeout(() => {
               setHighColorChoro(color);
            }, colorTimeOut);
         }

   //For Legend Colors
   const setLegendColors = props.setLegendColors;
   const legendColors = props.legendColors;

   //For Legend Values
   const setLegendValues = props.setLegendValues;
   const legendValues = props.legendValues;

   //Legend Creation
   const handleAddRow = () => {
      //Just add new legend value and color to the end of the list
      const updatedLegendValues = [...legendValues, ''];
      const updatedLegendColors = [...legendColors, '#000000'];
      setLegendValues(updatedLegendValues);
      setLegendColors(updatedLegendColors);

      const updatedRows = updatedLegendValues.map((value, index) => ({
         id: index + 1,
         color: updatedLegendColors[index],
         label: value || '',
       }))
       setRows(updatedRows)
   }

   const handleDeleteRow = (id) => {
      //Just delete the legend value and color from the list
      const index = id - 1;
      const updatedLegendValues = legendValues.filter((value, i) => i !== index);
      const updatedLegendColors = legendColors.filter((value, i) => i !== index);
      setLegendValues(updatedLegendValues);
      setLegendColors(updatedLegendColors);

      const updatedRows = updatedLegendValues.map((value, index) => ({
         id: index + 1,
         color: updatedLegendColors[index],
         label: value || '',
       }))
       setRows(updatedRows)
   }

   const handleLegendColorEdit = (id, color) => {
      //Just update the legend color
      const index = id - 1;
      const updatedLegendColors = [...legendColors];
      updatedLegendColors[index] = color;
      setLegendColors(updatedLegendColors);
   }


   function generateGradient(color1, color2, levels) {
      const gradient = chroma.scale([color1, color2]).colors(levels);
      return gradient;
    }

   const handleGenerateGradient = () => {
      const gradient = generateGradient(lowColorChoro, highColorChoro, levelsChoro);
      console.log(gradient);
      setLegendColors(gradient);
      const blankValues = Array.from({ length: gradient.length }, () => '')
      setLegendValues(blankValues)

      const updatedRows = gradient.map((color, index) => ({
         id: index + 1,
         color: color,
         label: '',
       }))
       setRows(updatedRows)
   }

   

   const handleGenerateCloropleth = () => {
      // needs to set values in store.currentMap.mapFeatures.ADV for colors
      // Use the selected value to get the properity
      // iterate through the mapFeatures.ADV for selected properity
      // for a region, if the value is between the legend values, set the color to the legend color

      const mapFeatures = { ...store.currentMap.mapFeatures.ADV };
      const propertyToUse = selectedValue; 
      for (const country in mapFeatures) {
        if (Object.prototype.hasOwnProperty.call(mapFeatures, country)) {
          const countryRegions = mapFeatures[country];
    
          //Update colors 
          const updatedRegions = countryRegions.map(region => {
            const propertyValue = parseFloat(region[propertyToUse]);
    
      
            let updatedRegion = {
              color: null, //Set tpo default color or null if needed
              ...region
            };
    
            for (let i = 0; i < legendValues.length; i++) {
               // Check if property value falls within legend bounds
               if (i === 0 && propertyValue < parseFloat(legendValues[i])) {
                 console.log('Value is less than the first legend value');
                 const legendColor = legendColors[i];
                 updatedRegion.color = legendColor; 
                 break;
               } else if (i === legendValues.length - 1 && propertyValue >= parseFloat(legendValues[i])) {
                 console.log('Value is greater than or equal to the last legend value');
                 const legendColor = legendColors[i];
                 updatedRegion.color = legendColor; 
                 break;
               } else if (propertyValue >= parseFloat(legendValues[i]) && propertyValue < parseFloat(legendValues[i + 1])) {
                 console.log('Value falls within legend range');
                 const legendColor = legendColors[i];
                 updatedRegion.color = legendColor;
                 break;
               }
             }
     
    
            return updatedRegion;
          });
    
          mapFeatures[country] = updatedRegions;
        }
      }
   }

      //For Choropleth Levels
      const setLevelsChoro = props.setLevelsChoro;
      const levelsChoro = props.levelsChoro;
      const handleLevelsChoroChange = (event) => {
         const newLevels = event.target.value.trim();
         if (newLevels === '' || !isNaN(newLevels)) {
            setLevelsChoro(newLevels === '' ? "" : parseInt(newLevels));
         }
      }

   //For Legend
   const setLegendOn = props.setLegendOn;
   const legendOn = props.legendOn;
   const handleLegendSwitchChange = (event) => {
      setLegendOn(event.target.checked);
   }

   //For Legend Name
   const setLegendName = props.setLegendName;
   const legendName = props.legendName;
   const handleLegendNameChange = (event) => {
      setLegendName(event.target.value);
   }


   //For Color Mode
   const handleGenerateColor = () => {
      const mapFeatures = { ...store.currentMap.mapFeatures.ADV };
      const propertyToUse = selectedValue;
    
      for (const country in mapFeatures) {
        if (Object.prototype.hasOwnProperty.call(mapFeatures, country)) {
          const countryRegions = mapFeatures[country];
    
          // Update colors to legend colors
          const updatedRegions = countryRegions.map((region) => {
            const propertyValue = region[propertyToUse];
    
            let updatedRegion = {
              color: "",
              ...region,
            };
    
            let foundMatch = false;
            for (let i = 0; i < legendValues.length; i++) {
              if (propertyValue === legendValues[i]) {
                const legendColor = legendColors[i];
                updatedRegion.color = legendColor;
                foundMatch = true;
                break;
              }
            }
    
            if (!foundMatch) {
              updatedRegion.color = "";
            }
    
            return updatedRegion;
          });
    
          mapFeatures[country] = updatedRegions;
        }
      }
    
      const updatedMap = {
        ...store.currentMap,
        mapFeatures: { ...store.currentMap.mapFeatures, ADV: mapFeatures },
      };
    
      store.updateCurrentMapLocally(updatedMap);
    };

   const formattedLat = center[0] ? center[0].toFixed(4) : '?';
   const formattedLng = center[1] ? center[1].toFixed(4) : '?';
      const realFormattedLat = realCenter[0] ? realCenter[0].toFixed(4) : '?';
      const realFormattedLng = realCenter[1] ? realCenter[1].toFixed(4) : '?';






      const selectedValue = props.selectedValue;
      const setSelectedValue = props.setSelectedValue;

      const regionNameToDisplay = props.regionNameToDisplay;
      const setRegionNameToDisplay = props.setRegionNameToDisplay;

      const [options, setOptions] = useState([]);

      useEffect(() => {
         if (store.currentMap && store.currentMap.mapFeatures && store.currentMap.mapFeatures.ADV) {
            const adv = store.currentMap.mapFeatures.ADV;
            if (Object.keys(adv).length > 0) {
               let firstRegion = Object.keys(adv)[0];
               let listOfProps = Object.values(adv[firstRegion])
               let keysFromObjects = listOfProps.map(obj => Object.keys(obj));
               setOptions(keysFromObjects.flat());
            }
         }
      }, [store.currentMap]);


      const handleSelectChange = (event) => {
         setSelectedValue(event.target.value);
      };

      const handleSelectChangeRegion = (event) => {
         setRegionNameToDisplay(event.target.value);
      };

      const [rows, setRows] = useState(legendValues.map((value, index) => ({
         id: index + 1,
         color: legendColors[index],
         label: value || '',
      })));
      const columns = [
         {
            field: 'color', headerName: 'Colors', width: 120,
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
                  {params.row.id === 1 && <span style={{ marginLeft: '5px' }}>{'<'}</span>}
                  {params.row.id !== 1 && params.row.id !== rows.length && <span style={{ marginLeft: '5px' }}>x<sub>{`${params.row.id - 1}`}</sub>-x<sub>{`${params.row.id}`}</sub></span>}
                  {params.row.id === rows.length && <span style={{ marginLeft: '5px' }} >{'>'}</span>}
               </div>
            ),
         },
         {
            field: 'label', headerName: 'Labels', width: 130, editable: true,
         },
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

      const handleCellEdit = (id, field, value) => {

         const updatedRows = rows.map((row) => {
            if (row.id === id) {
               return { ...row, [field]: value };
            }
            return row;
         });

         setRows(updatedRows);

         // Update legendValues based on the updatedRows
         const updatedLegendValues = updatedRows.map((row) => row.label);
         setLegendValues(updatedLegendValues);
      }
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
                     value={mapColor || 'maroon'}
                     onChange={(e) => handleColorChange(e.target.value)}
                     disabled={cursorModes !== ''}
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Show Borders:</i> { }
                  <FormControlLabel 
                  value="start"
                  control={
                  <Switch id="border" checked={borderSwitch} onChange={handleBorderSwitchChange}color="primary" disabled={cursorModes !== ''}/>
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
                     disabled={cursorModes !== ''}
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
                  disabled={cursorModes !== ''}
                  InputProps={{
                  endAdornment: 
                  <InputAdornment position="end">px</InputAdornment>
                  ,
                  }}
                  ></TextField>
               </Typography>
               </Box>
               { store.currentMap && (store.currentMap.mapType === 4 || store.currentMap.mapType === 1) && (
               <div>
               <FormControl fullWidth>
        <InputLabel id="select-label">Select a property</InputLabel>
        <Select
          labelId="select-label"
          value={regionNameToDisplay}
          onChange={handleSelectChangeRegion}
          label="Select a region"
          disabled={cursorModes !== ''}
        >
          <MenuItem value="">
            Names
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>)}
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Show Regions Names:</i> { }
                  <FormControlLabel
                  value="start"
                  disabled={cursorModes !== ''}
                  control={
                  <Switch id="toggleNames" checked={regionNameSwitch} color="primary" onChange={handleRegionNameSwitchChange}/>
                  }
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <FormControl fullWidth>
                  <InputLabel id="select-label">Select a tooltip direction</InputLabel>
                  <Select
                     labelId="select-label"
                     value={ttDirection}
                     onChange={handleTtDirectionChange}
                     label="Select a tooltip direction"
                  >
                     <MenuItem value="center">Center</MenuItem>
                     <MenuItem value="top">Top</MenuItem>
                     <MenuItem value="bottom">Bottom</MenuItem>
                     <MenuItem value="left">Left</MenuItem>
                     <MenuItem value="right">Right</MenuItem>
                  </Select>
               </FormControl>
               </Box>
                <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Region Name Colors:</i> { }
                  <input
                     type="color"
                     className={styles.color_box}
                     value={regionNameColor}
                     disabled={cursorModes !== ''}
                     onChange={(e) => handleColorChangeRegionName(e.target.value)}
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Region Name Text Size:</i> { }
                  <TextField
                  className={styles.text_box}
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: 100 }}
                  value={regionNameTextSize}
                  disabled={cursorModes !== ''}
                  onChange={handleRegionNameTextSizeChange}
                  InputProps={{
                  endAdornment:
                  <InputAdornment position="end">px</InputAdornment>
                  ,
                  }}
                  ></TextField>
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Background Color:</i> {}
                  <input
                     type="color"
                     className={styles.color_box}
                     value={backgroundColor}
                     disabled={cursorModes !== ''}
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
                     disabled={cursorModes !== ''}
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
                     disabled={cursorModes !== ''}
                  >
                     Set
                  </Button>
                  </Typography>
               </Box>
               <i>Zoom: ({realZoom}) { }</i>
               {store.currentMap && store.currentMap.mapType && (store.currentMap.mapType === 3 || store.currentMap.mapType === 2) && (
               <div>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Radius:</i> { }
                  <TextField
                  className={styles.text_box}
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: 100 }}
                  value={radius}
                  disabled={cursorModes !== ''}
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
                     disabled={cursorModes !== ''}
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
                  disabled={cursorModes !== ''}
                  onChange={handleDotOpacityChange}
                  InputProps={{
                  endAdornment: 
                  <InputAdornment position="end">%</InputAdornment>
                  ,
                  }}
                  ></TextField>
               </Typography>
               </Box>
               </div>)}
               { store.currentMap && store.currentMap.mapType === 4 && (
               <div>
                  <Typography className= {styles.text_color} component="h1" variant="h6"><i>Choose Property:</i></Typography>
                  <FormControl fullWidth>
                  <InputLabel id="select-label">Select a property</InputLabel>
                  <Select
                     labelId="select-label"
                     value={selectedValue}
                     disabled={cursorModes !== ''}
                     onChange={handleSelectChange}
                     label="Select a region"
                  >
                     <MenuItem value="">
                        Names
                     </MenuItem>
                     {options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                        {option}
                        </MenuItem>
                     ))}
                  </Select>
                  </FormControl> 
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Low Color:</i> { }
                  <input
                     type="color"
                     className={styles.color_box}
                     value={lowColorChoro}
                     disabled={cursorModes !== ''}
                     onChange={(e) => handleColorChangeLowChoro(e.target.value)}
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>High Color:</i> { }
                  <input
                     type="color"
                     className={styles.color_box}
                     value={highColorChoro}
                     disabled={cursorModes !== ''}
                     onChange={(e) => handleColorChangeHighChoro(e.target.value)}
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Levels: </i> { }
                  <TextField
                  className={styles.text_box}
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: 100 }}
                  value={levelsChoro}
                  disabled={cursorModes !== ''}
                  onChange={handleLevelsChoroChange}
                  ></TextField>
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
                  <Button style={{ color: 'black', backgroundColor: 'white' }} disabled={cursorModes !== ''} onClick={() => {
                     handleGenerateGradient();
                  }
                  }>
                     Generate Gradient
                  </Button>
               </Box>
               </div>)}
               <div style={{ display: 'flex', justifyContent: 'center', padding: '10px'}}>
               <ImportMapDataModal />
               </div>
               <div>
               <FormControl fullWidth style={{marginBottom: '15px'}}>
                  <InputLabel id="select-label" >Select a property for legend</InputLabel>
                  <Select
                     labelId="select-label"
                     value={selectedValue}
                     disabled={cursorModes !== ''}
                     onChange={handleSelectChange}
                     label="Select a region"
                  >
                     <MenuItem value="">
                        Names
                     </MenuItem>
                     {options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                        {option}
                        </MenuItem>
                     ))}
                  </Select>
                  </FormControl>
               </div>
               <div style={{margin: '10px', background: "darkgrey", padding: "10px", margin: "-10px"}}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  Legend: { }
                  <FormControlLabel
                  value="start"
                  control={
                  <Switch color="primary" 
                  checked={legendOn}
                  disabled={cursorModes !== ''}
                  onChange={handleLegendSwitchChange}
                  />
                  }
                  />
                  <TextField
                  className={styles.text_box}
                  id="outlined-size-small"
                  variant="standard"
                  size="small"
                  defaultValue={"Legend"}
                  label={"Enter Legend Name"}
                  value={legendName}
                  disabled={cursorModes !== ''}
                  onChange={handleLegendNameChange}
                  sx={{ width: 260, borderRadius: 1, marginBottom: '5px'}}>
                  
                     
                  </TextField>

            </Typography>
            {/*FOR CHOROPLETH AND HEAT____________________________________________________________*/}
            { store.currentMap && store.currentMap.mapType && (store.currentMap.mapType === 4 || store.currentMap.mapType === 2) && (
            <Box backgroundColor="white" borderRadius={'5px'}>
          {rows.map((row) => (
            <div key={row.id} style={{ display: 'flex', alignItems: 'center', padding: '5px', marginLeft: '50px'}}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: row.color,
                  border: '1px solid black',
                  marginRight: '10px'
                }}
              ></div>
               {store.currentMap && store.currentMap.mapType && (
               <>
                  {
                     <>
                     {row.id === 1 && <span style={{ marginLeft: '5px' }}>{'<'}</span>}
                     {row.id !== 1 && row.id !== rows.length && (
                        <span style={{ marginLeft: '5px' }}>x<sub>{`${row.id - 1}`}</sub>-x<sub>{`${row.id}`}</sub></span>
                     )}
                     {row.id === rows.length && <span style={{ marginLeft: '5px' }}>{'>'}</span>}
                     </>
                  }
               </>
               )}

              <TextField
                variant="outlined"
                size="small"
                value={row.label}
                disabled={cursorModes !== ''}
                onChange={(e) => {
                  handleCellEdit(row.id, 'label', e.target.value);
                }}
                style={{ marginLeft: 'auto' }}
              />
            </div>
          ))}
        </Box>)}
         {/*______________________________________________________________________________________*/}
         {/*FOR COLOR AND TEXT____________________________________________________________________________*/}
         {store.currentMap && store.currentMap.mapType && (store.currentMap.mapType === 1 || store.currentMap.mapType === 5) && (
        <Box backgroundColor="white" borderRadius={'5px'}>
          {rows.map((row) => (
            <div key={row.id} style={{ display: 'flex', alignItems: 'center', padding: '5px', marginLeft: '50px' }}>
              <input
                type="color"
                value={legendColors[row.id - 1]}
                disabled={cursorModes !== ''}
                onChange={(e) => {
                  handleLegendColorEdit(row.id, e.target.value);
                }}
                style={{
                  width: '30px',
                  height: '30px',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '10px',
                }}
              />
              {store.currentMap && store.currentMap.mapType && (
                <>
                  {store.currentMap.mapType === 5 || store.currentMap.mapType === 1 && (
                      <span style={{ marginLeft: '5px' }}>{'='}</span>
                  )}
                </>
              )}

              <TextField
                variant="outlined"
                size="small"
                value={row.label}
                disabled={cursorModes !== ''}
                onChange={(e) => {
                  handleCellEdit(row.id, 'label', e.target.value);
                }}
                style={{ marginLeft: 'auto' }}
              />

              <IconButton  disabled={cursorModes !== ''} onClick={() => handleDeleteRow(row.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}

          <IconButton  disabled={cursorModes !== ''} onClick={handleAddRow}>
            <AddIcon />
          </IconButton>
        </Box>
      )}
        {store.currentMap && store.currentMap.mapType === 4 && ( // Only show the button if the map is a choropleth
            <Box className = {styles.item_box}>
                  <Button disabled={cursorModes !== ''} style={{ color: 'black', backgroundColor: 'white' }} onClick={() => {
                     handleGenerateCloropleth();
                  }
                  }>
                     Generate Choropleth using Legend
                  </Button>
               </Box>
        )}


         {store.currentMap && store.currentMap.mapType === 5 && (
            <Box className = {styles.item_box}>
                  <Button disabled={cursorModes !== ''} style={{ color: 'black', backgroundColor: 'white' }} onClick={() => {
                     handleGenerateColor();
                  }
                  }>
                     Generate Colors using Legend
                  </Button>
               </Box>
        )}

         {store.currentMap && store.currentMap.mapType === 1 && (
            <Box className = {styles.item_box}>
                  <Button disabled={cursorModes !== ''} style={{ color: 'black', backgroundColor: 'white' }} onClick={() => {
                     handleGenerateColor();
                  }
                  }>
                     Generate Colors using Legend
                  </Button>
               </Box>
        )}


            </div>
            </Box>
            </Grid>
         </Box>
      );
   } else {
      return null;
   }
}