import React, { useState } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { Search } from "../components/Search"

const Result = ({ data }) => {
  console.log('data : ', data)


  return (
    <div className='w-4/5 mx-auto bg-blue-700 mt-6 text-white font-title'>
      <div>
        <IoLocationOutline className='w-6 h-6 ' />
        <div></div>
      </div>
      <div className=''>
        {data.periods.map((a) => { return <div className='text-5xl font-bold'>Temprature :{a.name} </div> })}
        <span className='text-5xl font-bold'>15 </span>
      </div>
    </div>
  )
}

export default Result;


// import React, { useState } from 'react';

// const WeatherApp = () => {
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [datetime, setDatetime] = useState('');
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState('');

//   const handleFetchWeather = async () => {
//     if (!latitude || !longitude || !datetime) {
//       setError('Please provide all inputs.');
//       return;
//     }

//     try {
//       setError('');
//       const pointResponse = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
//       if (!pointResponse.ok) {
//         throw new Error('Failed to fetch point data');
//       }

//       const pointData = await pointResponse.json();
//       const forecastUrl = pointData.properties.forecast;

//       const forecastResponse = await fetch(forecastUrl);
//       if (!forecastResponse.ok) {
//         throw new Error('Failed to fetch forecast data');
//       }

//       const forecastData = await forecastResponse.json();
//       const forecast = forecastData.properties.periods.find(period =>
//         period.startTime.includes(datetime)
//       );
//       console.log('forecast: ', forecastData)

//       if (forecast) {
//         setWeather(forecast);
//       } else {
//         setError('No forecast data available for the given date/time.');
//       }
//     } catch (err) {
//       setError('Failed to fetch weather data. Please check the input values.');
//     }
//   };

//   return (
//     <div>
//       <h1>Weather Forecast</h1>

//       <div>
//         <input
//           type="text"
//           placeholder="Latitude (e.g., 38.2527)"
//           value={latitude}
//           onChange={(e) => setLatitude(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Longitude (e.g., -85.7585)"
//           value={longitude}
//           onChange={(e) => setLongitude(e.target.value)}
//         />
//         <input
//           type="datetime-local"
//           value={datetime}
//           onChange={(e) => setDatetime(e.target.value)}
//         />
//         <button onClick={handleFetchWeather}>Get Weather</button>
//       </div>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {weather && (
//         <div>
//           <h2>Forecast for {weather.startTime}</h2>
//           <p>{weather.temperature}° {weather.temperatureUnit}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WeatherApp;
