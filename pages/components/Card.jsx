import React from 'react'
import styles from '../../styles/card.module.css'
import { UilWind } from '@iconscout/react-unicons'
import { UilArrowUp } from '@iconscout/react-unicons'
import { UilTear } from '@iconscout/react-unicons'
import { UilSun } from '@iconscout/react-unicons'
import { UilSunset } from '@iconscout/react-unicons'

const Card = ({sys , wind , data}) => {
  


  let formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    const hours = date.getHours().toString().padStart(2, '0'); // Pad with leading zero
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (

    <div className='mt-10 grid grid-cols-2 grid-rows-2 gap-6 place-items-center'>

      <div className={`${styles.card}  h-24 flex flex-col justify-evenly`}>
        <div className='flex items-end pl-2'>
          <UilWind color="white" />
          <p className='text-white pl-2 font-thin text-slate-300'>Wind</p>
        </div>
        <div className='flex pl-2'>
          <UilArrowUp color="white" />
          {
            wind && (
            <p className='text-white'>{ wind.speed}km/h </p>
            )
          }
        </div>
      </div>

      <div className={`${styles.card}  h-24 flex flex-col justify-evenly`}>
        <div className='flex items-end pl-2'>
          <UilTear color="white" />
          <p className='text-white pl-2 font-thin text-slate-300'>Humidity</p>
        </div>
        <div className='flex pl-2'>
          {
            data && (
              <p className='text-white pl-1'>{ data.humidity}%</p>
            )
          }
        </div>
      </div>

        {
          sys && (
      <div className={`${styles.card}  h-24 flex flex-col justify-evenly`}>
        <div className='flex items-end pl-2'>
          <UilSun color="white" />
          <p className='text-white pl-2 font-thin text-slate-300'>Sunrise</p>
        </div>
        <div className='flex pl-2'>
          <p className='text-white pl-1'>{ formatTime(sys.sunrise)}</p>
        </div>
      </div>      
          )
        }


      {
        sys && (
      <div className={`${styles.card}  h-24 flex flex-col justify-evenly`}>
        <div className='flex items-end pl-2'>
          <UilSunset color="white" />
          <p className='text-white pl-2 font-thin text-slate-300'>Sunset</p>
        </div>
        <div className='flex pl-2'>
          <p className='text-white pl-1'>{ formatTime(sys.sunset)}</p>
        </div>
      </div>
        )
      }



    </div>
  )
}

export default Card
