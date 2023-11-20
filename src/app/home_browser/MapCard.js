import { Fragment, useContext, useState } from 'react'
// import { GlobalStoreContext } from '../store'
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



function ListCard(props) {

    const router = useRouter()

    // const { store } = useContext(GlobalStoreContext);
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

    function handleAddNewSong(event, id) {
        // store.addNewSong(id);
    }
    function handleUndo(event, id) {
        // store.undo();
    }
    function handleRedo(event,id ) {
        // store.redo();
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        // store.markListForDeletion(id);
    }

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            // store.loadSongsToPlay(id);
        }
    }

    // let highlighted = "";
    // if(store.songsToPlay){
    //     if(store.songsToPlay._id === idNamePair._id)
    //         highlighted ="inset";
    // }


    // let collapseUPorDown = "";
    // if(listOpen){
    //     collapseUPorDown =        
    //     <Box 
    //     sx={{display: 'inline-block', float: 'right', marginRight:'30px',}}
    // >
    //     <IconButton
    //         onClick={(event) => {handleCloseClick(idNamePair._id)}}
    //         aria-expanded={expandedId === idNamePair._id}
    //         aria-label="show less"
    //         >
    //         <KeyboardDoubleArrowUpIcon style={{fontSize:'20pt'}} />
    //     </IconButton>
    // </Box>
    // }
    // else{
    //     collapseUPorDown =        <Box 
    //     sx={{display: 'inline-block', float: 'right', marginRight:'30px',}}
    // >
    //     <IconButton
    //         onClick={(event) => {handleExpandClick(event, idNamePair._id)}}
    //         aria-expanded={expandedId === idNamePair._id}
    //         aria-label="show more"
    //         >
    //         <KeyboardDoubleArrowDownIcon style={{fontSize:'20pt'}} />
    //     </IconButton>
    // </Box>
    // }

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

    const handleDuplicate = (event, i) => {
        event.stopPropagation();
        store.createNewList(0, i);
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
            store.setIsListNameEditActive();
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

    function handlePublishPlaylist(event, id) {
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


    let cardElement =
    <div id='cards'>
    <Card onClick={() => router.push('/mapEditing')} sx={{margin: 1, borderColor: 'purple', backgroundColor: '#D3D3D3'}}
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
            <Link href="/specificMap" style={{top: 0, display: "flex", position: "absolute", fontWeight: "bolder"}}>
            Map Card Name
            </Link>
            
            <Box sx={{flexGrow: 1, display: "inline-block", float:'left',}}>

            
            <div>
            <img src={'test_map.jpg'} alt="image" height={'100px'} style={{position:'absolute'}} />    
            </div>

            </Box>
        
        <Box sx={{ float:"left", display: "inline-block", width: "80%", marginTop: 5, height: "100%"}}>
        
            <div>
            <Typography sx={{top: 0, position: "absolute", width: "15%", height: "10%", display: "flex", fontWeight: "900"}}>
                Description: 
            </Typography>
            </div>

            <div>
            <Typography sx={{top: 20, position: "absolute", width: "25%"}}>
            This is the discription for a map. Users can add a description to give other users a better idea of what the map is about.
            </Typography>
            </div>
        </Box>

            <Box sx={{ p: 1, flexGrow: 1, right:"0", position: "absolute", top: 0}}>
                <Typography variant='h7' fontSize="12pt">Created By: User</Typography>
            </Box>

            {/* like dislike comments container */}
            <Box sx={{flexGrow: 0, p: 2, right: 0, position: 'absolute', display: "flex", bottom: 0, backgroundColor: "gray", height: "50%",
        borderRadius: "10px"}}>
            {/* <Box sx={{p: 0}}> */}
                <IconButton onClick={(event) => {
                        handleLikePlaylis(event, idNamePair)
                    }} 
                    aria-label='like'>
                    <ThumbUpOffAltIcon style={{fontSize:'30pt', color: "white", visibility: likeB}} />
                    <Typography sx={{margin: 1, fontSize: '22pt', visibility: likeB, color: "white"}}>5</Typography>
                </IconButton>
            {/* </Box> */}

            {/* <Box sx={{padding: 0}} > */}
                <IconButton 
                    aria-label='dislike'>
                    <ThumbDownOffAltIcon style={{fontSize:'30pt', color: "white", visibility: likeB}} />
                    <Typography sx={{margin: 1, fontSize: '22pt', visibility: likeB, color: "white"}}>5</Typography>
                </IconButton>

                <IconButton aria-label='comments'>
                    <CommentIcon style={{fontSize:'30pt', color: "white", visibility: likeB}} />
                    <Typography sx={{margin: 1, fontSize: '22pt', visibility: likeB, color: "white"}}>5</Typography>
                </IconButton>
            {/* </Box> */}
            </Box>
    
                  
        </ListItem>
        
    </CardActions>
    <div style={{width: "50%", float: 'right', position: "relative"}}>
        <div style={{ float: 'right', position: "relative", display: "flex"}}>
            {/* <Button 
                id='publish-button'
                variant="contained"
                sx={{margin: 1, visibility: actionButtons, backgroundColor: "maroon"}}
                >
                Publish
            </Button> */}
            <DeleteMapModal />
            <Button 
                // disabled={!store.canUndo()}
                id='duplicate-button'
                variant="contained"
                sx={{margin: 1, backgroundColor: "maroon"}}
                >
                Fork
            </Button>
            {/* <Button 
                // disabled={!store.canUndo()}
                id='export-button'
                variant="contained"
                sx={{margin: 1, backgroundColor: "maroon"}}
                >
                Export
            </Button> */}
            <ExportMapModal />
        <Box 
            sx={{display: 'inline-block',  p: 1,}}
            >
                <Typography fontSize="12pt"> Views: 10 </Typography>
        </Box>
        </div>
    </div>


    
    </Card>
  </div>

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