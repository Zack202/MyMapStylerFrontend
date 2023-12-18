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
import Alert from '@mui/material/Alert';
import BackHandIcon from '@mui/icons-material/BackHand';
import AdjustIcon from '@mui/icons-material/Adjust';

function EditToolbar(props) {

  const name = props.name;
  if (typeof window !== 'undefined') {
    const { store } = useContext(GlobalStoreContext);
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);

    let mapColor, borderSwitch, borderColor, borderWidth, regionSwitch, regionNameColor, backgroundColor, dotColor;
    if (store.currentMap) {
      mapColor = store.currentMap.mapFeatures.edits.mapColor;
      borderSwitch = store.currentMap.mapFeatures.edits.borderSwitch;
      borderColor = store.currentMap.mapFeatures.edits.borderColor;
      borderWidth = store.currentMap.mapFeatures.edits.borderWidth;
      regionSwitch = store.currentMap.mapFeatures.edits.regionSwitch;
      regionNameColor = store.currentMap.mapFeatures.edits.regionNameColor;
      backgroundColor = store.currentMap.mapFeatures.edits.backgroundColor;
      dotColor = store.currentMap.mapFeatures.edits.dotColor;
    }
    else {
      mapColor = 'maroon';
      borderSwitch = true;
      borderColor = 'maroon';
      borderWidth = 1;
      regionSwitch = false;
      regionNameColor = 'black';
      backgroundColor = 'white';
      dotColor = 'black'
    }

    //const mapColor = props.mapColor;
    //const borderSwitch = props.borderSwitch;
    //const borderWidth = props.borderWidth;
    //const borderColor = props.borderColor;
    //const regionSwitch = props.regionSwitch;
    //const regionNameColor = props.regionNameColor;
    //const backgroundColor = props.backgroundColor;
    const regionNameTextSize = props.regionNameTextSize;
    const center = props.center;
    const zoom = props.zoom;
    const radius = props.radius;
    //const dotColor = props.dotColor;
    const dotOpacity = props.dotOpacity;
    const cursorModes = props.cursorModes;
    const setCursorModes = props.setCursorModes;
    const setColorRegion = props.setColorRegion;
    const colorRegion = props.colorRegion;
    const selectedValue = props.selectedValue;
    const lowColorChoro = props.lowColorChoro;
    const highColorChoro = props.highColorChoro;
    const levelsChoro = props.levelsChoro;
    const legendColors = props.legendColors;
    const legendValues = props.legendValues;
    const legendOn = props.legendOn;
    const legendName = props.legendName;


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
            const handleSaveAttributes = () => {
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
                  legendName


                  );
                //add a alert to show that the map has been saved
                setTimeout(() => {
                  setShowAlert(true); 
                  //close the alert after 3 seconds
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 3000);
                }, 1000);
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
        <IconButton onClick={handleSaveAttributes}>
          <SaveIcon sx={{ fontSize: "40pt" }} />
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

        <IconButton>
          <TextFieldsIcon sx={{ fontSize: "40pt" }} />
        </IconButton>

        <IconButton onClick={handleTurnOnDotMode}>
          <AdjustIcon sx={{ fontSize: "40pt", color: cursorModes === 'dot' ? 'green' : 'black' }} />
        </IconButton>

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

        <IconButton onClick={handleUndo}>
          <UndoIcon sx={{ fontSize: "40pt" }} />
        </IconButton>

        <IconButton onClick={handleRedo}>
          <RedoIcon sx={{ fontSize: "40pt" }} />
        </IconButton>
      </div>

    );
  } else {
    return null
  }
} export default EditToolbar