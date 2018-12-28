import { useState, useEffect } from "react";

import { init } from "../lib/google-maps";

export default function usePlaces(map) {
  const [placesService, setPlacesService] = useState(null);

  console.log(map)

  useEffect(
    () => {
      init().then(google => {
        const places = new google.maps.places.PlacesService(map)
        setPlacesService(places)
        console.log(places)
      });
    },
    [map]
  );

  return placesService;
}
