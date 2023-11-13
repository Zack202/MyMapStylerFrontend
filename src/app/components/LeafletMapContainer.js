import React, { Component, useEffect, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import TestFile from "public/customSA.geo.json"
// const shp = require('shpjs');

function LeafletMapContainer() {
  // if(props.file == null){
  //   return null;
  // }
  // const file = TestFile;
  const fileType = ".json";
  const geoJSONKey = JSON.stringify(TestFile);

  const countryStyle = {
    fillColor: "maroon",
    fillOpacity: 1,
    color: "black",    
    weight: 2
  };

  const [mapData, setMapData] = useState(null);


  const handleFileSubmit = async(event) => {
    const selectedFile = event.target.files[0];
    const fileContent = await selectedFile.text();
    const parsedData = JSON.parse(fileContent);
    setMapData(parsedData);
  }


  return (
    <div id="map">
      <input type="file" id="mapfile" name="mapfile" accept="" onChange={handleFileSubmit}/>
      <MapContainer key={geoJSONKey} style={{height: "80vh"}} center={[20,100]} zoom={2}>
        <GeoJSON style = {countryStyle} data={mapData}
        onEachFeature={(feature, layer) => {
          if(fileType === "zip"){
            console.log("zip")
            if (feature.properties && feature.properties.NAME_1) {
              layer.bindTooltip(feature.properties.NAME_1, { permanent: true });
            }
          }else{
            if (feature.properties && feature.properties.name) {
              layer.bindTooltip(feature.properties.name, { permanent: true });
            }
          }
        }}/>
      </MapContainer>
    </div>
  );
}

export default LeafletMapContainer;