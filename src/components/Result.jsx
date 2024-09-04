import React, { useState } from 'react';
import location from "../images/location.png";
import { Search } from "../components/Search";


const Result = ({ data }) => {
  // console.log('data : ', data)


  return (
    <div className=" mt-6 text-white font-title p-4">
      <div className='bg-blue-400 rounded-2xl flex justify-between p-6'>
        <div>
          <div className='text-lg'>{data.periods[0].detailedForecast}</div>
          <div className='font-semibold'>Temperature : {data.periods[0].temperature}°{' ' + data.periods[0].temperatureUnit}</div>
          <div className='font-semibold'>Wind Speed: {data.periods[0].windSpeed}</div>
        </div>
        <div className='mr-10'>
          <img className="rounded-full" src={data.periods[0].icon} />
          < div className='ml-5 text-xl font-semibold'> {data.periods[0].shortForecast}</div >
        </div >
      </div >
      <h2 className='my-4 text-3xl font-bold text-black'>Next 12 Forecast</h2>
      <div className='grid grid-cols-4 font-title rounded-2xl'>
        {data.periods.slice(1, 13).map((items, id) => {
          return <div className='bg-gray-500 rounded-lg pl-5 py-4 space-y-2 m-1' >
            <div className='flex justify-center text-2xl font-semibold'>{items.name}</div>

            <img className="w-20 h-20 mx-auto rounded-full" src={items.icon} />
            <div className='text-xl font-semibold'>{items.shortForecast}</div>
            {/* <h2>Partly sunny, with a high near 76. South wind around 12 mph.</h2> */}
            <div className='text-lg font-semibold'>Temp: {items.temperature}°{' ' + items.temperatureUnit}</div>
            <div className='text-lg font-semibold'>Wind: {items.windSpeed}</div>
          </div>

        })}
      </div>
    </div >
  )
}

export default Result;


