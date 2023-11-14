import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from './MapEditor.module.css';
import Switch from '@mui/material/Switch';
// import "@melloware/coloris/dist/coloris.css";
// import { coloris, init } from "@melloware/coloris";
import InputAdornment from '@mui/material/InputAdornment';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';


const DynamicColoris = dynamic(() => import('@melloware/coloris'), {
   ssr: false, // Disable server-side rendering for this module
   loading: () => null
 });

export default function MapEditor() {
   if (typeof window !== 'undefined') {
      useEffect(() => {
         const colorisModule = require('@melloware/coloris');
         if (colorisModule && colorisModule.init) {
           colorisModule.init();
         }
       }, []);

    const customDataProperties = "Fizzy Drink Name: String"

    const rows = [
        { color: 'red', id: 1, label: 'Soda'},
        { color: 'yellow', id: 2, label: 'Coke'},
        { color: 'blue', id: 3, label: 'Pop'},
      ];
      const columns = [
        { field: 'color', headerName: 'Colors', width: 120,
        renderCell: (params) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: params.row.color, 
                border: '1px solid black',
              }}
            ></div>
          </div>
        ),
      },
        { field: 'label', headerName: 'Labels', width: 130, editable: true},
        {
            field: 'selection',
            headerName: ' ',
            width: 50,
            renderCell: (params) => (
              <input
                type="checkbox"
                checked={params.row.isSelected}
                style={{ width: '20px', height: '20px' }}
                onChange={() => {
                  
                }}
              />
            ),
          },
        ]

    return(
         <Grid container>
            <Box className = {styles.rect_box}>
               <Box className = {styles.title_box}>
                  <Typography className= {styles.text_color} component="h1" variant="h4" style={{ textAlign: 'center' }}><b><i>Map Editor</i></b></Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Select Color:</i> { }
                  <input
                     type="color"
                     className={styles.color_box}
                     onChange={(e) => handleColorChange(e.target.value)}
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Show Borders:</i> { }
                  <FormControlLabel
                  value="start"
                  control={
                  <Switch color="primary" />
                  }
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Border Color:</i> { }
                  <input
                     type="color"
                     className={styles.color_box}
                     onChange={(e) => handleColorChange(e.target.value)}
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Border Width:</i> { }
                  <TextField
                  className={styles.text_box}
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: 100 }}
                  InputProps={{
                  endAdornment: 
                  <InputAdornment position="end">px</InputAdornment>
                  ,
                  }}
                  ></TextField>
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  <i>Show Regions Names:</i> { }
                  <FormControlLabel
                  value="start"
                  control={
                  <Switch color="primary" />
                  }
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Region Name Colors:</i> { }
                  <input
                     type="color"
                     className={styles.color_box}
                     onChange={(e) => handleColorChange(e.target.value)}
                  />
               </Typography>
               </Box>
               <Box className = {styles.item_box}>
               <Typography className= {styles.text_color} component="h1" variant="h6"><i>Text Color:</i> {}
                  <input
                     type="color"
                     className={styles.color_box}
                     onChange={(e) => handleColorChange(e.target.value)}
                  />
               </Typography>
               </Box>
               <div style={{ display: 'flex', justifyContent: 'center', padding: '10px'}}>
               <Button className={styles.button} variant="contained" fullWidth style={{ backgroundColor: '#BE8585', color: 'white' }}><b>Add Custom Properties</b></Button>
               </div>
               <Typography className= {styles.text_color} component="h1" variant="h6"><b><u>Current Custom Properties</u></b></Typography>
               <div style={{ height: '100px', overflowY: 'auto' }}>
               <Typography className= {styles.text_color} component="h6" variant="h6">{customDataProperties}</Typography>
               </div>
               <div style={{margin: '10px', background: "darkgrey", padding: "10px", margin: "-10px"}}>
               <Typography className= {styles.text_color} component="h1" variant="h6">
                  Legend: { }
                  <FormControlLabel
                  value="start"
                  control={
                  <Switch color="primary" />
                  }
                  />
                  <TextField
                  className={styles.text_box}
                  id="outlined-size-small"
                  variant="standard"
                  size="small"
                  defaultValue={"Legend"}
                  label={"Enter Legend Name"}
                  sx={{ width: 260, borderRadius: 1, marginBottom: '5px'}}>
                  
                     
                  </TextField>

            </Typography>
            
            <Box   backgroundColor="white" borderRadius={'5px'}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  editable
                  disableColumnMenu
                  hideFooterPagination
                  disableSelectionOnClick
                  />
            </Box>
            </div>
            </Box>

         </Grid>
    );
               }else{
                     return null;
               }
}