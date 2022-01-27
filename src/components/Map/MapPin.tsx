import React, { memo } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      pin: {
        key: number;
        lat: number;
        lng: number;
        children: any;
        className?: any;
      };
    }
  }
}

type Props = {
  key: number;
  lat: number;
  lng: number;
  children: React.ReactNode;
  className?: string;
};

const MapPin = memo((props: Props) => {
  return (
    <pin
      key={props.key}
      lat={props.lat}
      lng={props.lng}
      className={props.className}
    >
      {props.children}
    </pin>
  );
});

export default MapPin;
