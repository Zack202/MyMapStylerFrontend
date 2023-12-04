import React from 'react';
import "leaflet/dist/leaflet.css"
import { MapContainer, GeoJSON, FeatureGroup, Tooltip, useMap, Rectangle } from 'react-leaflet';

import "./Leafletmap.css"
import { useEffect, useState, useContext } from 'react';
import customA from './customA.geo.json'
import { GlobalStoreContext } from '../../store'
import { useRef } from 'react';
import styled from 'styled-components';

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
  const countryStyle = props.countryStyle;
  const geoJSONData = props.geoJSONData;
  const regionSwitch = props.regionSwitch;
  const setTempCenter = props.setTempCenter;
  const setTempZoom = props.setTempZoom;
  const backgroundColor = props.backgroundColor;


  const map = useMap();

  useEffect(() => {
    if (map) {
      map.on('moveend', () => {
        console.log('Current Zoom:', map.getZoom());
        setTempZoom(map.getZoom());
        console.log('Current Center:', map.getCenter());
        let lat = map.getCenter().lat;
        let lng = map.getCenter().lng;
        let tempCenter = [lat, lng];
        setTempCenter(tempCenter);
      });
    }
  }, [map]);


return (
  <div>
    <BackgroundOverlay backgroundColor={backgroundColor} />
    <GeoJSON style = {countryStyle} data={geoJSONData} />
    <FeatureGroup>
    {regionSwitch &&
      geoJSONData &&
      geoJSONData.features.map((feature, index) => (
        <GeoJSON
          key={index}
          data={feature}
          onEachFeature={(feature, layer) => {
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
      <MapContainer ref={mapRef} style={{height: "84vh"}} center={center} zoom={zoom}>
      <LeafletmapInside 
      countryStyle={countryStyle}
      geoJSONData={geoJSONData}
      regionSwitch={regionSwitch}
      setTempCenter={setTempCenter}
      setTempZoom={setTempZoom}
      backgroundColor={backgroundColor}

      />
      </MapContainer>
    </div>
  );
  }else{
    return null
  }
}

