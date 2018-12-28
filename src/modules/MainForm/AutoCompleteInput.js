import React, { useRef, useEffect } from "react";
import Input from "../Input";
import useMap from "../../hooks/useMap";
import { init } from "../../lib/google-maps";

const options = {
  types: ["establishment"]
};

const AutoCompleteInput = ({ onPlaceChanged, className, ...rest }) => {
  const autocomplete = useRef();
  const inputRef = useRef();
  const map = useMap();

  useEffect(() => {
    init().then(google => {
      autocomplete.current = new google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      autocomplete.current.bindTo("bounds", map);
      autocomplete.current.addListener("place_changed", handlePlaceChanged);
    });

    return () => {
      if (autocomplete.current) {
        autocomplete.current.removeListener(
          "place_changed",
          handlePlaceChanged
        );
      }
    };
  }, []);

  const handlePlaceChanged = () => {
    const place = autocomplete.current.getPlace();
    onPlaceChanged(place);
  };

  return (
    <div className={className}>
      <Input ref={inputRef} {...rest} />
    </div>
  );
};

export default AutoCompleteInput;
