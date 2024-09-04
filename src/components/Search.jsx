import React, { useState } from "react";
import position from "../images/position.png";
import Result from "./Result";

const Search = () => {
  const [city, setCity] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [datetime, setDatetime] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleFetchWeather = async () => {
    if (!latitude || !longitude || !datetime) {
      setError('Please provide all inputs.');
      return;
    }

    try {
      setError('');
      const pointResponse = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
      if (!pointResponse.ok) {
        throw new alert('Failed to fetch point data');
      }

      const pointData = await pointResponse.json();
      const forecastUrl = pointData.properties.forecast;

      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
        throw new alert('Failed to fetch forecast data');
      }

      const forecastData = await forecastResponse.json();
      const forecast = forecastData.properties

      if (forecast) {
        setWeather(forecast);
      } else {
        setError('No forecast data available for the given date/time.');
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please check the input values.');
    }

  }


  const locationHandler = () => {
    setCity('');
    setLongitude('');
    setLatitude('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (result) => {
          setTimeout(() => {
            setLongitude(result.coords.longitude)
            setLatitude(result.coords.latitude)
          }, 500)
        },
        (error) => { alert('Please unblock your location') }
      )
    }
  }

  return (
    <>
      <div className="text-5xl font-title font-bold py-4 flex items-center justify-center border-b-2 border-gray-950">Weather Forecast App</div>
      <div className="flex justify-between items-center p-6 font-title">
        <div className="flex space-x-6">
          <div className="flex">
            <p className="mt-1 font-semibold text-2xl">Latitude : </p>
            <input
              className="border border-black rounded-lg p-2 ml-2"
              placeholder="latitude"
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div className="flex">
            <p className="mt-1 font-semibold text-2xl">Longitute : </p>
            <input
              className="border border-black rounded-lg p-2 ml-2"
              placeholder="longitude"
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          <div className="">
            <img
              className="w-6 h-6 cursor-pointer mt-2.5"
              src={position}
              alt="positionImg"
              onClick={() => { locationHandler() }}
            />
          </div>
        </div>

        <div className="flex">
          <p className="mt-1 font-semibold text-2xl">Date & Time :</p>

          <input
            className="border border-black rounded-lg p-2 ml-3"
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}>
          </input>
        </div>
        <div className="mr-20">
          <button
            className="border-2 bg-slate-600 rounded-xl p-2 text-white text-xl font-semibold"
            onClick={() => { handleFetchWeather() }}
          >
            Search
          </button>
        </div>

      </div >
      <div>
        {weather ?
          <Result data={weather} />

          : <>
            {error && (
              <div className="font-title font-semibold text-xl text-red-600 flex justify-center">

                <p>{error}</p>

              </div>
            )}
          </>}
      </div>
    </>
  );
};

export default Search;
