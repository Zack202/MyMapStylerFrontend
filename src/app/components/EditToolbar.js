import { Box, IconButton, Typography } from "@mui/material";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import styles from './EditToolbar.module.css';

function EditToolbar() {




    return(
        <div id={styles.edit-toolbar} >
            <div id={styles.editheader}>
                Map Editor
            
            <IconButton>
            <ColorLensIcon sx={{fontSize: "40pt"}}/>
            </IconButton>

            <IconButton>
            <TextFieldsIcon sx={{fontSize: "40pt"}}/>
            </IconButton>

            <IconButton>
            <FormatColorFillIcon sx={{fontSize: "40pt"}}/>
            </IconButton>
            </div>
        </div>

    );
} export default EditToolbar