import { useReducer, useEffect } from "react";
import _get from "lodash/get";
import createAction from "../lib/createAction";
import useGoogle from "./useGoogle";

import * as wikipedia from "../lib/wikipedia";

const MAP_INIT = "MAP_INIT";
const SEARCH_RESULT = "SEARCH_RESULT";
const PLACE_SELECTED = "PLACE_SELECTED";
const HIDE_PLACE_DETAILS = "HIDE_PLACE_DETAILS";

export const actions = {
  initMap: createAction(MAP_INIT),
  searchResult: createAction(SEARCH_RESULT),
  placeSelected: createAction(PLACE_SELECTED),
  hidePlaceDetails: createAction(HIDE_PLACE_DETAILS)
};

export const selectors = {
  getMap: state => state.map,
  getShowPlaceDetails: state => state.showPlaceDetails,
  getPlaceSelected: state => state.placeSelected,
  getSearchResults: state => state.searchResults
};

const options = {
  center: { lat: -25.479, lng: -49.228 },
  zoom: 15
};

const initialState = {
  map: null,
  searchResults: [],
  placeSelected: null,
  showPlaceDetails: false
};

function reducer(state, action) {
  switch (action.type) {
    case MAP_INIT:
      return { ...state, map: action.payload };
    case SEARCH_RESULT:
      return { ...state, searchResults: action.payload };
    case PLACE_SELECTED:
      return {
        ...state,
        placeSelected: action.payload,
        showPlaceDetails: true
      };
    case HIDE_PLACE_DETAILS:
      return { ...state, showPlaceDetails: false };
    default:
      return state;
  }
}

export default function useHomeReducer(mapRef) {
  const google = useGoogle();
  const [state, dispatch] = useReducer(reducer, initialState);
  const map = selectors.getMap(state);
  const searchResult = selectors.getSearchResults(state);
  const placeSelected = selectors.getPlaceSelected(state);

  // Side effects
  useEffect(() => {
    dispatch(actions.initMap(new google.maps.Map(mapRef.current, options)));
  }, []);

  useEffect(
    () => {
      // If we only returned one result center on it
      if (searchResult.length === 1) {
        if (searchResult[0].geometry.viewport) {
          map.fitBounds(searchResult[0].geometry.viewport);
        } else {
          map.setCenter(searchResult[0].geometry.location);
          map.setZoom(17);
        }
      }
    },
    [searchResult]
  );

  useEffect(() => {
    if (!map) return;

    let mapLsr = map.addListener("click", () =>
      dispatch(actions.hidePlaceDetails())
    );

    return () => google.maps.event.removeListener(mapLsr);
  });

  useEffect(
    () => {
      if (placeSelected && !placeSelected.nearbyWikipediaPages) {
        const location = placeSelected.geometry.location;
        wikipedia
          .getNearbyPages(location.lat(), location.lng())
          .then(response => {
            dispatch(
              actions.placeSelected({
                ...placeSelected,
                nearbyWikipediaPages: _get(response, "query.geosearch")
              })
            );
          });
      }
    },
    [placeSelected]
  );

  return [state, dispatch];
}
