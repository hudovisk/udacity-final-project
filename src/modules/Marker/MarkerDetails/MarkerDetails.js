import React from "react";
import _invoke from "lodash/invoke";
import _get from "lodash/get";

import "./MarkerDetails.css";
import Rating from "../../Rating";

export default function MarkerDetails({ place }) {
  const photoUrl = _invoke(place, "photos[0].getUrl");
  const isOpenNow = _get(place, "opening_hours.open_now");

  return (
    <div className="marker-details">
      <div className="marker-details__cover">
        {photoUrl && <img alt="place cover" src={photoUrl} />}
        <h1>{place.name}</h1>
      </div>

      {place.rating && <div className="marker-details__rating"><Rating rate={place.rating}/>({place.rating})</div>}
      {isOpenNow !== undefined && <p>Open now: {isOpenNow ? "Yes" : "No"}</p>}

      Click to see more!
    </div>
  );
}
