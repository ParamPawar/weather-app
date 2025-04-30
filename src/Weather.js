// src/Weather.js

import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "eac22b526830943f5fe619f73f977640";

  const getWeatherIcon = (weatherCode) => {
    const icons = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "🌨️",
      "13n": "🌨️",
      "50d": "🌫️",
      "50n": "🌫️"
    };
    return icons[weatherCode] || "☀️";
  };

  const getWeather = async (city) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("Failed to get weather data. Please check the city name and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchWeather = (e) => {
    e.preventDefault();
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
            <div className="weather-main">
              <div className="weather-icon">
                {getWeatherIcon(weatherData.weather[0].icon)}
              </div>
              <div className="temp">
                <h1>{Math.round(weatherData.main.temp)}°C</h1>
              </div>
            </div>
            <div className="description">
              <h1>{weatherData.weather[0].description}</h1>
            </div>
            <div className="details">
              <div className="box humidity">
                <p>💧 Humidity: {weatherData.main.humidity}%</p>
              </div>
              <div className="box visibility">
                <p>👁️ Visibility: {(weatherData.visibility / 1000).toFixed(1)} km</p>
              </div>
              <div className="box wind_speed">
                <p>💨 Wind: {weatherData.wind.speed} m/s</p>
              </div>
            </div>
          </>
        ) : (
          <div className="welcome-message">
            <h1>Welcome to Weather App</h1>
            <p>Enter a city name to get current weather information</p>
          </div>
        )}
      </div>
      <form className="search" onSubmit={handleFetchWeather}>
        <input
          type="text"
          placeholder="Search any city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading}
        >
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
            >
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
          )}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Weather;
