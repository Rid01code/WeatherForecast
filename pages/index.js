import Search from "./components/search";
import Temp from "./components/Temp";
import Card from "./components/Card";
import styles from "../styles/card.module.css"
import Image from 'next/image'
import sunGif from './Assets/sun.gif'
import { useEffect, useState } from "react";
import React from "react";



export default function Home() {
  
  const [cityName, setCityName] = useState('');
  const [data, setData] = useState('');
  const [sys, setSys] = useState('');
  const [wind, setWind] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [time, setTime] = useState(new Date().getHours());


  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getHours());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLocationRequest = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
           // const latitude = position.coords.latitude
          // const longitude = position.coords.longitude
          const latitude = 22.572645
          const longitude = 88.363892
          const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=05952c1c6e8f80a9d53497726d59fc90`
          const response = await fetch(url);
          const resJson = await response.json();
          setCityName(resJson[0].name);
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          setError(error.message);
        }
      );
    }
  };
  

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=05952c1c6e8f80a9d53497726d59fc90`
      const response = await fetch(url);
      const resJson = await response.json()
      if (resJson.name) {
        setCityName(resJson.name)
        setData(resJson.main)
        setSys(resJson.sys)
        setWind(resJson.wind)
        setWeatherDescription(resJson.weather[0].main)
        switch (resJson.weather[0].main) {
          case "Haze": setIcon('CLEAR_DAY');
            break;
          case "Clouds": setIcon("CLOUDY");
            break;
          case "Rain": setIcon('RAIN')
            break;
          case "Snow": setIcon('SNOW')
            break;
          case "Dust": setIcon('WIND')
            break;
          case "Drizzle": setIcon('SLEET')
            break;
          case "Fog": setIcon("FOG")
            break;
          case "Smoke": setIcon("FOG")
            break;
          case "Tornado": setIcon("WIND")
            break;
          default: setIcon("CLEAR_DAY")
        };
      } else {
        setError("No city found");
        setTimeout(() => {
          window.location.reload();
        }, 3);
      }
    };
    if (cityName !== '') {
      fetchApi();
    }
  }, [cityName])
  
  return (
      
    <div className={ time >= 6 && time < 18 ? `${styles.lightBlur}` : `${styles.deepBlur}`} >
      {userLocation ? (
        <div>
          <Search setCityName={ setCityName } />
          <Temp data= {data} cityName={cityName} weatherDescription={weatherDescription} icon={ icon} />
          <Card sys={sys} wind={wind} data={data} />
      </div>
      ): (
        <div className="flex flex-col items-center ">
            <h1 className="text-white text-7xl mb-5">Weather App</h1>
            <Image src={sunGif} width={200} height={200} alt="sun"/>
          {error ? (
            <p>{error}</p>
          ) : (
            <button className="text-gray text-lg border-2 w-42 align-middle px-10 py-4 rounded-lg" onClick={handleLocationRequest}>Get My Location</button>
          )}
        </div>
      )}
    </div>
    
  );
  }

