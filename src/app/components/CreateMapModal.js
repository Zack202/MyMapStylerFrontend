// import { useContext } from 'react'
// import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '10px',
};

export default function CreateMapModal() {

    const [open, setOpen] = React.useState(false);

    //code here for if user is on home screen or map browsing screen
    const openCreateMapModal = () => {setOpen(true)};
    // const { store } = useContext(GlobalStoreContext);

    // if (store.listMarkedForDeletion) {
    //     name = store.listMarkedForDeletion.name;
    // }
    const handleCloseModal = () => {setOpen(false)};


    return (
        <div>
        <Fab 
                color="black" 
                aria-label="add"
                id="add-list-button"
                onClick={openCreateMapModal}
                sx={{width: "95%", borderRadius: "5px", backgroundColor: "maroon", width: "20%", color:"white", fontWeight: "bolder"}}
                >
                    <AddIcon /> Create Map
          </Fab>
        <Modal open={open}> {/* change it true or false for now*/}
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                   Import a map in the format of GeoJSon, SHapefile or KML:
                </header>

                <div id="middle-container">
                <input type="file" accept="" id="import-map-button"/>
                </div>

                <div id="confirm-cancel-container">
                    <button
                        id="dialog-yes-button"
                        className="modal-button"
                        // onClick={handleDeleteList}
                    >Create Map</button>
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Cancel</button>
                </div>
            </div>
            </Box>
        </Modal>
        </div>
    );
}