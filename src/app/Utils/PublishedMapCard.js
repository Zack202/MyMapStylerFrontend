import { useEffect, useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
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
import ExportMapModal from '../components/ExportMapModal.js';
import DeleteMapModal from '../components/DeleteMapModal.js';



function PublishedCard(props) {
    
    const authContext = useContext(AuthContext);

    const router = useRouter()

    const { idNamePair, selected, location, isGuest } = props;
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [deletable, setDeletable] = useState(false);

    const [isActive, setIsActive] = useState(false);

    const [error, setError] = useState(false);

    let userName = "";
    if(auth.loggedIn){
        userName = auth.user.userName;
    }
    useEffect(() => {
        if(auth.user){
            userName = auth.user.userName;
            if(userName === idNamePair.userName){
                setDeletable(true);
            }
        }
    }, [auth]);


    let isItLiked = idNamePair.likes.includes(userName);
    let isItDisliked = idNamePair.dislikes.includes(userName);
    console.log(idNamePair.likes);
    const [liked, setLiked] = useState(isItLiked);

    const [disliked, setDisliked] = useState(idNamePair.dislikes.includes(userName));
    

    function handleLikeMap(event){
        event.stopPropagation();
        if (!isGuest) {
            setDisliked(false);
            setLiked(!liked);
            store.likeMap(idNamePair._id, location, userName);
        }
    }

    let likeB = "";

    function handleDislikeMap(event){
        event.stopPropagation();
        if (!isGuest){
            setLiked(false);
            setDisliked(!disliked);
            store.dislikeMap(idNamePair._id, location, userName);
        }
    }
    

    //UNLIKED
    let likeButton =  "";

    let dislikeButton =  "";

    if(isItLiked){
        console.log("are we hree");
        likeButton = 
        <IconButton onClick={(event) => {
            handleLikeMap(event)
        }} 
            aria-label='like'>
            <ThumbUpAltIcon style={{fontSize:'30pt', color: "white"}} />
            <Typography sx={{margin: 1, fontSize: '22pt', color: "white"}}>{idNamePair.likes.length}</Typography>
        </IconButton>
    } else{
        likeButton =
        <IconButton onClick={(event) => {
            handleLikeMap(event)
        }} 
            aria-label='like'>
            <ThumbUpOffAltIcon style={{fontSize:'30pt', color: "white"}} />
            <Typography sx={{margin: 1, fontSize: '22pt', color: "white"}}>{idNamePair.likes.length}</Typography>
        </IconButton>
    }


    if(isItDisliked){
        dislikeButton = 
            <IconButton onClick={(event) => {
                handleDislikeMap(event)
            }} 
                aria-label='dislike'>
                <ThumbDownAltIcon style={{fontSize:'30pt', color: "white"}} />
                <Typography sx={{margin: 1, fontSize: '22pt', color: "white"}}>{idNamePair.dislikes.length}</Typography>
            </IconButton>
    } else {
        dislikeButton = 
            <IconButton onClick={(event) => {
                handleDislikeMap(event)
            }} 
                aria-label='dislike'>
                <ThumbDownOffAltIcon style={{fontSize:'30pt', color: "white"}} />
                <Typography sx={{margin: 1, fontSize: '22pt', color: "white"}}>{idNamePair.dislikes.length}</Typography>
            </IconButton>
    }

    function handleFork(event) {
        event.stopPropagation();
        store.forkMap(idNamePair._id);
    }

    const handleCloseModal = () => {
        setError(false);
    }
    


    const [exportModal, setExportModal] = useState(false);

    const handleExportMapModal = (event) => {
        event.preventDefault();
        setExportModal(true);
        console.log("clicked");
    }

    const [deleteModal, setdeleteModal] = useState(false);

    const handleDeleteMapModal = (event) => {
        event.preventDefault();
        setdeleteModal(true);
    console.log("clicked");}

    function handleClickForPublishedMap(event){
        store.setCurrentMap(idNamePair._id)
        router.push('/publishedMap/'+idNamePair._id)
    }

    const idMapping = {
        5: 'Color Categorized ',
        1: 'Textual',
        2: 'Sized Dot',
        3: 'Dot',
        4: 'Choropleth'
      };


    let cardElement =
    <div id='cards'>
    <Card sx={{margin: 1, borderColor: 'purple', backgroundColor: '#D3D3D3'}}
    >
        
    <CardContent sx={{p: 0}}/>
    <CardActions disableSpacing >
        
    <ListItem 
            style={{fontSize: '18pt', height: "100px", top: 0}}
            id={"map-card"}
            key={"map-card"}
            // button
            >
            <Link style={{top: 0, width: 200, display: "flex", position: "absolute", fontWeight: "bolder", cursor: "pointer"}}
            onClick={() => handleClickForPublishedMap()}
            >
            {idNamePair.name}
            </Link>
            
            <Box sx={{flexGrow: 1, display: "inline-block", float:'left', cursor: "pointer"}}
            onClick={() => handleClickForPublishedMap()}
            >

            <div>
            <img src={'test_map.jpg'} alt="image" height={'100px'} style={{marginTop: 10, position:'absolute'}} />    
            </div>

            </Box>
        
        <Box sx={{ float:"left", display: "inline-block", width: "70%", marginTop: 5, marginLeft: 10, height: "100%"}}>
        
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

            <Box sx={{ p: 1, flexGrow: 1, right:"0", position: "absolute", top: 0}}>
                <Typography variant='h7' fontSize="12pt">Created By: {idNamePair.userName}</Typography>
            </Box>

            {/* like dislike comments container */}
            <Box sx={{flexGrow: 0, p: 2, right: 0, position: 'absolute', display: "flex", bottom: 0, backgroundColor: "gray", height: "50%",
        borderRadius: "10px"}}>
            {/* <Box sx={{p: 0}}> */}
                {likeButton}
                {dislikeButton}
                
                <IconButton aria-label='comments' onClick={() => handleClickForPublishedMap()}>
                    <CommentIcon style={{fontSize:'30pt', color: "white"}} />
                                                                                        {/* still have to work on comments */}
                    <Typography sx={{margin: 1, fontSize: '22pt', color: "white"}}>{idNamePair.comments.length}</Typography>
                </IconButton>
            {/* </Box> */}
            </Box>
    
                  
        </ListItem>
        
    </CardActions>
    <div style={{width: "50%", float: 'right', position: "relative"}}>
        

        <div style={{ float: 'right', position: "relative", display: "flex"}}>
            <DeleteMapModal id={idNamePair._id} show={deletable}/>
            <Button 
                // disabled={!store.canUndo()}
                id='duplicate-button'
                variant="contained"
                sx={{margin: 1, backgroundColor: "maroon",
                display: isGuest ?  "none"  : "default"}}
                onClick={handleFork}
                >
                Fork
            </Button>
            <ExportMapModal map={idNamePair}/>

        <Box 
            sx={{display: 'inline-block',  p: 1,}}
            >
                
        </Box>
        </div>
        <div style={{ width: "50%", float: 'right', position: "relative", display: "flex"}}>
        <Box
        border={1}
        borderRadius={3}
        padding={1}
        borderColor="maroon"
        bgcolor="background.paper"
        fontSize={16}
        marginLeft={30}
        marginTop={1}
        >
        Map Type: {idMapping[idNamePair.mapType]}
        </Box>
        </div>
    </div>


    
    </Card>
  </div>

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

export default PublishedCard;