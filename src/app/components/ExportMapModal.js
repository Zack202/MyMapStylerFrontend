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
  const [open, setOpen] = React.useState();
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);}
  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  }

  return (
    <div>
      <Button id="export-button" variant="contained" onClick={handleOpen} sx={{margin: 1, backgroundColor: "maroon", color: "white"}}
      >Export</Button>
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
            <b>Select which file type you would like to download:</b>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} className={styles.text}>
            Note: only JSON files can be directly re-uploaded to MMS
            </Typography>
            </Box>
            <Box  sx = {{display: 'flex', justifyContent: 'center',  mt: 2}} >
            <Button variant="contained" color="primary"  className={styles.button}>.PNG</Button>
            <Button variant="contained" color="primary"  className={styles.button}>.JPG</Button>
            <Button variant="contained" color="primary"  className={styles.button}>.JSON</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

