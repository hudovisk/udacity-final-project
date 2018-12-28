import React, { useContext } from "react";

export const MapsContext = React.createContext();

export const MapsContextProvider = MapsContext.Provider;

export default function useMap() {
  const map = useContext(MapsContext);
  return map;
}
