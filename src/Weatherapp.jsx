import React, { useEffect, useState } from "react";

import "./Weatherapp.css";

import searchImg from "./images/search icon.png";
import centerImg from "./images/sun-cloud-rain.png";
import windspeedImg from "./images/wind speed icon.png";
import humid from "./images/humidity.png";

const Weatherapp = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [search, setSearch] = useState("");
  const [place, setPlace] = useState("");
  const [windspeed, setWindspeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [myerror, setMyerror] = useState("");
  const [placeconditional, setPlaceConditional] = useState(true);
  const [errorconditional, setErrorConditional] = useState(true);

  const Searches = () => {
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${search}&aqi=no`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.error) {
          setPlace(data.location.country);
          setWindspeed(data.current.wind_mph);
          setHumidity(data.current.humidity);
          setMyerror("");
        } else if (data.error.code == 1006) {
          setMyerror(data.error.message);
          console.log(myerror);
          setPlace("");
        } else if (data.error.code === 1003) {
          setMyerror("Input Required");
          setPlace("");
        }
      })
      .catch((err) => {
        console.log(err);
        setMyerror("Connection Error");
      });
  };

  window.onload = function () {
    const input = document.getElementById("myInput");
    input.addEventListener("keydown", function (e) {
      const searchbutton = document.getElementById("searchImageButton");

      if (e.key == "Enter") {
        e.preventDefault();
        searchbutton.click();
      }
    });
  };



  return (
    <div className="Weatherapp">
      <div className="Header">
        <input
          placeholder="Search"
          className="searchbar"
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={() => Searches()}
          id="myInput"
        />

        <img
          src={searchImg}
          onClick={() => Searches()}
          id="searchImageButton"
        ></img>
      </div>
      <div className="Body">
        <img src={centerImg}></img>
        {place ? <p> {place} </p> : ""}
        {myerror ? <p> {myerror} </p> : ""}
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
