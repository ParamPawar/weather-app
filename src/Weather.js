// src/Weather.js

import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const apiKey = "eac22b526830943f5fe619f73f977640";

  const getWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("Failed to get weather data");
    }
  };

  const handleFetchWeather = () => {
    if (city) {
      getWeather(city);
    } else {
      setError("Please enter a city name");
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-info">
        {weatherData ? (
          <>
            <div className="location">
              <h1>{weatherData.name}</h1>
              <h2>{weatherData.sys.country}</h2>
            </div>
            <div className="temp">
              <h1>{Math.round(weatherData.main.temp)}°C</h1>
            </div>
            <div className="description">
              <h1>{weatherData.weather[0].description}</h1>
            </div>
            <div className="details">
              <div className="box humidity">
                <p>Humidity: {weatherData.main.humidity}%</p>
              </div>
              <div className="box visibility">
                <p>Visibility: {weatherData.visibility} m</p>
              </div>
              <div className="box wind_speed">
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              </div>
            </div>
          </>
        ) : (
          <h1>Enter a city to get weather information</h1>
        )}
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search any city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" onClick={handleFetchWeather}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
          </svg>
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Weather;
