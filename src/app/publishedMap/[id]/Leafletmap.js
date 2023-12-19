import React from 'react';
import "leaflet/dist/leaflet.css"
import { MapContainer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "./Leafletmap.css"
import { useEffect, useState } from 'react';
import customA from './customA.geo.json'

export default function Leafletmap() {
    const [geoJSONData, setGeoJSONData] = useState(null);

  const countryStyle = {
    fillColor: "maroon",
    fillOpacity: 1,
    color: "black",
    weight: 2
  };


  return (
    <div>
      <MapContainer style={{height: "63vh"}} center={[20,100]} zoom={2}>
        <GeoJSON style = {countryStyle} data={geoJSONData} />
      </MapContainer>
    </div>
  );
}

