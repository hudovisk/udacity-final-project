import React, { useRef, useEffect } from "react";
import Input from "../Input";
import useMap from "../../hooks/useMap";
import useGoogle from "../../hooks/useGoogle";

const defaultOptions = {
  types: ["establishment"]
};

const AutoCompleteInput = ({
  onPlaceChanged,
  className,
  options = defaultOptions,
  ...rest
}) => {
  const google = useGoogle();
  const inputRef = useRef();
  const autocomplete = useRef();
  const map = useMap();

  useEffect(() => {
    autocomplete.current = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
  }, []);

  useEffect(() => autocomplete.current.bindTo("bounds", map), [map]);

  useEffect(() => {
    const autocompleteLsr = autocomplete.current.addListener(
      "place_changed",
      handlePlaceChanged
    );

    return () => google.maps.event.removeListener(autocompleteLsr);
  });

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
