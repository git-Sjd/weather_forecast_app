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
    if (!latitude || !longitude) {
      alert('Please provide all inputs.');
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
      // .periods.find(period =>
      //   period.startTime.includes(datetime)
      //);
      console.log('forecast: ', forecast)

      if (forecast) {
        setWeather(forecast);
      } else {
        setError('No forecast data available for the given date/time.');
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please check the input values.');
    }

  }

  // const searchHandler = () => {
  //   if (city == 123) {
  //     alert('please type the city name')
  //   }
  //   else {
  //     alert('No')
  //   }
  // }

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
      <div className="flex mt-10 justify-between items-center p-6 font-title">
        {/* <input
          className="border-2 border-black rounded-lg p-2 w-1/4"
          type="text"
          placeholder="Search by City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <p className="text-2xl font-semibold">Or</p> */}
        <p>latitude : </p>
        <input
          className="border border-black rounded-lg p-2 w-1/5"
          placeholder="latitude"
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <p>longitute : </p>
        <input
          className="border border-black rounded-lg p-2 w-1/5"
          placeholder="longitude"
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        {" "}
        {/* <button
          className="border-2 bg-slate-600 rounded-md p-2 text-white"
          onClick={() => { locationHandler() }}
        >
          location
        </button> */}
        <img
          className="w-6 h-6 cursor-pointer"
          src={position}
          alt="positionImg"
          onClick={() => { locationHandler() }}
        />
        <input
          className="border border-black rounded-lg p-2 w-1/5"
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}>
        </input>
        <button
          className="border-2 bg-slate-600 rounded-md p-2 text-white"
          onClick={() => { handleFetchWeather() }}
        >
          Search
        </button>

      </div >
      <div>
        {weather ?
          <Result data={weather} />

          // <>this sjsj</>
          : <>Please provide the correct information</>}
      </div>
    </>
  );
};

export default Search;
