import React from 'react';
import "leaflet/dist/leaflet.css"
import { MapContainer, GeoJSON, FeatureGroup, Tooltip, useMap, Rectangle, Marker, CircleMarker } from 'react-leaflet';

import "./Leafletmap.css"
import { useEffect, useState, useContext } from 'react';
import customA from './customA.geo.json'
import { GlobalStoreContext } from '../../store'
import pointInPolygon from '@turf/boolean-point-in-polygon';
import { featureCollection, point } from '@turf/helpers';
import { useRef } from 'react';
import Legend from './Legend';

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
      } else if (cursorModes === 'color') {
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
          selectedValue === "" &&
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
                layer.bindTooltip(content, { permanent: true });
              }}
            />
          ))
        }

        {regionNameSwitch && selectedValue !== "" && store.currentMap && store.currentMap.mapFeatures && store.currentMap.mapFeatures.ADV &&
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
                  if (selectedValue in regionProperties) {
                    const featurePropertyValue = regionProperties[selectedValue];
                    let content = `<div style="color: ${regionNameColor}; font-size: ${regionNameTextSize}px">${featurePropertyValue}</div>`;
                    layer.bindTooltip(content, { permanent: true });
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
      
      {store.currentMap && store.currentMap.mapFeatures && store.currentMap.mapFeatures.DP && store.currentMap.mapFeatures.DP.map((coord, index) => (
        <CircleMarker
          key={index}
          center={coord}
          radius={radius}
          pathOptions={{ color: 'transparent', fillColor: dotColor, fillOpacity: dotOpacity, opacity: dotOpacity }}
        />
      ))}
    </div>
  )


}

export default function Leafletmap(props) {
  const { store } = useContext(GlobalStoreContext);
  let mapColor, borderSwitch, borderColor, borderWidth, regionNameSwitch, regionNameColor, backgroundColor, dotColor;
  if (store.currentMap) {
    mapColor = store.currentMap.mapFeatures.edits.mapColor;
    borderSwitch = store.currentMap.mapFeatures.edits.borderSwitch;
    borderColor = store.currentMap.mapFeatures.edits.borderColor;
    borderWidth = store.currentMap.mapFeatures.edits.borderWidth;
    regionNameSwitch = store.currentMap.mapFeatures.edits.regionSwitch;
    regionNameColor = store.currentMap.mapFeatures.edits.regionNameColor;
    backgroundColor = store.currentMap.mapFeatures.edits.backgroundColor;
    dotColor = store.currentMap.mapFeatures.edits.dotColor;
  }
  else {
    mapColor = 'maroon';
    borderSwitch = true;
    borderColor = 'maroon';
    borderWidth = 1;
    regionNameSwitch = false;
    regionNameColor = 'black';
    backgroundColor = 'white';
    dotColor = 'black';
  }

  const mapGeo = props.mapGeo;
  //const borderSwitch = props.borderSwitch;
  //const borderWidth = props.borderWidth;
  //const borderColor = props.borderColor;
  //const regionSwitch = props.regionSwitch;
  //const regionNameColor = props.regionNameColor;
  //const backgroundColor = props.backgroundColor;
  const center = props.center;
  const zoom = props.zoom;
  const setTempCenter = props.setTempCenter;
  const setTempZoom = props.setTempZoom;
  //const mapColor = props.mapColor;
  const radius = props.radius;
  //const dotColor = props.dotColor;
  const dotOpacity = props.dotOpacity;
  const cursorModes = props.cursorModes;
  const colorRegion = props.colorRegion;
  const selectedValue = props.selectedValue;
  const regionNameTextSize = props.regionNameTextSize;
  const legendColors = props.legendColors;
  const legendValues = props.legendValues;
  const legendOn = props.legendOn;
  const legendName = props.legendName;

  if (typeof window !== 'undefined') {
    const mapRef = useRef(null);
    const [geoJSONData, setGeoJSONData] = useState(null);


    useEffect(() => {
      setGeoJSONData(mapGeo);
    }, [mapGeo]);


    return (
      <div>
        <MapContainer ref={mapRef} style={{ height: "70vh" }} center={center} zoom={zoom}>

          <LeafletmapInside 
      geoJSONData={geoJSONData}
      regionSwitch={regionNameSwitch}
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

      />
      {legendOn &&(
      <Legend
      legendColors={legendColors}
      legendValues={legendValues}
      mapColor={mapColor}
      legendName={legendName}
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
    </div>
  );
  }else{

    return null
  }
}

