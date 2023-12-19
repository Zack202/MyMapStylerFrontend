import { Fragment, useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
// import AuthContext from '../auth';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Typography, Card, CardContent, CardActions, Collapse } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CommentIcon from '@mui/icons-material/Comment';
// import WorkspaceScreen from './WorkspaceScreen';
import {Modal, Button} from '@mui/material';
// import EditToolbar from './EditToolbar';
import TestMap from "public/test_map.jpg"
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';
import ExportMapModal from '../components/ExportMapModal.js'
import DeleteMapModal from '../components/DeleteMapModal.js'
import PublishedCard from './PublishedMapCard';



function ListCard(props) {
    

    const router = useRouter()

    const { idNamePair, selected, location } = props;

    const { store } = useContext(GlobalStoreContext);
    // const {auth} = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    // const { idNamePair, selected } = props;
    const [isActive, setIsActive] = useState(false);
    const [expandedId, setExpandedId] = useState(-1);
    const [error, setError] = useState(false);
    const [listOpen, setListOpen] = useState(false);
    const [liked, setLiked] = useState("");
    const [disliked, setDisliked] = useState("");
    const [numLikes, setLikes] = useState(0);
    const [numDislikes, setNumDislikes] = useState(0);

    // let name = idNamePair.fullName;


    let likeB = "";
    let actionButtons = ""
    let deleteCase = "";
    // if(idNamePair.public ){
    //     actionButtons = "hidden";
    //     likeB = ""
    // }else{
    //     actionButtons = "";
    //     likeB = "hidden"
    // }

    // if(auth.loggedIn){
    //     if(idNamePair.ownerEmail !== auth.user.email){
    //         deleteCase = "hidden";

    //     } else{
    //         deleteCase = "";
    //     }
    // }

    const handleCloseClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
        store.closeCurrentList();
        setListOpen(false);
    }

    const handleExpandClick = (event, i) => {
        event.stopPropagation();
        // if(store.currentList){
        //     store.setCurrentList(i);
        // }
        // else{
        
        // }
        setExpandedId(expandedId === i ? -1 : i);
        setListOpen(true);
        store.setCurrentList(i);
    };

    function handleFork(event) {
        event.stopPropagation();
        store.forkMap(idNamePair._id);
    }

    const handleCloseModal = () => {
        setError(false);
    }
    
    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            //store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    const [exportModal, setExportModal] = useState(false);

    const handleExportMapModal = (event) => {
        event.preventDefault();
        setExportModal(true);
    console.log("clicked");}

    const [deleteModal, setdeleteModal] = useState(false);

    const handleDeleteMapModal = (event) => {
        event.preventDefault();
        setdeleteModal(true);
    console.log("clicked");}

    function handleDislikes(event, idNamePair) {

    }


    function handleKeyPress(event) {
    }

    function handlePublish(event, id) {
        event.stopPropagation();
        store.publishMap(idNamePair._id);
    }

    function handleUpdateText(event) {
    }

    let selectClass = "unselected-list-card";
    // if (selected) {
    //     selectClass = "selected-list-card";
    // }
    // let cardStatus = false;
    // if (store.isListNameEditActive) {
    //     cardStatus = true;
    // }
    function handelSwitchToEdit(event){
        
    }

    function handleClickForMapEdit(event){
        store.setCurrentMap(idNamePair._id)
        router.push('/mapEditing/'+idNamePair._id)
    }

    let cardElement = ""

    const idMapping = {
        5: 'Color Categorized ',
        1: 'Textual',
        2: 'Sized Dot',
        3: 'Dot',
        4: 'Choropleth'
      };

    //published card
    if(idNamePair.published){
        cardElement = 
        <PublishedCard
        key={idNamePair._id}
        idNamePair={idNamePair}
        selected={false}
        location={location}
        />
    }
    //unpublished Card
    else{
    cardElement =
    <div id='cards'>
    <Card sx={{margin: 1, borderColor: 'purple', backgroundColor: '#D3D3D3'}}
    >
        
    <CardContent sx={{p: 0}}/>
    <CardActions disableSpacing >
        
    <ListItem 
            // sx={{ display: 'flex', bgcolor: "white" }}
            style={{fontSize: '18pt', height: "100px", top: 0}}
            id={"map-card"}
            key={"map-card"}
            // button
            onDoubleClick={(event) => {
                handleToggleEdit(event)
            }}
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}  
            >
            <Link /*/href="/specificMap"*/ onClick={() => handleClickForMapEdit()} style={{top: 0, width: 200, display: "flex", position: "absolute", fontWeight: "bolder", cursor: "pointer"}}>
            {idNamePair.name}
            </Link>
            
            <Box sx={{flexGrow: 1, display: "inline-block", float:'left', cursor:"pointer"}}
            onClick={() => handleClickForMapEdit()}
            >
            
            <div>
            <img src={'test_map.jpg'} alt="image" height={'100px'} style={{marginTop: 10, position:'absolute'}} />    
            </div>

            </Box>
        
        <Box sx={{ float:"left", display: "inline-block", width: "70%", marginTop: 5, marginLeft: 10, height: "80%"}}>
        
            <div>
            <Typography sx={{top: 0, position: "absolute", width: "15%", height: "10%", display: "flex", fontWeight: "900"}}>
                Description: 
            </Typography>
            </div>

            <div>
            <Typography sx={{top: 20, position: "absolute", width: "25%"}}>
            {idNamePair.description}
            </Typography>
            </div>
        </Box>
        <Box
        border={1}
        borderRadius={3}
        padding={1}
        margin="50px 0 0 50px" // Adjust these values to move the Box down and to the right
        borderColor="maroon"
        bgcolor="background.paper"
        fontSize={16}
        >
        Map Type: {idMapping[idNamePair.mapType]}
        </Box>


            <Box sx={{ p: 1, flexGrow: 1, right:"0", position: "absolute", top: 0}}>
                <Typography variant='h7' fontSize="12pt">Created By: {idNamePair.userName}</Typography>
            </Box>    
                  
        </ListItem>
        
    </CardActions>
    <div style={{width: "50%", float: 'right', position: "relative"}}>
        <div style={{ float: 'right', position: "relative", display: "flex"}}>
            <DeleteMapModal id={idNamePair._id} show={true}/>
            <Button 
                // disabled={!store.canUndo()}
                id='duplicate-button'
                variant="contained"
                sx={{margin: 1, backgroundColor: "maroon"}}
                onClick={handleFork}
                >
                Fork
            </Button>
            <ExportMapModal map={idNamePair}/>
            <Button 
                id='publish-button'
                variant="contained"
                sx={{margin: 1, visibility: actionButtons, backgroundColor: "maroon"}}
                onClick={handlePublish}
                >
                Publish
            </Button>
        </div>
    </div>


    
    </Card>
  </div>
    }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '10px',
    };
    return (
        <div>
        {cardElement}
        <Modal
            open={false}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                    This name already exists. Please enter a unique name.
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Close</button>
                </div>
            </div>
            </Box>
        </Modal>
        </div>
    );
}

export default ListCard;