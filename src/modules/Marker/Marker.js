import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import useMap from "../../hooks/useMap";
import useMarker from "../../hooks/useMarker";
import useGoogle from "../../hooks/useGoogle";
import MarkerDetails from "./MarkerDetails";
import useInfoWindow from "../../hooks/useInfoWindow";

export default function Marker({ place, location, onClick }) {
  const infoNode = useRef(document.createElement('div'));
  const infoWindow = useInfoWindow();
  const google = useGoogle();
  const map = useMap();
  const marker = useMarker(map, location);

  useEffect(() => {
    const clickLsr = google.maps.event.addListener(
      marker.current,
      "click",
      onClick
    );

    const mouseOverLsr = google.maps.event.addListener(
      marker.current,
      "mouseover",
      handleMouseOver
    );

    const mouseOutLsr = google.maps.event.addListener(
      marker.current,
      "mouseout",
      handleMouseOut
    );

    return () => {
      google.maps.event.removeListener(clickLsr);
      google.maps.event.removeListener(mouseOverLsr);
      google.maps.event.removeListener(mouseOutLsr);
    };
  });

  const handleMouseOver = () => {

    ReactDOM.render(<MarkerDetails place={place} />, infoNode.current);

    infoWindow.setContent(infoNode.current);
    infoWindow.open(map, marker.current);
  }

  const handleMouseOut = () => {
    infoWindow.close();
  }

  return null;
}