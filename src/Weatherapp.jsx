import React, { useEffect, useState } from "react";

import "./Weatherapp.css";

import searchImg from "./images/search icon.png";
import centerImg from "./images/sun-cloud-rain.png";
import windspeedImg from "./images/wind speed icon.png";
import humid from "./images/humidity.png";

const Weatherapp = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [place, setPlace] = useState("");
  const [windspeed, setWindspeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [myerror, setMyerror] = useState("");

  const Searches = async () => {

    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${search}&aqi=no`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setMyerror(data.error.message);
          console.log(myerror);
        } else if (!data.error) {
          setPlace(data.location.country);
          setWindspeed(data.current.wind_mph);
          setHumidity(data.current.humidity);
        }
      })
      .catch((err) => {
        setMyerror(err);
      });
  };

  return (
    <div className="Weatherapp">
      <div className="Header">
        <input
          placeholder="Search"
          className="searchbar"
          onChange={(e) => setSearch(e.target.value)}
        />

        <img src={searchImg} onClick={() => Searches()}></img>
      </div>
      <div className="Body">
        <img src={centerImg}></img>
        <p id="country"> {place || myerror} </p>
      </div>
      <div className="Footer">
        <div className="Windspeed">
          <img src={windspeedImg} className="FooterImg1"></img>
          <p>Wind Speed</p>
          <p>{windspeed} mph</p>
        </div>
        <div className="Relativehumidity">
          <img src={humid} className="FooterImg2"></img>
          <p>Relative Humidity</p>
          <p>{humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default Weatherapp;