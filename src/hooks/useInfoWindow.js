import useGoogle from "./useGoogle";

let infoWindow;

export default function useInfoWindow() {
  const google = useGoogle();
  if (!infoWindow) {
    infoWindow = new google.maps.InfoWindow();
  }

  return infoWindow;
}