import React, { useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { Provider as PlacesProvider } from "./context/places";
import { Provider as MapProvider } from "./context/map";

import Header from "./components/Header";
import Map from "./components/Map";
import List from "./components/List";

function App() {
  const [type, setType] = useState<string>("restaurants");
  const [rating, setRating] = useState<string>("");

  return (
    <div className="App">
      <MapProvider>
        <PlacesProvider>
          <CssBaseline />
          <Header />

          <Grid container spacing={3} style={{ width: "100%" }}>
            <Grid item xs={12} md={4}>
              <List
                type={type}
                rating={rating}
                setType={setType}
                setRating={setRating}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Map placeKind={type} rating={rating} />
            </Grid>
          </Grid>
        </PlacesProvider>
      </MapProvider>
    </div>
  );
}

export default App;
