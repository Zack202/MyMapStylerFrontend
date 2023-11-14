import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './ExportMapModal.module.css';
import CloseIcon from '@mui/icons-material/Close';

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

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  }
  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  }

  return (
    <div>
      <Button 
                // disabled={!store.canRedo()}
                id='delete-button'
                variant="contained"
                sx={{margin: 1, backgroundColor: "maroon"}}
                onClick = {handleOpen}
                >
                Delete
            </Button>
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
          <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleClose} className={styles.closeButton}>
              <CloseIcon />
            </Button>
            </Box>
            <Box sx={{ background: "lightgrey", margin: '30px', borderRadius: '10px', textAlign: 'center', border: "2px solid #000"}}>
            <Typography id="transition-modal-title" variant="h5" component="h7" className={styles.text}>
            <b>Are you sure you would like to delete this map?</b>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} className={styles.text}>
            Note: This action cannot be undone. Maps are permanently deleted.
            </Typography>
            </Box>
            <Box  sx = {{display: 'flex', justifyContent: 'center', padding: "70px", paddingTop: '20px'}} >
            <Button variant="contained" color="primary"  className={styles.button}>Cancel</Button>
            <Button variant="contained" color="primary"  className={styles.button}>Confirm</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

