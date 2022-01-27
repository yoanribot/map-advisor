import React, { memo, useContext, useState } from "react";
import { Context as MapContext, IMapContext } from "../../context/map";

import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";

interface IAutoccomplete {
  getPlace: () => {
    geometry: { location: { lat: () => number; lng: () => number } };
  };
}

const Header = memo(() => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState<IAutoccomplete>();
  const { setCoords } = useContext<IMapContext>(MapContext);

  const onLoad = (autoC: any) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    if (autocomplete) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();

      setCoords({ lat, lng });
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search ..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              ></InputBase>
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
