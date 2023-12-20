//profile screen
'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import TopAppBanner from '../../Utils/TopAppBanner';
import BottomAppBanner from '../../Utils/BottomAppBanner';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//specifically from modal
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Modal from '@mui/material/Modal';
import AuthContext from '../../auth';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlobalStoreContext from '../../store';
import MUIErrorModal from '../../components/MUIErrorModal';


const defaultTheme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    primary: {
      main: '#990000'
    },
    secondary: {
      main: '#800000'
    },
  }
},);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'maroon',
  border: '2px solid #000',
  boxShadow: 24,
  p:1,
  color: 'white'
};


let exampleUser = {
  userName: "",//"Mapy",
  firstName: "",//"Jane",
  lastName: "", //"Doe",
  email: "",//"jd@stonybrook.edu",
  //comments?????
  maps: ["21321321", "02103021", "921321321"] //NEED METHODS FOR GETTING THEIR DATA
}


export default function Profile() {

  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  if(auth.loggedIn){
    exampleUser.userName = auth.user.userName;
    exampleUser.firstName = auth.user.firstName;
    exampleUser.lastName = auth.user.lastName;
    exampleUser.email = auth.user.email;
  }

  //for modal
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [errorModal, setErrorModal] = React.useState(false);



  const [formData, setFormData] = useState({
    firstName: exampleUser.firstName,
    lastName: exampleUser.lastName,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if(formData.firstName === "" || formData.lastName === ""){
      setErrorModal(true);
    }
    else{
      let data = {
        firstName: formData.firstName,
        lastName: formData.lastName
      }

      console.log("DATA:", data);
    
      auth.updateUserInfo(data);
      handleCloseEdit();
    }
  };

  function handleCloseErrorModal(event) {
    event.stopPropagation();

    setErrorModal(false);
}

  const handleCloseConfirm = () => {
    console.log("Delete Profile");
    auth.deleteUser();
    handleCloseDelete();
  }


  return (
      <Grid container align={'center'} >

        <Grid item xs={12} >
          <TopAppBanner link={"/home"}/>
        </Grid>

        <Grid item xs={12} >
         <ThemeProvider theme={defaultTheme}>
          <CssBaseline />

          <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                    Profile
          </Typography>

          <Box sx={{ marginRight: 1, marginBottom: '120px', height: '250px', textAlign: 'center', borderRadius: '10px',
           width: ".80", bgcolor: '#f2b8b8' }}>
              <Typography variant="h5"> Account Settings </Typography>
              <Typography textAlign='center'>First Name: {exampleUser.firstName}</Typography>
              <Typography textAlign='center'>Last Name: {exampleUser.lastName}</Typography>
              <Typography textAlign='center'>User Name: {exampleUser.userName}</Typography>
              <Typography textAlign='center'>Email: {exampleUser.email}</Typography>
              <Grid container spacing={1} align="center" sx={{marginTop: 2}}>
                          <Grid item xs={12}>
                            <Button onClick={handleOpenEdit} variant="contained" color="primary" >
                              Edit Account Information
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Button onClick={handleOpenDelete} variant="contained" color="primary">
                              Delete Profile
                            </Button>
                           </Grid>
              </Grid>
           </Box>

           <Modal
                  open={openDelete}
                  onClose={handleCloseDelete}
                >
                  <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: "#d4d4d4",
                        p: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Typography component="h1" variant="h5">
                        Are you sure you want to delete your account?
                      </Typography>
                      <Grid container align="center" >
                        <Grid item xs={6}>
                      <Button onClick={handleCloseDelete} variant="contained" color="primary" sx={{marginTop: 1}}>
                        Cancel
                      </Button>
                      </Grid>
                      <Grid item xs={6} >
                      <Button onClick={handleCloseConfirm} variant="contained" color="primary" sx={{marginTop: 1}}>
                        Delete
                      </Button>
                      </Grid>
                      </Grid>
                      </Box>
                  </Container>
                </Modal>
                <Modal
                  open={openEdit}
                  onClose={handleCloseEdit}
                >
                  <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: '#d4d4d4',
                        p: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Change Account Information
                      </Typography>
                      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              autoComplete="given-name"
                              name="firstName"
                              required
                              fullWidth
                              id="firstName"
                              label="First Name"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="lastName"
                              label="Last Name"
                              name="lastName"
                              autoComplete="family-name"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                          </Grid>
                        </Grid>

                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  </Container>
                </Modal>

                <Modal
            open={errorModal}
            >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                    Error: {"Both Fields Must Be Filled To Submit."}
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseErrorModal}
                    >Close</button>
                </div>
            </div>
            </Box>
        </Modal>


          </ThemeProvider>
        </Grid>

        <Grid item xs={12} >
          <BottomAppBanner />
        </Grid>
  

    </Grid>

  );
}  