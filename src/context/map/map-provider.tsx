import React, { memo, useState } from "react";
import { Provider } from "./map-context";

import GoogleMapReact from "google-map-react";

const PlacesProvider = memo((props) => {
  const [coords, setCoords] = useState<GoogleMapReact.Coords>();
  const [bounds, setBounds] = useState<GoogleMapReact.Bounds>();

  return (
    <Provider
      value={{
        coords,
        bounds,
        setCoords,
        setBounds,
      }}
    >
      {props.children}
    </Provider>
  );
});

export default PlacesProvider;
