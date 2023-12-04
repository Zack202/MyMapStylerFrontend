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

function EditToolbar(props) {
    const name = props.name;
    if (typeof window !== 'undefined') {
        const { store } = useContext(GlobalStoreContext);
            const [editing, setEditing] = useState(false);
            const [editedName, setEditedName] = useState(name);
            
            const borderSwitch = props.borderSwitch;
            const borderWidth = props.borderWidth;
            const borderColor = props.borderColor;
            const regionSwitch = props.regionSwitch;
            const regionNameColor = props.regionNameColor;
            const backgroundColor = props.backgroundColor;
            const center = props.center;
            const zoom = props.zoom;

            const [showAlert, setShowAlert] = useState(false);
            
            const handleCloseAlert = () => {
              setShowAlert(false);
            };
            const handleSaveAttributes = () => {
                store.updateMapAttributes(borderSwitch, borderWidth, borderColor, regionSwitch, regionNameColor, backgroundColor, center, zoom);
                //add a alert to show that the map has been saved
                setTimeout(() => {
                  setShowAlert(true); 
                  //close the alert after 3 seconds
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 3000);
                }, 1000);
              }


            const handleDoubleClick = () => {
              setEditing(true);
              setEditedName(name);
            };
          
            const handleBlur = () => {
              setEditing(false);
              if(editedName != name && editedName != ""){
                store.updateMapName(editedName);
              }
            };
          
            const handleChange = (event) => {
              setEditedName(event.target.value);
            };

            const handleKeyDown = (event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleBlur();
                }
              };

        console.log("name: " + name);
    return(
        <div id={styles.edit-toolbar} >
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
            <SaveIcon sx={{fontSize: "40pt"}}/>
            </IconButton>

            <IconButton>
            <TextFieldsIcon sx={{fontSize: "40pt"}}/>
            </IconButton>

            <IconButton>
            <FormatColorFillIcon sx={{fontSize: "40pt"}}/>
            </IconButton>

            <IconButton>
            <UndoIcon sx={{fontSize: "40pt"}}/>
            </IconButton>

            <IconButton>
            <RedoIcon sx={{fontSize: "40pt"}}/>
            </IconButton>

            {/* <Alert
              severity="success"
              onClose={handleCloseAlert}
              sx={{ mt: 2 }}
              open={true}
            >
              Saved Successfully!
            </Alert> */}
        </div>

    );
    }else{
        return null
    }
} export default EditToolbar