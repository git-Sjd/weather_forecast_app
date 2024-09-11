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
  const [loading, setLoading] = useState(false);
  const [dateData, setdateData] = useState("");
  const [show, setShow] = useState("");

  const handleFetchWeather = async () => {
    if (!latitude || !longitude) {
      setError('Please provide all inputs.');
      return;
    }
    setLoading(true);
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
      setError('Data Unavailable For Requested Point');
    } finally {
      setLoading(false);
    }

  }



  function filterWeatherDataByDateTime(periods, selectedDateTime) {
    const matchingPeriod = periods.find(period => {
      const startTime = new Date(period.startTime);
      const endTime = new Date(period.endTime);
      console.log('123', startTime, endTime, new Date(selectedDateTime))

      return new Date(selectedDateTime) >= startTime && new Date(selectedDateTime) <= endTime;
    });
    return matchingPeriod || null;

  }

  const handleFilterData = () => {
    const filtered = filterWeatherDataByDateTime(weather.periods, datetime);
    setdateData(filtered);

  };


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
              placeholder="e.g. 38.2527"
              type="number"
              value={latitude}
              onChange={(e) => {
                setLatitude(e.target.value);
                setError('');
              }}
            />
          </div>
          <div className="flex">
            <p className="mt-1 font-semibold text-2xl">Longitute : </p>
            <input
              className="border border-black rounded-lg p-2 ml-2"
              placeholder="e.g. -85.7585"
              type="number"
              value={longitude}
              onChange={(e) => {
                setLongitude(e.target.value);
                setError('');
              }}
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
          <button
            className="border-2 bg-slate-600 rounded-xl p-2 text-white text-xl font-semibold"
            onClick={() => { handleFetchWeather() }}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        {weather && <div className="flex">

          <div className="flex">
            <p className="mt-1 font-semibold text-2xl">Date & Time :</p>

            <input
              className="border border-black rounded-lg p-2 ml-3"
              type="datetime-local"
              value={datetime}
              onChange={(e) => {
                setDatetime(e.target.value);
                setError('');
              }}>
            </input>
          </div>
          <div className="">

            <button
              className="border-2 bg-slate-600 rounded-xl p-2 text-white text-xl font-semibold"
              onClick={() => {
                handleFilterData()
              }}
            >
              Search By date
            </button>
          </div>
        </div>}

      </div >
      <div>
        {
          // <div className='bg-blue-400 rounded-2xl flex justify-between p-6'>
          //   <div>
          //     <div className='text-lg'>{dateData.detailedForecast}</div>
          //     <div className='font-semibold'>Temperature : {dateData.temperature}°{' ' + dateData.temperatureUnit}</div>
          //     <div className='font-semibold'>Wind Speed: {dateData.windSpeed}</div>
          //   </div>
          //   <div className='mr-10'>
          //     <img className="rounded-full" src={dateData.icon} />
          //     < div className='ml-5 text-xl font-semibold'> {dateData.shortForecast}</div >
          //   </div >
          //</div >
          dateData === null ? <div className="font-title font-semibold text-xl text-red-600 flex justify-center">No forecast data available for the given date/time.</div> :
            weather && dateData ? <div className='bg-gray-500 rounded-lg pl-5 py-4 space-y-2 m-1 w-1/3 mx-auto text-white font-title' >
              <div className='flex justify-center text-2xl font-semibold'>{dateData.name}</div>
              <img className="w-20 h-20 mx-auto rounded-full" src={dateData.icon} />
              <div className='text-xl font-semibold'>{dateData.shortForecast}</div>
              <div className='text-lg font-semibold'>Temp: {dateData.temperature}°{' ' + dateData.temperatureUnit}</div>
              <div className='text-lg font-semibold'>Wind: {dateData.windSpeed}</div>
            </div> : ''
        }

        {loading ? (
          <div className="font-title font-semibold text-xl text-blue-600 flex justify-center" >
            <p>Loading...</p>
          </div>
        ) : weather ? (
          <Result data={weather} />
        ) : (
          error && (
            <div className="font-title font-semibold text-xl text-red-600 flex justify-center">
              <p>{error}</p>
            </div>
          )
        )}
      </div >
    </>
  );
};

export default Search;
