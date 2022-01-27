import React, { useState, useContext, useEffect, memo, createRef } from "react";
import { Context as PlacesContext } from "../../context/places";

import { Place } from "../../context/places/types";
import { SelectOption } from "./types";

import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails";

import useStyles from "./styles.js";

const searchTypeOptions: SelectOption[] = [
  {
    label: "Restaurants",
    value: "restaurants",
  },
  {
    label: "Hotels",
    value: "hotels",
  },
  {
    label: "Attractions",
    value: "attractions",
  },
];

const ratingOptions: SelectOption[] = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Above 3.0",
    value: "3",
  },
  {
    label: "Above 4.0",
    value: "4",
  },
  {
    label: "Above 4.5",
    value: "4.5",
  },
];

interface Props {
  type: string;
  rating: string;
  setType: (a: string) => void;
  setRating: (a: string) => void;
}

const List = memo((props: Props) => {
  const classes = useStyles();
  const { type, rating, setType, setRating } = props;

  const { places, placeClicked, isLoading } = useContext(PlacesContext);
  const [elRefs, setElRefs] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const _filteredPlaces = rating.length
      ? places.filter((p) => p.rating > Number(rating))
      : places;

    setFilteredPlaces(_filteredPlaces);
  }, [places, rating]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill(undefined)
        .map((_, i) => refs[i] || createRef<HTMLDivElement>())
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Food & Dining around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size={"5rem"} />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as string)}
            >
              {searchTypeOptions.map((opt) => (
                <MenuItem value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value as string)}
            >
              {ratingOptions.map((opt) => (
                <MenuItem value={opt.label}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {filteredPlaces?.map((place, i) => (
              <Grid key={i} item xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(placeClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
});

export default List;
