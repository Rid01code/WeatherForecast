import React, { useState } from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
import { UilLocationPinAlt } from '@iconscout/react-unicons'
import CelTemp from './temperature/celTemp';
import FarTemp from './temperature/farTemp';

const Temp = ({ data, cityName, weatherDescription, icon }) => {

  let [celTemp, setCelTemp] = useState(true);
  let [farTemp, setFarTemp] = useState(false);

  const handleCelTemp = () => {
    setCelTemp(true)
    setFarTemp(false)
  }

    const handleFarTemp = () => {
    setFarTemp(true)
    setCelTemp(false)
  }
  
  const defaults = {
  icon: 'CLEAR_DAY',
  color: 'white',
  size: 150,
  animate: true
};

  return (
    
    <div className='flex flex-col justify-center align-center'>
      <div className='flex items-center justify-evenly'>
        <div>
          <div className='text-white text-xl flex'>{cityName} <UilLocationPinAlt /></div>
          {data && (
            <div className='flex items-end'>
            {celTemp && <CelTemp data={data} />}
            {farTemp && <FarTemp data={data} />}
            <div className='text-xl text-white ml-5'>
              {celTemp===true ? <button onClick={handleFarTemp}>℉</button> : <button onClick={handleCelTemp}>℃</button>}
            </div>
          </div>
          )}
          
          <p className='text-white text-lg'>
            {
              weatherDescription && (
                <>
                  {weatherDescription}
                </>
              )
            }

          </p>
      </div>

<div>
  {weatherDescription && <ReactAnimatedWeather
    icon={icon}
    color={defaults.color}
    size={defaults.size}
    animate={defaults.animate}
  />}
</div>
      </div>

      <div className='text-white text-xl flex justify-center'>
        {
          data && (
            <>
              Max {Math.round(data.temp_max)}℃   Min {Math.round(data.temp_min)}℃ || Feels like {Math.round(data.feels_like)}℃
            </>
          )
        }

      </div>

    </div>

  )
}

export default Temp