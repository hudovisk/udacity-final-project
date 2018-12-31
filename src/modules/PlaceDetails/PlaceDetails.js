import React from "react";
import _invoke from "lodash/invoke";

import "./PlaceDetails.css";
import WikipediaSection from "./WikipediaSection";
import RatingSection from "./RatingSection";

export default function PlaceDetails({ place, onClose }) {
  if (!place) {
    return null;
  }

  const photoUrl = _invoke(place, "photos[0].getUrl");

  return (
    <div
      role="dialog"
      aria-label={`${place.name} details`}
      aria-modal="true"
      className="place-details"
    >
      <button aria-label="close" className="place-details__close fas fa-times" onClick={onClose} />
      <div className="place-details__cover">
        {photoUrl && <img alt="place cover" src={photoUrl} />}
        <h1>{place.name}</h1>
      </div>

      <div className="place-details__content">
        <section>{place.formatted_address}</section>

        <RatingSection rating={place.rating} />

        <WikipediaSection nearbyWikipediaPages={place.nearbyWikipediaPages} />
      </div>
    </div>
  );
}
