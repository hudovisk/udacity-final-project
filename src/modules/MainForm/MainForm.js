import React, { useState } from "react";

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
  const [ search, setSearch ] = useState(null);

  const queryPlaces = query => {
    var request = { query, fields, bounds: map.getBounds() }
    places.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        onPlacesResult(results);
      } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert("No results");
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    queryPlaces(search);
  }

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <AutoCompleteInput
        className="main-form__place-input"
        placeholder="search places with autocomplete!"
        onPlaceChanged={handlePlaceChanged}
        onChange={handleSearchChange}
      />
      <button className="main-form__submit fas fa-search" type="submit" />
    </form>
  );
};

export default MainForm;
