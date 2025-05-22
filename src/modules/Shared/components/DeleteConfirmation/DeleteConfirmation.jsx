import React from 'react'
import nodata from '../../../../assets/images/no-data1.png'
export default function DeleteConfirmation({deletedItem}) {
  return (
    <>
    <div className='text-center bg-white'>
      <img src={nodata} alt="" />
      <h4 className='text-danger my-3'>Delete this {deletedItem}?</h4>
      <p>are you sure you want to delete this {deletedItem} ? if you are sure just click on delete it</p>
    </div>
    </>
  )
}
