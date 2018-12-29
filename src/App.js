import React, { useEffect, useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import { GoogleContextProvider } from "./hooks/useGoogle";
import { init } from "./lib/google-maps";

export default function App() {
  const [google, setGoogle] = useState();

  useEffect(() => {
    init().then(setGoogle);
  }, []);

  return (
    <GoogleContextProvider value={google}>
      {!google ? "loading" : <Home />}
    </GoogleContextProvider>
  );
}
