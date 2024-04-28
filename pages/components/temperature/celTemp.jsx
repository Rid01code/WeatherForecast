import React from 'react'

const CelTemp = ({data}) => {
  return (
    <div className='text-7xl text-white'>
      {
        data && (
          <>
                  {Math.round(data.temp)}℃
          </>
        )
      }
    </div>
  )
}

export default CelTemp