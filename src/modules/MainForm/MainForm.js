import React from "react";

import AutoCompleteInput from "./AutoCompleteInput";

import "./MainForm.css";
import useMap from "../../hooks/useMap";
import usePlaces from "../../hooks/usePlaces";
import useGoogle from "../../hooks/useGoogle";

const fields = [
  "photos",
  "formatted_address",
  "name",
  "rating",
  "opening_hours",
  "geometry"
];

const MainForm = ({ onPlacesResult }) => {
  const google = useGoogle();
  const map = useMap();
  const places = usePlaces(map);

  const queryPlaces = query => {
    var request = { query, fields, bounds: map.getBounds() }
    places.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        onPlacesResult(results);
      }
    });
  };

  const handlePlaceChanged = place => {
    if (!place.geometry) {
      queryPlaces(place.name);
      return;
    }

    onPlacesResult([place]);
  };

  return (
    <form className="main-form" onSubmit={e => e.preventDefault()}>
      <AutoCompleteInput
        className="main-form__place-input"
        placeholder="search places with autocomplete!"
        onPlaceChanged={handlePlaceChanged}
      />
      <button className="main-form__submit fas fa-search" type="submit" />
    </form>
  );
};

export default MainForm;
