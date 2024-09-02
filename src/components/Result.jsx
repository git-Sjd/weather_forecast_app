import React, { useState } from 'react';
import location from "../images/location.png";
import { Search } from "../components/Search";


const Result = ({ data }) => {
  console.log('data : ', data)


  return (
    <div className=" mt-6 text-white font-title p-4">
      <div className='bg-blue-400 rounded-2xl flex justify-between p-6'>
        <div>
          <h2>{data.periods[0].detailedForecast}</h2>
          <div>Temperature : {data.periods[0].temperature}°{' ' + data.periods[0].temperatureUnit}</div>
          <div>Wind Speed: {data.periods[0].windSpeed}</div>
        </div>
        <div>
          <img className="rounded-full" src={data.periods[0].icon} />
          < div > {data.periods[0].shortForecast}</div >
        </div >
      </div >
      <h2 className='my-4 text-3xl font-bold text-black'>Next 12 Forecast</h2>
      <div className='grid grid-cols-5 font-title rounded-2xl'>
        {data.periods.slice(1).map((items, id) => {
          return <div className='bg-gray-500 rounded-lg px-2 py-4 space-y-2 m-1' >
            <div className='flex justify-center text-2xl font-semibold'>{items.name}</div>

            <img className="w-20 h-20 mx-auto rounded-full" src={items.icon} />
            <div>{items.shortForecast}</div>
            {/* <h2>Partly sunny, with a high near 76. South wind around 12 mph.</h2> */}
            <div>Temp: {items.temperature}°{' ' + items.temperatureUnit}</div>
            <div>Wind: {items.windSpeed}</div>
          </div>

        })}
      </div>



      {/* <div className=''>
        {data.periods.map((a) => { return <div className='text-5xl font-bold'>Temprature :{a.name} </div> })}
        <span className='text-5xl font-bold'>15 </span>
      </div> */}
    </div >
  )
}

export default Result;


