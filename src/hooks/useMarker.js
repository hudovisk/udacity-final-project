import { useRef, useEffect } from "react";
import useGoogle from "./useGoogle";

export default function useMarker(map, location) {
  const google = useGoogle();
  const marker = useRef(
    new google.maps.Marker({
      map,
      animation: google.maps.Animation.DROP
    })
  );

  useEffect(() => marker.current.setMap(map), [map]);
  useEffect(() => () => marker.current.setMap(null), []);

  useEffect(() => {
    if (location) {
      marker.current.setPosition(location);
    }
    marker.current.setVisible(!!location);
  }, [location]);

  return marker;
}
