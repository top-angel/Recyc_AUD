import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

type props = {
  members: [];
};

const MapChart = ({ members }: props) => {
  return (
    <ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} fill="#DDD" />
          ))
        }
      </Geographies>
      {members.map((item: any, index) => {
        const { location } = item;
        return (
          <Marker
            key={index}
            coordinates={[
              location.coordinates.latitude,
              location.coordinates.longitude,
            ]}
          >
            <circle fill="#86B6B9" stroke="#86B6B9" r={6} />
          </Marker>
        );
      })}
    </ComposableMap>
  );
};

export default MapChart;
