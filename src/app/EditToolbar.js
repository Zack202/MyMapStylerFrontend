import { Box, IconButton, Typography } from "@mui/material";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

function EditToolbar() {




    return(
        <div id="edit-toolbar">
            <div id="edit-header">
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
        </div>

    );
} export default EditToolbar