import { useState, useEffect } from "react";

import useGoogle from "./useGoogle";

export default function usePlaces(map) {
  const google = useGoogle();
  const [placesService, setPlacesService] = useState(
    new google.maps.places.PlacesService(map)
  );

  useEffect(() => setPlacesService(new google.maps.places.PlacesService(map)), [
    map
  ]);

  return placesService;
}
