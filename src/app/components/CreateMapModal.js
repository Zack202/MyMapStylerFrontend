import { useContext } from 'react'
// import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './CreateMapModal.css';


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

export default function CreateMapModal(props) {
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
        <Modal open={props.open}> {/* change it true or false for now*/}
            <Box sx={style}>
                <div className={styles.modal_dialog}>
                <header className={styles.dialog_header}>
                   Import a map in the format of GeoJSon, SHapefile or KML:
                </header>

                <div id={styles.middle_container}>
                <input type="file" accept="" id={styles.import_map_button}/>
                </div>

                <div id={styles.confirm_cancel_container}>
                    <button
                        id={styles.dialog_yes_button}
                        className={styles.modal_button}
                        onClick={handleDeleteList}
                    >Create Map</button>
                    <button
                        id={styles.dialog_no_button}
                        className={styles.modal_button}
                        onClick={handleCloseModal}
                    >Cancel</button>
                </div>
            </div>
            </Box>
        </Modal>
    );
}