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
  const regionSwitch = props.regionSwitch;
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
      map.on('click', (e) => {
        if (cursorModes === 'dot') {
          let lat = e.latlng.lat;
          let lng = e.latlng.lng;
          let tempDot = [lat, lng];
          //update store
          if(store.currentMap && store.currentMap.mapFeatures){
            let updatedMap = {...store.currentMap}
            let tempDataPoints = [...store.currentMap.mapFeatures.DP]
            tempDataPoints.push(tempDot)
            updatedMap.mapFeatures.DP = tempDataPoints
            store.updateCurrentMapLocally(updatedMap)
          }
        }
    });
      } else if (cursorModes === 'color'){
        map.on('click', (e) => {
          if (cursorModes === 'color' && store.currentMap && store.currentMap.mapFeatures) {
            let lat = e.latlng.lat;
            let lng = e.latlng.lng;
            let clickedRegion = getClickedRegion(store, lat, lng);
        
            if (clickedRegion) {
              let updatedMap = { ...store.currentMap };
              let tempColors = { ...store.currentMap.mapFeatures.ADV };
        
              Object.keys(tempColors).forEach(region => {
                if (!tempColors[region].some(obj => obj.hasOwnProperty('color'))) {
                  tempColors[region].push({ color: "" });
                }
              });
        
              if (!tempColors[clickedRegion].some(obj => obj.hasOwnProperty('color'))) {
                tempColors[clickedRegion].push({ color: colorRegion });
              } else {
                tempColors[clickedRegion] = [{ color: colorRegion }];
              }
        
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
    if (regionColors[regionName]) {
      const color = regionColors[regionName][0].color;
      if (color) {
        return color;
      } else {
        return mapColor;
      }
    }
  }
}

return (
  <div>
    <BackgroundOverlay backgroundColor={backgroundColor} />
    <GeoJSON style = {countryStyle} data={geoJSONData} />
    {store.currentMap && store.currentMap.mapFeatures && store.currentMap.mapFeatures.DP && store.currentMap.mapFeatures.DP.map((coord, index) => (
        <CircleMarker
        key={index}
        center={coord}
        radius={radius}
        pathOptions={{ color: 'transparent' , fillColor: dotColor, fillOpacity: dotOpacity, opacity: dotOpacity}}
    />
      ))}

<FeatureGroup>
  {regionSwitch &&
    geoJSONData &&
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
          layer.bindTooltip(feature.properties.name, { permanent: true });
        }}
      />
    ))}
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
</div>
)


}

export default function Leafletmap(props) {

  const mapGeo = props.mapGeo;
  const borderSwitch = props.borderSwitch;
  const borderWidth = props.borderWidth;
  const borderColor = props.borderColor;
  const regionSwitch = props.regionSwitch;
  const regionNameColor = props.regionNameColor;
  const { store } = useContext(GlobalStoreContext);
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

  if (typeof window !== 'undefined') {
    const mapRef = useRef(null);
    const [geoJSONData, setGeoJSONData] = useState(null);


    useEffect(() => {
      setGeoJSONData(mapGeo);
    }, [mapGeo]);
  



  return (
    <div>
      <MapContainer ref={mapRef} style={{height: "70vh"}} center={center} zoom={zoom}>
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

      />
      </MapContainer>
    </div>
  );
  }else{
    return null
  }
}

