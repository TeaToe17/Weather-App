import React, { useEffect, useState } from "react";

import "./Weatherapp.css";

import searchImg from "./images/search icon.png";
import cloud from "./images/cloud.png";
import footerimg from "./images/Frame 2.png"

const Weatherapp = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [search, setSearch] = useState("");
  const [place, setPlace] = useState("");
  const [windspeed, setWindspeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [text, setText] = useState("");
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
          setTemperature(data.current.temp_c);
          setText(data.current.condition.text);
          setMyerror("");
        } else if (data.error.code == 1006) {
          setMyerror(data.error.message);
          console.log(myerror);
          setPlace("");
          setWindspeed("");
          setHumidity("");
          setTemperature("");
        } else if (data.error.code === 1003) {
          setMyerror("Input Required");
          setPlace("");
          setWindspeed("");
          setHumidity("");
          setTemperature("");
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
        <div className="headerDiv">
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
        <div className="display">
          {/* <img src={centerImg}></img> */}
          {place ? <p> {place} </p> : ""}
          {myerror ? <p> {myerror} </p> : ""}

          <div className="temperature">
            <h4>TEMPERATURE</h4>
            {temperature && (
              <h4 style={{ fontSize: "20px" }}> {temperature}°C </h4>
            )}
            <img src={cloud} alt=""></img>
            <p>{text}</p>
          </div>
        </div>
      </div>
      <div className="Body">
        <p>
          {humidity && `Relative Humidity: ${humidity}%`}
          <br /> <br />
          {windspeed && `Windspeed: ${windspeed}mph`}
        </p>
      </div>
      <div className="Footer">
          <img src={footerimg} alt="" ></img>
      </div>
    </div>
  );
};

export default Weatherapp;
