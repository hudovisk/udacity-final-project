import React, { useState, useEffect, useRef } from "react";

import MainForm from "../../modules/MainForm";
import Map from "../../modules/Map";

import { MapsContextProvider } from "../../hooks/useMap";

import { init } from "../../lib/google-maps";

const options = {
  center: { lat: -25.479, lng: -49.228 },
  zoom: 15
};

export default () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    init().then(google => setMap(new google.maps.Map(mapRef.current, options)));
  }, []);

  return (
    <div className="home">
      <MapsContextProvider value={map}>
        {map && <MainForm />}
        <Map ref={mapRef} />
      </MapsContextProvider>
    </div>
  );
};
