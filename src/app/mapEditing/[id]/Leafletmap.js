import React from 'react';
import "leaflet/dist/leaflet.css"
import { MapContainer, GeoJSON, FeatureGroup, Tooltip, useMap, Rectangle, Marker, CircleMarker } from 'react-leaflet';

import "./Leafletmap.css"
import { useEffect, useState, useContext } from 'react';
import { GlobalStoreContext } from '../../store'
import pointInPolygon from '@turf/boolean-point-in-polygon';
import { featureCollection, point } from '@turf/helpers';
import { useRef } from 'react';
import Legend from './Legend';
import L from 'leaflet';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { Button } from '@mui/material';

const BackgroundOverlay = ({ backgroundColor }) => {
  const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor,
    zIndex: 0,
  };

  return <div style={style} />;
};

const getClickedRegion = (store, lat, lng) => {

  const clickedPoint = point([lng, lat]);

  //See if geoJSONData is loaded
  if (store.currentMap && store.currentMap.mapGeometry) {
    const featureCollectionData = featureCollection(store.currentMap.mapGeometry);

    //Check if the clicked point is in any of the polygons in the feature collection
    for (const feature of featureCollectionData.features.features) {
      const isClicked = pointInPolygon(clickedPoint, feature)
      if (isClicked) {
        return (feature.properties.name).replace(/\./g, '') //May need to clean this like in server when creating map
      }
    }
  }

  return null;
};

const LeafletmapInside = (props) => {
  const { store } = useContext(GlobalStoreContext);
  const countryStyle = props.countryStyle;
  const geoJSONData = props.geoJSONData;
  const regionNameSwitch = props.regionSwitch;
  const setTempCenter = props.setTempCenter;
  const setTempZoom = props.setTempZoom;
  const backgroundColor = props.backgroundColor;
  const radius = props.radius;
  const dotColor = props.dotColor;
  const dotOpacity = props.dotOpacity;
  const cursorModes = props.cursorModes;
  const colorRegion = props.colorRegion;
  const mapColor = props.mapColor;
  const borderColor = props.borderColor;
  const borderSwitch = props.borderSwitch;
  const selectedValue = props.selectedValue;
  const regionNameColor = props.regionNameColor;
  const regionNameTextSize = props.regionNameTextSize;
  const legendColors = props.legendColors;
  const legendValues = props.legendValues;
  const regionNameToDisplay = props.regionNameToDisplay;
  const ttDirection = props.ttDirection;


  const map = useMap();

  useEffect(() => {
    if (map) {
      if (cursorModes === 'dot') {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) map.tap.disable();
        map.getContainer().style.cursor = 'crosshair';
      } else if (cursorModes === 'color') {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) map.tap.disable();
        map.getContainer().style.cursor = 'pointer';
      } else {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        if (map.tap) map.tap.enable();
        map.getContainer().style.cursor = 'grab';
      }
      map.on('moveend', () => {
        console.log('Current Zoom:', map.getZoom());
        setTempZoom(map.getZoom());
        console.log('Current Center:', map.getCenter());
        let lat = map.getCenter().lat;
        let lng = map.getCenter().lng;
        let tempCenter = [lat, lng];
        setTempCenter(tempCenter);
      });

      if (cursorModes === 'dot') {
        map.off('click');
        map.on('click', (e) => {
          if (cursorModes === 'dot') {
            let lat = e.latlng.lat;
            let lng = e.latlng.lng;
            let tempDot = [lat, lng];
            //update store
            if (store.currentMap && store.currentMap.mapFeatures) {
              let updatedMap = { ...store.currentMap }
              let tempDataPoints = [...store.currentMap.mapFeatures.DP]
              tempDataPoints.push(tempDot)
              updatedMap.mapFeatures.DP = tempDataPoints
              store.updateCurrentMapLocally(updatedMap)
            }
          }
        });
      }
      else if (cursorModes === 'sized dot') {
        map.off('click');
        map.on('click', (e) => {
          if (cursorModes === 'sized dot') {
            let lat = e.latlng.lat;
            let lng = e.latlng.lng;
            let val = 5;
            let tempDot = [lat, lng, val];
            //update store
            if (store.currentMap && store.currentMap.mapFeatures) {
              let updatedMap = { ...store.currentMap }
              let tempDataPoints = [...store.currentMap.mapFeatures.DP]
              tempDataPoints.push(tempDot)
              updatedMap.mapFeatures.DP = tempDataPoints
              store.updateCurrentMapLocally(updatedMap)
            }
          }
        });

      }
      else if (cursorModes === 'color') {
        map.off('click');
        map.on('click', (e) => {
          if (cursorModes === 'color' && store.currentMap && store.currentMap.mapFeatures) {
            let lat = e.latlng.lat;
            let lng = e.latlng.lng;
            let clickedRegion = getClickedRegion(store, lat, lng);

            if (clickedRegion) {
              let updatedMap = { ...store.currentMap };
              let tempColors = { ...store.currentMap.mapFeatures.ADV };

              Object.keys(tempColors).forEach(region => {
                if (!Array.isArray(tempColors[region])) {
                  tempColors[region] = [{}]; //shouldnt be necessary but just in case
                } else if (!tempColors[region][0]) {
                  tempColors[region][0] = {};
                }

                if (!tempColors[region][0].hasOwnProperty('color')) {
                  tempColors[region][0].color = ""; // Add the 'color' property if it doesn't exist
                }
              });

              tempColors[clickedRegion][0].color = colorRegion;

              updatedMap.mapFeatures.ADV = tempColors;
              store.updateCurrentMapLocally(updatedMap);
            }
          }
        });
      } else {
        map.off('click');
      }
    }
  }, [map, cursorModes, colorRegion]);

  const getRegionColor = (regionName) => {

    //Clean region name
    regionName = regionName.replace(/\./g, '');
    if (store.currentMap && store.currentMap.mapFeatures && store.currentMap.mapFeatures.ADV) {
      const regionColors = store.currentMap.mapFeatures.ADV;
      if (regionColors[regionName] && regionColors[regionName].length > 0) {
        const color = regionColors[regionName][0].color;
        if (color) {
          return color;
        } else {
          return mapColor;
        }
      } else {
        return mapColor;
      }
    }
  }

  return (
    <div>
      <BackgroundOverlay backgroundColor={backgroundColor} />
      <GeoJSON style={countryStyle} data={geoJSONData} />


      <FeatureGroup>
        {regionNameSwitch &&
          geoJSONData &&
          regionNameToDisplay === "" &&
          geoJSONData.features.map((feature, index) => (
            <GeoJSON
              pane="markerPane"
              style={(feature) => ({
                fillColor: getRegionColor(feature.properties.name),
                color: 'transparent',
                fillOpacity: 0,
              })}
              key={index}
              data={feature}
              onEachFeature={(feature, layer) => {
                let content = `<div style="color: ${regionNameColor}; font-size: ${regionNameTextSize}px">${feature.properties.name}</div>`;
                layer.bindTooltip(content, { permanent: true, direction: ttDirection });
              }}
            />
          ))
        }

        {regionNameSwitch && regionNameToDisplay !== "" && store.currentMap && store.currentMap.mapFeatures && store.currentMap.mapFeatures.ADV &&
          geoJSONData.features.map((feature, index) => (
            <GeoJSON
              pane="markerPane"
              style={(feature) => ({
                fillColor: getRegionColor(feature.properties.name),
                color: 'transparent',
                fillOpacity: 0,
              })}
              key={index}
              data={feature}
              onEachFeature={(feature, layer) => {
                let cleanRegionName = feature.properties.name.replace(/\./g, '');
                const advData = store.currentMap.mapFeatures.ADV[cleanRegionName];
                if (advData) {
                  const regionProperties = advData[0];
                  if (regionNameToDisplay in regionProperties) {
                    const featurePropertyValue = regionProperties[regionNameToDisplay];
                    let content = `<div style="color: ${regionNameColor}; font-size: ${regionNameTextSize}px">${featurePropertyValue}</div>`;
                    layer.bindTooltip(content, { permanent: true, direction: ttDirection });
                  }
                }
              }}
            />
          ))
        }
      </FeatureGroup>

      <FeatureGroup>
        {geoJSONData &&
          geoJSONData.features.map((feature, index) => (
            <GeoJSON
              style={(feature) => ({
                fillColor: getRegionColor(feature.properties.name),
                fillOpacity: 1,
                color: 'transparent',
              })}
              key={index}
              data={feature}
            />
          ))}
      </FeatureGroup>

      {store.currentMap && store.currentMap.mapType && store.currentMap.mapType === 3 && store.currentMap.mapFeatures && store.currentMap.mapFeatures.DP && store.currentMap.mapFeatures.DP.map((coord, index) => (
        <CircleMarker
          key={index}
          center={coord}
          radius={radius}
          pathOptions={{ color: 'transparent', fillColor: dotColor, fillOpacity: dotOpacity, opacity: dotOpacity }}
        />
      ))}

      {store.currentMap && store.currentMap.mapType && store.currentMap.mapType === 2 && store.currentMap.mapFeatures && store.currentMap.mapFeatures.DP && store.currentMap.mapFeatures.DP.map(
        (coord, index) => (
        <CircleMarker
          key={index}
          center={[coord[0], coord[1]]}
          radius={coord[2]}
          pathOptions={{ color: 'transparent', fillColor: dotColor, fillOpacity: dotOpacity, opacity: dotOpacity }}
        />
      ))}
    </div>
  )


}

export default function Leafletmap(props) {
  const { store } = useContext(GlobalStoreContext);

  const mapGeo = props.mapGeo;
  const borderSwitch = props.borderSwitch;
  const borderWidth = props.borderWidth;
  const borderColor = props.borderColor;
  const regionSwitch = props.regionSwitch;
  const regionNameColor = props.regionNameColor;
  const backgroundColor = props.backgroundColor;
  const center = props.center;
  const zoom = props.zoom;
  const setTempCenter = props.setTempCenter;
  const setTempZoom = props.setTempZoom;
  const mapColor = props.mapColor;
  const radius = props.radius;
  const dotColor = props.dotColor;
  const dotOpacity = props.dotOpacity;
  const cursorModes = props.cursorModes;
  const colorRegion = props.colorRegion;
  const selectedValue = props.selectedValue;
  const regionNameTextSize = props.regionNameTextSize;
  const legendColors = props.legendColors;
  const legendValues = props.legendValues;
  const legendOn = props.legendOn;
  const legendName = props.legendName;
  const regionNameToDisplay = props.regionNameToDisplay;
  const ttDirection = props.ttDirection;
  const mapName = props.mapName;

  if (typeof window !== 'undefined') {
    const mapRef = useRef(null);
    const [geoJSONData, setGeoJSONData] = useState(null);


    useEffect(() => {
      setGeoJSONData(mapGeo);
    }, [mapGeo]);

    const captureMapAsPNG = () => {
      const mapContainer = document.getElementById('mapC');
      if (!mapContainer) {
        console.error('Map container not found');
        return;
      }
    
      htmlToImage.toPng(mapContainer)
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = mapName + '_image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); 
      })
      .catch(function (error) {
        console.error('Something went wrong!', error);
      });
  };

  const captureMapAsJPG = () => {
    const mapContainer = document.getElementById('mapC');
    if (!mapContainer) {
      console.error('Map container not found');
      return;
    }
  
    htmlToImage.toJpeg(mapContainer)
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = mapName + '_image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(function (error) {
      console.error('Something went wrong!', error);
    });
};

  const downloadAsJSON = () => {
    let mapData = {
      geo: {...store.currentMap.mapGeometry},
      mapFeatures: {...store.currentMap.mapFeatures}
    }
    

    const jsonMapData = JSON.stringify(mapData);

    // Create a Blob from the JSON data
    const blob = new Blob([jsonMapData], { type: 'application/json' });

    // Create a download link and trigger a click event
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = store.currentMap.name + '.json';
    link.click();
  }


    return (
      <div>
        <MapContainer id='mapC' ref={mapRef} style={{ height: "71vh" }} center={center} zoom={zoom}>

          <LeafletmapInside
            geoJSONData={geoJSONData}
            regionSwitch={regionSwitch}
            setTempCenter={setTempCenter}
            setTempZoom={setTempZoom}
            backgroundColor={backgroundColor}
            radius={radius}
            dotColor={dotColor}
            dotOpacity={dotOpacity}
            cursorModes={cursorModes}
            colorRegion={colorRegion}
            mapColor={mapColor}
            borderColor={borderColor}
            borderSwitch={borderSwitch}
            selectedValue={selectedValue}
            regionNameColor={regionNameColor}
            regionNameTextSize={regionNameTextSize}
            legendColors={legendColors}
            legendValues={legendValues}
            regionNameToDisplay={regionNameToDisplay}
            ttDirection={ttDirection}

          />
          {legendOn && (
            <Legend
              legendColors={legendColors}
              legendValues={legendValues}
              mapColor={mapColor}
              legendName={legendName}
              dotColor={dotColor}
              radius={radius}
            />)}
          {borderSwitch && (
            <FeatureGroup>
              <GeoJSON
                style={{
                  weight: borderWidth,
                  color: borderColor,
                  fillOpacity: 0,
                }}
                data={geoJSONData}
              />
            </FeatureGroup>
          )}

        </MapContainer>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', background: '#d4d4d4', padding: '12px' }}>
        <Button onClick={captureMapAsPNG} variant="contained" sx={{ backgroundColor: 'maroon', color: '#FFFFFF','&:hover': {
                backgroundColor: 'maroon',
                }, }}>
          Export as PNG
        </Button>
        <Button onClick={captureMapAsJPG} variant="contained" sx={{ backgroundColor: 'maroon', color: '#FFFFFF','&:hover': {
                backgroundColor: 'maroon',
                }, }}>
          Export as JPG
        </Button>
        <Button onClick={downloadAsJSON} variant="contained" sx={{ backgroundColor: 'maroon', color: '#FFFFFF','&:hover': {
                backgroundColor: 'maroon',
                }, }}>
          Export as json
        </Button>
      </div>
      </div>
    );
  } else {

    return null
  }
}

