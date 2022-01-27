import React, { memo, useState } from "react";
import { Provider } from "./places-context";
import { Place } from "./types";
import axios from "axios";

import GoogleMapReact from "google-map-react";

type Props = { children: React.ReactNode };
const PlacesProvider = memo((props: Props) => {
  const [currentPlaces, setCurrentPlaces] = useState<Place[]>([]);
  const [placeClicked, setPlaceClicked] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPlaces = async (
    type: string,
    sw: GoogleMapReact.Coords,
    ne: GoogleMapReact.Coords
  ) => {
    try {
      setIsLoading(true);
      const data: Place[] = [];
      // const {
      //   data: { data },
      // } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      //   params: {
      //     bl_latitude: sw.lat,
      //     bl_longitude: ne.lat,
      //     tr_longitude: sw.lng,
      //     tr_latitude: ne.lng,
      //   },
      //   headers: {
      //     "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      //     "x-rapidapi-key": process.env.API_KEY_ANA as string,
      //   },
      // });
      await setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      setCurrentPlaces(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider
      value={{
        isLoading,
        places: currentPlaces,
        placeClicked,
        getPlaces,
        setPlaceClicked,
        setIsLoading,
      }}
    >
      {props.children}
    </Provider>
  );
});

export default PlacesProvider;
