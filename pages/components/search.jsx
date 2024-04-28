import React, { useRef, useState, useEffect } from 'react';
import { UilSearch } from '@iconscout/react-unicons';
import { UilMapMarker } from '@iconscout/react-unicons';

const Search = ({ setCityName }) => { 
  const searchedCity = useRef('')
  const [suggestions, setSuggestions] = useState([]);


let handleCitySearch = async() => {
  const city = (searchedCity.current.value)
  searchedCity.current.value = '';
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=e9416e0f19179f9e97cf7c309c53f921`
  const response = await fetch(url);
  const resJson = await response.json();
  if (resJson.length === 0) {
    alert("No place found");
  } else {
    setCityName(resJson[0].name);
  }
};

  
  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async(position) => {
          // const latitude = position.coords.latitude
          // const longitude = position.coords.longitude
          const latitude = 22.572645
          const longitude = 88.363892
          const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=e9416e0f19179f9e97cf7c309c53f921`
          const response = await fetch(url);
          const resJson = await response.json();
          setCityName(resJson[0].name);
        }
      )
    }
  }
  

    const handleCityChange = async (event) => {
    const city = event.target.value;
    searchedCity.current.value = city;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=e9416e0f19179f9e97cf7c309c53f921`;
    const response = await fetch(url);
    const resJson = await response.json();
      setSuggestions(resJson);
  };

  const handleSuggestionClick = async (suggestion) => {
    setCityName(suggestion.name)
    setSuggestions([]);
    searchedCity.current.value = '';
    }

  return (
    <div className="flex py-5 items-center justify-center gap-x-5">
      <input
        type='search'
        ref={searchedCity}
        onChange={handleCityChange}
        placeholder='Type Your Location...'
        className='w-80 rounded focus:outline-none focus:ring focus:ring-gray-600' />
      <UilSearch
        color="white"
        className='cursor-pointer'
        onClick={()=>{handleCitySearch()}} />
      
      <UilMapMarker
        color="white"
        onClick={() => { handleLocationClick() }} />
      
      {suggestions.length > 0 && (
        <ul className=" absolute top-16 z-10 w-80 bg-white border border-gray-300 rounded shadow-md">
          {suggestions.map((suggestion , index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100" onClick={()=>{handleSuggestionClick(suggestion)}}>
              {suggestion.name} ,{suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search