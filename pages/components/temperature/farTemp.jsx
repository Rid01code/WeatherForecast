import React from 'react'

const FarTemp = ({data}) => {
  return (
    <div className='text-7xl text-white'>{ (Math.round(data.temp) * 9/5)+32}℉</div>
  )
}

export default FarTemp