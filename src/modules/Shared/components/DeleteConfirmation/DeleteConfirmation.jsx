import React from 'react'
import nodata from '../../../../assets/images/no-data1.png'
export default function DeleteConfirmation({title,description}) {
  return (
    <>
    <div className='text-center bg-white'>
      <img src={nodata} alt="" />
      <h4 className='text-danger my-3'>{title}?</h4>
      <p>{description}</p>
    </div>
    </>
  )
}
