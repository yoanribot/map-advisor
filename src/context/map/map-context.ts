import React from 'react';
import GoogleMapReact from "google-map-react";

export interface IMapContext {
  coords: GoogleMapReact.Coords | undefined,
  bounds: GoogleMapReact.Bounds | undefined,
  setCoords: (coords: GoogleMapReact.Coords) => void,
  setBounds: (coords: GoogleMapReact.Bounds) => void,
}

export const Context = React.createContext<IMapContext>({
  coords: undefined,
  bounds: undefined,
  setCoords: (coords: GoogleMapReact.Coords) => {},
  setBounds: (bounds: GoogleMapReact.Bounds) => {},
});

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;