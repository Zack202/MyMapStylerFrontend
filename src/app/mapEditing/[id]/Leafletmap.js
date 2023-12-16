import React from 'react';
import "leaflet/dist/leaflet.css"
import { MapContainer, GeoJSON, FeatureGroup, Tooltip, useMap, Rectangle, Marker, CircleMarker } from 'react-leaflet';

import "./Leafletmap.css"
import { useEffect, useState, useContext } from 'react';
import customA from './customA.geo.json'
import { GlobalStoreContext } from '../../store'
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
  const addDot = props.addDot;
  


  const map = useMap();

  useEffect(() => {
    if (map) {
      if (addDot) {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) map.tap.disable();
        map.getContainer().style.cursor = 'crosshair';
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
      if (addDot) {
      map.on('click', (e) => {
        if (addDot) {
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
  } else {
    map.off('click');
  }
    }
  }, [map, addDot]);



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
        style={{
          fillColor: 'transparent',
          color: 'transparent',
        }}
          key={index}
          data={feature}
          onEachFeature={(feature, layer) => {
            const bounds = layer.getBounds();
            if (regionSwitch) {
              layer.bindTooltip(feature.properties.name, { permanent: true });
            } else {
              layer.unbindTooltip();
            }
          }}
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
  const addDot = props.addDot;

  if (typeof window !== 'undefined') {
    const mapRef = useRef(null);
    const [geoJSONData, setGeoJSONData] = useState(null);


    useEffect(() => {
      setGeoJSONData(mapGeo);
    }, [mapGeo]);
  

  let countryStyle = {
    fillColor: mapColor,
    fillOpacity: 1,
    color: borderColor,
    weight: borderWidth,
  };
  if (!borderSwitch) {
    countryStyle = {
      fillColor: mapColor,
      fillOpacity: 1,
      color: 'transparent',
      weight: 0,
    };
  }


  return (
    <div>
      <MapContainer ref={mapRef} style={{height: "70vh"}} center={center} zoom={zoom}>
      <LeafletmapInside 
      countryStyle={countryStyle}
      geoJSONData={geoJSONData}
      regionSwitch={regionSwitch}
      setTempCenter={setTempCenter}
      setTempZoom={setTempZoom}
      backgroundColor={backgroundColor}
      radius={radius}
      dotColor={dotColor}
      dotOpacity={dotOpacity}
      addDot={addDot}

      />
      </MapContainer>
    </div>
  );
  }else{
    return null
  }
}

