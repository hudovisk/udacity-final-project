import React, { useContext } from "react";

export const GoogleContext = React.createContext();

export const GoogleContextProvider = GoogleContext.Provider;

export default function useGoogle() {
  const google = useContext(GoogleContext);
  return google;
}