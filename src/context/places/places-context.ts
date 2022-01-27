import React from 'react';
import { Place, PlacesContext } from './types';
import GoogleMapReact from "google-map-react";

const places:Place[] = [];
const placeClicked: string | undefined = undefined;

export const initialValue = {
  isLoading: false,
  places,
  placeClicked,
  setIsLoading: (value: boolean) => {},
  getPlaces: (type: string, sw: GoogleMapReact.Coords, ne: GoogleMapReact.Coords) => {},
  setPlaceClicked: (child: string) => {},
};

export const Context = React.createContext<PlacesContext>(initialValue);

export const Consumer = Context.Consumer;
export const Provider = Context.Provider;