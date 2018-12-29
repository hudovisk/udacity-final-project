import React, { useState, useEffect, useRef } from "react";

import MainForm from "../../modules/MainForm";
import Map from "../../modules/Map";

import { MapsContextProvider } from "../../hooks/useMap";

import useGoogle from "../../hooks/useGoogle";
import Marker from "../../modules/Marker";

const options = {
  center: { lat: -25.479, lng: -49.228 },
  zoom: 15
};

export default function Home() {
  const google = useGoogle();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMap(new google.maps.Map(mapRef.current, options));
  }, []);

  const handlePlacesResult = places => {
    // If we only returned one result center on it
    if (places.length === 1) {
      if (places[0].geometry.viewport) {
        map.fitBounds(places[0].geometry.viewport);
      } else {
        map.setCenter(places[0].geometry.location);
        map.setZoom(17);
      }
    }

    console.log("setMarkers", places);
    setMarkers(places.slice());
  };

  return (
    <MapsContextProvider value={map}>
      <div className="home">
        {map && <MainForm onPlacesResult={handlePlacesResult} />}

        <Map ref={mapRef} />

        {map && markers.map(place => (
          <Marker place={place} location={place.geometry.location} key={place.reference} />
        ))}
      </div>
    </MapsContextProvider>
  );
};
