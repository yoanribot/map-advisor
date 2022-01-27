import React, { memo, useState, useEffect, useContext } from "react";
import { Context as PlacesContext } from "../../context/places";
import { Context as MapContext, IMapContext } from "../../context/map";
import { getWeatherData } from "../../api";

import GoogleMapReact from "google-map-react";
import { Place } from "../../context/places/types";

import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import MapPin from "./MapPin";

import useStyles from "./styles.js";
import mapStyles from "../../mapStyles";

interface Props {
  placeKind: string;
  rating: string;
}

interface IWeather {
  list: { coord: { lat: number; lon: number }; weather: { icon: string }[] }[];
}

const Map = memo((props: Props) => {
  const classes = useStyles();
  const { placeKind, rating } = props;
  const isDesktop = useMediaQuery("(min-width:600px)");

  const { places, getPlaces, setPlaceClicked } = useContext(PlacesContext);
  const { coords, setCoords, bounds, setBounds } =
    useContext<IMapContext>(MapContext);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [weatherData, setWeatherData] = useState<IWeather | undefined>(
    undefined
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const _filteredPlaces = rating.length
      ? places.filter((p) => p.rating > Number(rating))
      : places;

    setFilteredPlaces(_filteredPlaces);
  }, [places, rating]);

  useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      getPlaces(placeKind, bounds.sw, bounds.ne);
    }

    if (coords?.lat && coords?.lng) {
      getWeatherData(coords?.lat, coords?.lng).then((data: any) =>
        setWeatherData(data)
      );
    }
  }, [placeKind, bounds]);

  console.log("weatherData", weatherData);

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
        }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw,
            nw: e.marginBounds.nw,
            se: e.marginBounds.se,
          });
        }}
        onChildClick={(child) => setPlaceClicked(child)}
      >
        {filteredPlaces.length &&
          filteredPlaces.map((place, i) => (
            <MapPin
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt="resto"
                  />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </MapPin>
          ))}
        {weatherData?.list?.length &&
          weatherData.list.map((data, i) => (
            <MapPin key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                height="70px"
                alt="weather"
              />
            </MapPin>
          ))}
      </GoogleMapReact>
    </div>
  );
});

export default Map;
