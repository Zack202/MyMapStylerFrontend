import { useContext } from 'react'
// import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './EditToolbar.module.css';


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
    // const { store } = useContext(GlobalStoreContext);
    let name = "Map";
    // if (store.listMarkedForDeletion) {
    //     name = store.listMarkedForDeletion.name;
    // }
    function handleDeleteList(event) {
        // store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        // store.hideModals();
    }

    return (
        <Modal open={true}> {/* change it true or false for now*/}
            <Box sx={style}>
                <div className={styles.modal-dialog}>
                <header className={styles.dialog-header}>
                   Import a map in the format of GeoJSon, SHapefile or KML:
                </header>

                <div id={styles.middle-container}>
                <input type="file" accept="" id={styles.import-map-button}/>
                </div>

                <div id={styles.confirm-cancel-container}>
                    <button
                        id={styles.dialog-yes-button}
                        className={styles.modal-button}
                        onClick={handleDeleteList}
                    >Create Map</button>
                    <button
                        id={styles.dialog-no-button}
                        className={styles.modal-button}
                        onClick={handleCloseModal}
                    >Cancel</button>
                </div>
            </div>
            </Box>
        </Modal>
    );
}