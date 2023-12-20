import { Box, IconButton, Typography } from "@mui/material";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import styles from './EditToolbar.module.css';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import GlobalStoreContext from '../../store';
import { useContext } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import AdjustIcon from '@mui/icons-material/Adjust';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function EditToolbar(props) {

  const name = props.name;
  if (typeof window !== 'undefined') {
    const { store } = useContext(GlobalStoreContext);
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);

    const mapColor = props.mapColor;
    const borderSwitch = props.borderSwitch;
    const borderWidth = props.borderWidth;
    const borderColor = props.borderColor;
    const regionSwitch = props.regionSwitch;
    const regionNameColor = props.regionNameColor;
    const backgroundColor = props.backgroundColor;
    const regionNameTextSize = props.regionNameTextSize;
    const center = props.center;
    const zoom = props.zoom;
    const radius = props.radius;
    const dotColor = props.dotColor;
    const dotOpacity = props.dotOpacity;
    const cursorModes = props.cursorModes;
    const setCursorModes = props.setCursorModes;
    const setColorRegion = props.setColorRegion;
    const colorRegion = props.colorRegion;
    const regionNameToDisplay = props.regionNameToDisplay;
    const selectedValue = props.selectedValue;
    const lowColorChoro = props.lowColorChoro;
    const highColorChoro = props.highColorChoro;
    const levelsChoro = props.levelsChoro;
    const legendColors = props.legendColors;
    const legendValues = props.legendValues;
    const legendOn = props.legendOn;
    const legendName = props.legendName;
    const ttDirection = props.ttDirection;


    const handleDoubleClick = () => {
      setEditing(true);
      setEditedName(name);
    };

    const handleBlur = () => {
      setEditing(false);
      if (editedName != name && editedName != "") {
        store.updateMapName(editedName);
      }
    };
            const [showAlert, setShowAlert] = useState(false);
            
            const handleCloseAlert = () => {
              setShowAlert(false);
            };


            const captureMapAsJPGBlob = () => {
              return new Promise((resolve, reject) => {
                const mapContainer = document.getElementById('mapC');
                if (!mapContainer) {
                  reject('Map container not found');
                  return;
                }
            
                htmlToImage.toJpeg(mapContainer)
                  .then(function (dataUrl) {
                    const img = new Image();
                    img.onload = function () {
                      const canvas = document.createElement('canvas');
                      canvas.width = img.width;
                      canvas.height = img.height;
                      const ctx = canvas.getContext('2d');
                      ctx.drawImage(img, 0, 0);
            
                      // Convert canvas to a buffer
                      canvas.toBlob(function (blob) {
                        const reader = new FileReader();
                        reader.readAsArrayBuffer(blob);
                        reader.onloadend = function () {
                          const buffer = Buffer.from(reader.result);
                          resolve(buffer);
                        };
                      }, 'image/jpeg');
                    };
            
                    img.src = dataUrl;
                  })
                  .catch(function (error) {
                    reject('Something went wrong!', error);
                  });
              });
            };

            const handleSaveAttributes = async () => {
                //Generate a thumbnail
                let thumbNail = null;
                try {
                  thumbNail = await captureMapAsJPGBlob();
                  console.log('Image buffer:', thumbNail);
                  // Use the buffer as needed (e.g., send it to the server)
                } catch (error) {
                  console.error('Error:', error);
                }

                store.updateMapAttributes(mapColor,
                  borderSwitch, 
                  borderWidth, 
                  borderColor, 
                  regionSwitch, 
                  regionNameColor, 
                  backgroundColor, 
                  center, zoom, radius,
                  dotColor, 
                  dotOpacity, 
                  regionNameTextSize, 
                  selectedValue,
                  lowColorChoro,
                  highColorChoro,
                  levelsChoro,
                  legendColors,
                  legendValues,
                  legendOn,
                  legendName,
                  regionNameToDisplay,
                  ttDirection,
                  thumbNail
                  );
                //add a alert to show that the map has been saved
                setTimeout(() => {
                  setShowAlert(true); 
                  //close the alert after 3 seconds
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 5000);
                }, 1000);

                store.clearTransactionStack();
              }


    console.log("name: " + name);

    const handleChange = (event) => {
      setEditedName(event.target.value);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleBlur();
      }
    };
    const handleUndo = () => {
      console.log('undo');
      store.undo();

    };
    const handleRedo = () => {
      console.log('redo');
      store.redo();

    };

    const handleColorChangeRegions = (color) => {
      setTimeout(() => {
        setColorRegion(color);
      }, 300);
    }

    const handleTurnOnColorMode = () => {
      console.log('color mode')
      //setColor('black')
      setCursorModes('color')
    };

    const handleTurnOnDefault = () => {
      console.log('grab mode')
      setCursorModes('')
    }

    const handleTurnOnDotMode = () => {
      console.log('dot mode')
      setCursorModes('dot')
    }

    const handleTurnOnSizedDotMode = () => {
      console.log('sized dot mode')
      setCursorModes('sized dot')
    }

    return (
      <div id={styles.edit - toolbar} >
        <div id={styles.editheader} onDoubleClick={handleDoubleClick}>
          {editing ? (
            <TextField
              value={editedName}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div>{name}</div>
          )}
        </div>

        <Alert sx={{display: showAlert ? "default" : "none"}}
        icon={<CheckIcon fontSize="inherit" />} severity="success"  onClose={handleCloseAlert}>
          Map Saved 
        </Alert>

        <IconButton onClick={handleSaveAttributes}  >
          <SaveIcon sx={{ fontSize: "40pt" , color: !store.hasAnyTransactions()? 'grey': 'black'}} />
        </IconButton>

        {/* <Alert
              severity="success"
              onClose={handleCloseAlert}
              sx={{ mt: 2 }}
              open={true}
            >
              Saved Successfully!
            </Alert> */}

        <IconButton onClick={handleTurnOnDefault}>
          <BackHandIcon sx={{ fontSize: "40pt", color: cursorModes === '' ? 'green' : 'black' }} />
        </IconButton>

        {/* <IconButton>
          <TextFieldsIcon sx={{ fontSize: "40pt" }} />
        </IconButton> */}

        {store.currentMap && store.currentMap.mapType && store.currentMap.mapType == 3 && (
        <IconButton onClick={handleTurnOnDotMode}>
          <AdjustIcon sx={{ fontSize: "40pt", color: cursorModes === 'dot' ? 'green' : 'black' }} />
        </IconButton>)}

        {store.currentMap && store.currentMap.mapType && store.currentMap.mapType == 2 && (
        <IconButton onClick={handleTurnOnSizedDotMode}>
          <BlurCircularIcon sx={{ fontSize: "40pt", color: cursorModes === 'sized dot' ? 'green' : 'black' }} />
        </IconButton>)}

        <IconButton onClick={handleTurnOnColorMode}>
          {/*Change color to green if color mode is on*/}
          <ColorLensIcon sx={{ fontSize: "40pt", color: cursorModes === 'color' ? 'green' : 'black' }} />
        </IconButton>

        {cursorModes === 'color' && (
          <input
            type="color"
            value={colorRegion}
            onChange={(e) => handleColorChangeRegions(e.target.value)}
          />)
        }

        <IconButton onClick={handleUndo} disabled={!store.canUndo()}>
          <UndoIcon sx={{ fontSize: "40pt", color: store.canUndo() ? 'black' : 'gray' }} />
        </IconButton>

        <IconButton onClick={handleRedo} disabled={!store.canRedo()}>
          <RedoIcon sx={{ fontSize: "40pt", color: store.canRedo() ? 'black' : 'gray' }} />
        </IconButton>
      </div>

    );
  } else {
    return null
  }
} export default EditToolbar