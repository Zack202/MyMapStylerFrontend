import React from 'react';
import "leaflet/dist/leaflet.css"
import { MapContainer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "./Leafletmap.css"
import { useEffect, useState, useContext } from 'react';
import customA from './customA.geo.json'
import { GlobalStoreContext } from '../../store'

export default function Leafletmap(props) {
  const {mapGeo,mapColor} = props;
  const { store } = useContext(GlobalStoreContext);
  if (typeof window !== 'undefined') {
    const [geoJSONData, setGeoJSONData] = useState(null);

    useEffect(() => {
      setGeoJSONData(mapGeo);
    }, []);

  const countryStyle = {
    fillColor: mapColor,
    fillOpacity: 1,
    color: "black",
    weight: 2
  };


  return (
    <div>
      <MapContainer style={{height: "84vh"}} center={[20,100]} zoom={2}>
        <GeoJSON style = {countryStyle} data={geoJSONData} />
      </MapContainer>
    </div>
  );
  }else{
    return null
  }
}

