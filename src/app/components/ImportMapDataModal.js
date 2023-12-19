import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './ImportMapDataModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';
import GlobalStoreContext from '../store';
import { useContext } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  height: '30%',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundImage: 'url("./contour-lines.svg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '50px',
};

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'transparent',
};

export default function ImportMapDataModal() {
  const { store } = useContext(GlobalStoreContext);
  const cursorStyle = {
    cursor: 'pointer', 
  };

  const [selectedOption, setSelectedOption] = useState('Additional Region Data');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setFile(null);
    setButtonEnable(true);
    setOpen(true); 
    }
  const handleClose = () => {
    setOpen(false);
  }
    

  const [file, setFile] = useState(null);
  const [buttonEnable, setButtonEnable] = useState(true);
  const [invalidFile, setInvalidFile] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setButtonEnable(false);
    console.log(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setButtonEnable(false);
    console.log(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmitFile = (event) => {
    event.preventDefault();
    store.takeAdditionalData(file, selectedOption);
    handleClose();
  }

  return (
    <div>
      <Button className={styles.button} variant="contained" fullWidth style={{ backgroundColor: '#BE8585', color: 'white' }}
      onClick={handleOpen}><b>Add Custom Properties</b></Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            style: backdropStyle,
          },
        }}
      >
        <Fade in={open}>
          <Box         className={styles.centeredcontainer}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleClose} className={styles.closeButton}>
              <CloseIcon />
            </Button>
            </Box>
            <Box sx={{ background: "lightgrey", margin: '30px', borderRadius: '10px', textAlign: 'center', border: "2px solid #000"}}>
            <Typography id="transition-modal-title" variant="h5" component="h7" className={styles.text}>
            <b>Drag your map data into the box below.</b>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} className={styles.text}>
            <b>Note: Only .CSV are supported at this time. </b><br></br>
            If uploading <b>additional region data</b> please ensure the first collumn is the name of the region, and the proceeding collumns are the properties you wish to add with their label as the collumn name. <br></br>
            If uploading <b>data points</b> please ensure the first collumn of your data latitude and the second collumn is longitude. <br></br>
            If uploading <b>data points for sized dot maps</b> please follow the format above and add a third collumn with the size of the dot. <br></br>
            Information will only be added to <b>regions that already exist</b> on the map.
            </Typography>
            </Box>
            <label htmlFor='fileInput' style={cursorStyle} >
                    <div 
              style={{
                border: '4px dashed #ccc',
                padding: '20px',
                textAlign: 'center',
                color: '#000000',
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".csv"
              />
              <label htmlFor='fileInput' style={cursorStyle} >
                Click or drag files here to upload
              </label>
              <p>Selected file: {file ? file.name : 'None'}</p>
            </div>
            </label>
            <RadioGroup
        value={selectedOption}
        onChange={handleOptionChange}
        row
      >
        <FormControlLabel
          value="Additional Region Data"
          control={<Radio />}
          label="Additional Region Data"
        />
        <FormControlLabel
          value="Data points"
          control={<Radio />}
          label="Data points"
          disabled={
            store.currentMap && store.currentMap.mapType &&
            (store.currentMap.mapType === 5 || store.currentMap.mapType === 1 || store.currentMap.mapType === 4)
          }
        />
      </RadioGroup>

            <Box  sx = {{display: 'flex', justifyContent: 'center',  mt: 2}} >
              <p className={styles.text}>{invalidFile ? "File could not be parsed" : ""}</p>
            <Button onClick={handleSubmitFile} variant="contained" color="primary"  disabled={buttonEnable} className={styles.button}>{file ? "Confirm Upload" : "Please Upload a Valid File"}</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
