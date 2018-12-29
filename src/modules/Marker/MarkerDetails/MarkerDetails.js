import React from "react";
import _invoke from "lodash/invoke";

import "./MarkerDetails.css";

export default function MarkerDetails({ place }) {
  console.log(place);
  
  const photoUrl = _invoke(place, "photos[0].getUrl");

  return <div className="marker-details">
    {photoUrl && <img alt="place cover" className="marker-details__cover" src={photoUrl} />}
  </div>;
}