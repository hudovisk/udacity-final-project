import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import useMap from "../../hooks/useMap";
import useMarker from "../../hooks/useMarker";
import useGoogle from "../../hooks/useGoogle";
import MarkerDetails from "./MarkerDetails";
import useInfoWindow from "../../hooks/useInfoWindow";

export default function Marker({ place, location }) {
  const infoNode = useRef(document.createElement('div'));
  const infoWindow = useInfoWindow();
  const google = useGoogle();
  const map = useMap();
  const marker = useMarker(map, location);

  useEffect(() => {
    const markerLsr = google.maps.event.addListener(
      marker.current,
      "click",
      handleClick
    );

    return () => google.maps.event.removeListener(markerLsr);
  });

  const handleClick = () => {
    ReactDOM.render(<MarkerDetails place={place} />, infoNode.current);

    infoWindow.setContent(infoNode.current);
    infoWindow.open(map, marker.current);
  }

  return null;
}