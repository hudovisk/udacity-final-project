import React from "react";

import "./Map.css";

const Maps = React.forwardRef((_, ref) => {
  return <div ref={ref} className="map" />;
});

export default Maps;
