import { Box, IconButton, Typography } from "@mui/material";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import styles from './EditToolbar.module.css';

function EditToolbar() {

    return(
        <div id={styles.edit-toolbar} >
            <div id={styles.editheader}>
                Map Editor
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
} export default EditToolbar