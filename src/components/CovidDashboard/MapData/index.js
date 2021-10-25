import React from "react";
import "./styles.scss";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  map.setView([coords.lat, coords.lng], map.getZoom());
  return null;
};

//show circle and tooltip on map
const casesTypeColors = {
  cases: {
    hex: "#ff5d7b",
    multiplier: 800,
  },
  recovered: {
    hex: "#6fd63f",
    multiplier: 1200,
  },
  deaths: {
    hex: "#695d81",
    multiplier: 2000,
  },
};

const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      fillOpacity={0.4}
      radius={
        (Math.sqrt(country[casesType]) *
          casesTypeColors[casesType].multiplier) /
        4
      }
    >
      <Popup>
        <div className="flagContainer">
          <div
            className="flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="flagName">{country.country}</div>
          <div className="flagConfirmed">
            Confirmed Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="flagRecovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="flagDeaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

const MapData = ({ center, zoom, countries, casesType }) => {
  return (
    <div className="map">
      <MapContainer className="mapContainer" center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeMapView coords={center} />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
};

export default MapData;
