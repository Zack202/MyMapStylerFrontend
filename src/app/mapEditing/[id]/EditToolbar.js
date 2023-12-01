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

function EditToolbar(props) {
    const { name } = props;
    if (typeof window !== 'undefined') {
        const { store } = useContext(GlobalStoreContext);
            const [editing, setEditing] = useState(false);
            const [editedName, setEditedName] = useState(name);
          
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
            <IconButton>
            <ColorLensIcon sx={{fontSize: "40pt"}}/>
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
        </div>

    );
    }else{
        return null
    }
} export default EditToolbar