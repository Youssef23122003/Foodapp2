import React from 'react'
import nodata from '../../../../assets/images/no-data1.png'

export default function NoData() {
  return (
    <>
      <div className='text-center d-flex justify-content-center align-items-center flex-column'>
        <img src={nodata} alt="" />
        <h4>No Data</h4>
      </div>
    </>
  )
}
