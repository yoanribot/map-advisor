import GoogleMapReact from "google-map-react";

export interface Place {
  name: string,
  photo: { images: { large: { url: string }}},
  address: string,
  phone: string,
  web_url: string,
  website: string,
  latitude: number,
  longitude: number,
  ranking: number,
  rating: number,
  num_reviews: number,
  price_level: string,
  cuisine: { name: string}[],
  awards: { display_name: string, images: { small: string } }[],
}

export interface PlacesContext {
  isLoading: boolean,
  places: Place[],
  placeClicked: string | undefined,
  setIsLoading: (value: boolean) => void,
  getPlaces: (type: string, a:GoogleMapReact.Coords, b:GoogleMapReact.Coords) => void,
  setPlaceClicked: (child:string) => void,
}