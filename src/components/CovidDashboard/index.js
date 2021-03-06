import React, { useEffect, useState } from "react";
import GraphData from "./GraphData";
import InfoData from "./InfoData";
import MapData from "./MapData";
import { NumberFormat, sortData } from "./Util";
import { Card } from "antd";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import "./styles.scss";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

const CovidDashboardComponent = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 2.5, lng: 112.5 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries?yesterday=true")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // Malaysia
            value: country.countryInfo.iso2, // MY
          }));

          setCountries(countries);
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    //when click the dropdown list, the title will change
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}/?yesterday=true`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        if (countryCode === "worldwide") {
          setMapCenter(mapCenter);
          setMapZoom(3);
        } else {
          const {
            countryInfo: { lat, long },
          } = data;
          setMapCenter({ lat, lng: long });
          setMapZoom(4);
        }
      });
  };

  console.log("country info", countryInfo);

  const date = new Date();
  //date.setDate(date.getDate() - 1);
  console.log("dateee", date);
  console.log(
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date)
  );

  return (
    <div className="covidApp">
      <div className="covidLeft">
        <div className="covidHeader">
          <div className="title">
            Worldwide COVID-19 cases updated as of{" "}
            <span className="date">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(date)}
            </span>
          </div>
          <FormControl className="covidDropdown">
            {/*loop country in dropdown*/}
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="covidStats">
          <InfoData
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Confirmed Cases"
            cases={NumberFormat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0,0")}
          />

          <InfoData
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={NumberFormat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0,0")}
          />

          <InfoData
            isGrey
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={NumberFormat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0,0")}
          />
        </div>
        <MapData
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>

      <Card className="covidRight">
        <div className="covidInformation">
          <h3>
            Live Cases by Country{" "}
            <p className="dataSource">
              Data source:{" "}
              <a href="https://www.worldometers.info/coronavirus/">
                Worldometer
              </a>
            </p>
          </h3>

          <div className="table">
            {tableData.map(({ country, cases }) => (
              <tr>
                <td>{country}</td>
                <td>
                  <strong>{cases}</strong>
                </td>
              </tr>
            ))}
          </div>

          <h3 className="covidGraphTitle">Worldwide new {casesType}</h3>
          <GraphData className="covidGraph" casesType={casesType} />
        </div>
      </Card>
    </div>
  );
};

export default CovidDashboardComponent;
