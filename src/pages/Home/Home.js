import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import MainForm from "../../modules/MainForm";
import Map from "../../modules/Map";

import { MapsContextProvider } from "../../hooks/useMap";

import Marker from "../../modules/Marker";
import PlaceDetails from "../../modules/PlaceDetails";
import useHomeReducer, { actions, selectors } from "../../hooks/useHomeReducer";

export default function Home() {
  const mapRef = useRef(null);
  const [state, dispatch] = useHomeReducer(mapRef);

  const handlePlacesResult = places => {
    dispatch(actions.searchResult(places));
  };

  const handleMarkerClick = place => () => {
    dispatch(actions.placeSelected(place));
  };

  const handlePlaceDetailsClose = () => {
    dispatch(actions.hidePlaceDetails());
  }

  return (
    <MapsContextProvider value={selectors.getMap(state)}>
      <div className="home">
        {selectors.getMap(state) && (
          <MainForm onPlacesResult={handlePlacesResult} />
        )}

        <Map ref={mapRef} />

        {selectors.getSearchResults(state).map(place => (
          <Marker
            place={place}
            location={place.geometry.location}
            key={place.reference}
            onClick={handleMarkerClick(place)}
          />
        ))}

        <CSSTransition
          in={selectors.getShowPlaceDetails(state)}
          timeout={500}
          classNames="place-details__animation"
          unmountOnExit
        >
          <PlaceDetails
            place={selectors.getPlaceSelected(state)}
            onClose={handlePlaceDetailsClose}
          />
        </CSSTransition>
      </div>
    </MapsContextProvider>
  );
}
