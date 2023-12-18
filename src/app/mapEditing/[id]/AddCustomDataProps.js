import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import GlobalStoreContext from '../../store'
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Grid, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { StoreRounded } from '@mui/icons-material';



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  

export default function AddCustomDataProps(props) {

    const { store }  = useContext(GlobalStoreContext);

    const [value, setValue] = useState(() =>
      (store.currentMap && (store.currentMap.mapType === 2 || store.currentMap.mapType === 3)) ? 1 : 0
    );
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [newPropertyName, setNewPropertyName] = useState('');

    const cursorModes = props.cursorModes;
    const setCursorModes = props.setCursorModes;
    




      // Data points ***************************************************************************

      const [dataPoints, setDataPoints] = useState([]);

      const handlePointChange = (index, field, value) => {
        const newDataPoints = [...dataPoints];
        newDataPoints[index][field === 'latitude' ? 0 : 1] = value;
        setDataPoints(newDataPoints); 
      };

      const handleAddPoint = () => {
        setDataPoints([
          ...dataPoints,
          [ 0, 0 ]
        ]);
      };

      const handleAddPointByClick = () => {
        setCursorModes('dot')
      };

      const handleCancelAddPoint = () => {
        setCursorModes('')
      };


      useEffect(() => {
        if (store.currentMap && store.currentMap.mapFeatures && store.currentMap.mapFeatures.DP) {
          setDataPoints([...store.currentMap.mapFeatures.DP]);
        }
      }, [store.currentMap]);

      const copyDataToStoreDP = () => {
        if (store.currentMap && store.currentMap.mapFeatures) {
          const updatedMap = { ...store.currentMap };
          updatedMap.mapFeatures = { ...updatedMap.mapFeatures };
      
          updatedMap.mapFeatures.DP = dataPoints.map(point => [point[0], point[1]]);
      
          store.updateCurrentMapLocally(updatedMap);
        }
      };

      const handleDeletePoint = (index) => {
        const newDataPoints = [...dataPoints];
        newDataPoints.splice(index, 1);
        setDataPoints(newDataPoints);
      };


      // Additional props **************************************************************************
      const [data, setData] = useState([]);

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };


      useEffect(() => {
        if (store.currentMap && store.currentMap.mapFeatures && store.currentMap.mapFeatures.ADV) {
          const advData = store.currentMap.mapFeatures.ADV;
          const extractedData = Object.entries(advData).map(([region, properties]) => {
            const regionProperties = properties.map(property => {
              if (typeof property === 'object') {
                return property; //Use if has value
              } else {
                return {
                  [property]: '' //Set default value
                };
              }
            });
            return { region, properties: regionProperties };
          });
      
          setData(extractedData);
        }
      }, [store.currentMap]);

      const handlePropertyChange = (countryIndex, regionIndex, optionIndex, value) => {
        const newData = [...data];
        newData[countryIndex].properties[regionIndex][optionIndex] = value;
        setData(newData);
      };

    const handleAddProperty = (propertyName) => {
        if (propertyName === '') {
            return;
          }
        const newData = data.map((region) => {
            const existingPropertyNames = region.properties.map(prop => Object.keys(prop)[0]);
        
            if (!existingPropertyNames.includes(propertyName)) {
              const updatedProperties = [
                ...region.properties.slice(0), //Copy existing properties to new array
                { [propertyName]: '' }
              ];
              return {
                ...region,
                properties: updatedProperties
              };
            }
            return region;
          });
          setData(newData);
          console.log(data);
          setNewPropertyName('');
    }

    const handleDeleteProperty = (propertyName) => {
      if (propertyName === '') {
        return;
      }
    
      const updatedData = data.map(region => {
        const updatedProperties = region.properties.map(property => {
          if (property.hasOwnProperty(propertyName)) {
            delete property[propertyName];
          }
          return property;
        });
        return { ...region, properties: updatedProperties };
      });
    
      setData(updatedData);
    }


    const copyDataToStoreADV = () => {
        if (store.currentMap && store.currentMap.mapFeatures) {
          const updatedMap = { ...store.currentMap }
          updatedMap.mapFeatures = { ...updatedMap.mapFeatures }
      
          updatedMap.mapFeatures.ADV = data.reduce((acc, region) => { //change from stored form to desired form
            const properties = region.properties.reduce((propAcc, property) => {
              const [key, value] = Object.entries(property)[0]; //Extract  current key-value pair
              propAcc[key] = value; //Assign key-value pair to new object
              return propAcc;
            }, {});
            acc[region.region] = [properties]
            return acc;
          }, {});
      
          store.updateCurrentMapLocally(updatedMap)
        }
      };

    const handleRegionClick = (regionIndex) => {
        setSelectedRegion((prevSelectedRegion) => {
          if (prevSelectedRegion === regionIndex) {
            return null;
          } else {
            return regionIndex;
          }
        });
      };

return(
    <div style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {store.currentMap && (store.currentMap.mapType === 0 || store.currentMap.mapType === 1 || store.currentMap.mapType === 2 || store.currentMap.mapType === 4) &&
              (<Tab label="Additional Properties" />)}
            {store.currentMap && (store.currentMap.mapType === 2 || store.currentMap.mapType === 3) &&
            (<Tab label="Data Points" />)}
        </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
  {/* Rendering dynamic components for 'Additional Props' */}
  {data.length === 0 && <h2>No data found. File may be corrupt.</h2>}
  <h3><u>Edit Properties</u></h3>
  {data.map((region, regionIndex) => (
    <div key={`region-${regionIndex}`}>
      <h4 onClick={() => handleRegionClick(regionIndex)} style={{ cursor: 'pointer' }}>
        {region.region}
      {selectedRegion === regionIndex ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </h4>
      {selectedRegion === regionIndex && (
        <div>
          {/* Display properties of the selected region */}
          <ul>
            {region.properties.length === 0 && <h4>No properties found.</h4>}
            {region.properties.map((property, propertyIndex) => (
              <li key={`property-${propertyIndex}`}>
                {Object.entries(property).map(([key, value]) => (
                  <div key={`property-${key}`}>
                    <TextField
                      key={`textfield-${key}`}
                      label={key}
                      value={value}
                      onChange={(e) => handlePropertyChange(regionIndex, propertyIndex, key, e.target.value)}
                    />
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ))}
  <h3><u>All Current Additional Properties</u></h3>
  {/*List current data props in a list, should be able to take from one region since they
    should always be the same*/}
  {data.length > 0 && data[0].properties.length > 0 && Object.keys(data[0].properties[0]).length > 0 && (
    <ul>
      {Object.keys(data[0].properties[0]).map((property, index) => (
        <li key={`current-${index}`}>
          {property}
          <IconButton onClick={() => handleDeleteProperty(property)}><DeleteForeverIcon/></IconButton>
        </li>
      ))}
    </ul>
  )}
  <h2>Add New Property</h2>
    <TextField
    label="New Property Name"
    value={newPropertyName}
    onChange={(e) => setNewPropertyName(e.target.value)}
    fullWidth= {true}
  />
  <Button variant="contained" onClick={() => handleAddProperty(newPropertyName)}>Add New Property</Button>
  <Button variant="contained" onClick={copyDataToStoreADV}>
      Set Properties
    </Button>
</CustomTabPanel>
<CustomTabPanel value={value} index={1}>
{dataPoints.length === 0 && <h2>No data points found.</h2>}
    {dataPoints.map((point, index) => (
      <div key={`point-${index}`}>
        <h3>Point {index + 1}
        {/* Delete point button */}
        <IconButton onClick={() => handleDeletePoint(index)}>
          <DeleteForeverIcon />
        </IconButton>
        </h3>

        <div>
          <TextField
            label="Latitude"
            value={point[0]}
            onChange={(e) => handlePointChange(index, 'latitude', e.target.value)}
          />
          <TextField
            label="Longitude"
            value={point[1]}
            onChange={(e) => handlePointChange(index, 'longitude', e.target.value)}
          />
        </div>
      </div>
    ))}
<Grid container spacing={1} style={{ textAlign: 'center' }}>
  <Grid item xs={12}>
    <div>
      <h2><u>Add points manually</u></h2>
      <Button variant="contained" color="primary" onClick={handleAddPoint} fullWidth style={{ margin: '8px 0' }}>
        Add New Point by Coordinates
      </Button>
      <Button variant="contained" onClick={copyDataToStoreDP} fullWidth style={{ margin: '8px 0' }}>
        Set Data Points
      </Button>
    </div>
  </Grid>
  <Grid item xs={12}>
    <h4>or</h4>
  <h2><u>Add points by click</u></h2>
    {cursorModes == 'dot' ? (
      <Button variant="contained" onClick={handleCancelAddPoint} fullWidth style={{ marginTop: '8px' }}>
        Stop Adding Points
      </Button>
    ) : (
      <Button variant="contained" onClick={handleAddPointByClick} fullWidth style={{ marginTop: '8px' }}>
        Add New Point by Click
      </Button>
    )}
  </Grid>
</Grid>

  </CustomTabPanel>


    </div>
)
}