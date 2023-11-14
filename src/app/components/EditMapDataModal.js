'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';


import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                MyMapStyler
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

export default function AddData() {
    const [region, setRegion] = React.useState('');

    const handleChange = (event) => {
        setRegion(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (

        <ThemeProvider theme={defaultTheme}><Button type="button" onClick={handleOpen}>
            Open modal
        </Button>
            <Modal
                open={open}
                onClose={handleClose}>


                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: 'background.paper',
                            p:2
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Edit Map Data
                        </Typography>
                        <Box sx={{ minWidth: 120, marginTop: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Region</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={region}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>France</MenuItem>
                                    <MenuItem value={20}>Spain</MenuItem>
                                    <MenuItem value={30}>Germany</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="GDP"
                                        name="gdp"
                                        required
                                        fullWidth
                                        id="gdp"
                                        label="GDP"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="population"
                                        label="Population"
                                        name="population"
                                        autoComplete="Population"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="geesepop"
                                        label="Geese Population"
                                        name="geesepop"
                                        autoComplete="Geese Population"
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add Data Property
                            </Button>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </Modal>
        </ThemeProvider>

    );
}